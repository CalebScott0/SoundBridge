import { auth, googleProvider, db } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { type AppUser } from "../types";

interface SigninSignupProps {
  onSuccess: (user: AppUser) => void;
}

export function SigninSignup({ onSuccess }: SigninSignupProps) {
  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const userRef = doc(db, "users", fbUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        onSuccess(userSnap.data() as AppUser);
      } else {
        const newUser: AppUser = {
          uid: fbUser.uid,
          role: "artist", // Placeholder, Step 1 will change this
          setupComplete: false,
          name: fbUser.displayName || "",
          imageUrl: fbUser.photoURL || "",
          contact: { email: fbUser.email || "", phone: "", location: "" },
          socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
        };
        await setDoc(userRef, newUser);
        onSuccess(newUser);
      }
    } catch (error) {
      console.error("Auth failed", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
      <p className="text-xs tracking-[0.3em] text-indigo-200 uppercase">
        SoundBridge
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Welcome</h1>
      <p className="mt-2 text-sm text-slate-300">
        Sign in with Google to continue.
      </p>
      <div className="mt-8">
        <Button
          onClick={handleAuth}
          className="h-12 w-full bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
