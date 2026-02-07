import { auth, db, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../src/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type AppUser } from "../App"; // Importing the interface from App

interface Props {
  onLoginSuccess: (user: AppUser) => void;
}

export function AccountSetup({ onLoginSuccess }: Props) {
  const handleRoleSelection = async (role: "artist" | "producer") => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      const userRef = doc(db, "users", fbUser.uid);
      const userSnap = await getDoc(userRef);

      const userData: AppUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName,
        //email: fbUser.email,
        photoURL: fbUser.photoURL,
        role: role,
      };
      console.log("ROLE: ", role);

      if (!userSnap.exists()) {
        // Save new user to Firestore
        await setDoc(userRef, {
          ...userData,
          createdAt: new Date(),
          setupComplete: false,
        });
      } else {
        // Use existing role if they already signed up
        const existingData = userSnap.data();
        userData.role = existingData.role;
      }

      onLoginSuccess(userData);
    } catch (error) {
      console.error("Auth failed", error);
    }
  };

  return (
    <Card className="flex h-[600px] w-[400px] flex-col border-none bg-white shadow-2xl">
      <CardHeader className="px-8 pt-8">
        <Progress value={20} className="h-2 bg-gray-100" />
        <div className="mt-8 space-y-2">
          <CardTitle className="text-3xl font-bold text-black">
            Let's set up your account
          </CardTitle>
          <CardDescription className="text-lg text-gray-500">
            Which type of account would you like to setup?
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 flex gap-4 px-8">
        <Button
          onClick={() => handleRoleSelection("artist")}
          className="h-24 flex-1 rounded-2xl bg-[#5D8EBD] text-2xl font-semibold transition-all hover:bg-[#4a76a1]"
        >
          Artist
        </Button>
        <Button
          onClick={() => handleRoleSelection("producer")}
          className="h-24 flex-1 rounded-2xl bg-[#B4B4B4] text-2xl font-semibold text-black transition-all hover:bg-[#9e9e9e]"
        >
          Producer
        </Button>
      </CardContent>
    </Card>
  );
}
