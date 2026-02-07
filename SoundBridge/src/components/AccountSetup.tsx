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
import { type AppUser } from "../../src/types"; // Importing the interface from App

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

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          role: role,
          setupComplete: false, // CRITICAL: This keeps them on the setup screen
          createdAt: new Date(),
        });
      }

      // Pass the user up so the parent knows to show the "Profile Form" (your screenshot)
      onLoginSuccess({
        uid: fbUser.uid,
        role,
        setupComplete: false,
        name: fbUser.displayName || "",
        imageUrl: fbUser.photoURL || "",
        genres: [], // Fixes the .map() error
        bio: "",
        contact: { email: fbUser.email || "", phone: "", location: "" },
        socials: { spotify: "", apple: "", youtube: "", soundcloud: "" },
      });
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
