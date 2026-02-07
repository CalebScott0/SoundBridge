import { auth, googleProvider, db } from "../../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //signInAnonymously,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { type AppUser } from "../types";
import { useState } from "react";

interface SigninSignupProps {
  onSuccess: (user: AppUser) => void;
}

export function SigninSignup({ onSuccess }: SigninSignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const finalizeUser = async (result: UserCredential) => {
    const fbUser = result.user;
    const userRef = doc(db, "users", fbUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      onSuccess(userSnap.data() as AppUser);
    } else {
      const newUser: AppUser = {
        uid: fbUser.uid,
        role: "artist",
        setupComplete: false,
        name: fbUser.displayName || "",
        imageUrl: fbUser.photoURL || "",
        contact: {
          email: fbUser.email || "anonymous@dev.com",
          phone: "",
          location: "",
        },
        socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
      };
      await setDoc(userRef, newUser);
      onSuccess(newUser);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
      <h1 className="text-3xl font-semibold">Welcome</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          onClick={async () => {
            if (!email || !password)
              return alert("Please enter email and password");
            finalizeUser(
              await signInWithEmailAndPassword(auth, email, password),
            );
          }}
          className="flex-1 bg-indigo-500"
        >
          Login
        </Button>
        <Button
          onClick={async () => {
            if (!email || !password)
              return alert("Please enter email and password");
            finalizeUser(
              await createUserWithEmailAndPassword(auth, email, password),
            );
          }}
          className="flex-1 border border-indigo-500"
        >
          Sign Up
        </Button>
      </div>
      <Button
        onClick={async () =>
          finalizeUser(await signInWithPopup(auth, googleProvider))
        }
        className="w-full bg-white text-black hover:bg-slate-200"
      >
        Google
      </Button>
    </div>
  );
}
