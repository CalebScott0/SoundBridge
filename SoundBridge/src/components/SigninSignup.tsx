import { auth, googleProvider, db } from "../../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { type AppUser } from "../types";
import { useState } from "react";

export function SigninSignup({
  onSuccess,
}: {
  onSuccess: (user: AppUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const finalizeUser = async (cred: UserCredential) => {
    const userRef = doc(db, "users", cred.user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      onSuccess({ ...snap.data(), uid: cred.user.uid } as AppUser);
    } else {
      const newUser: AppUser = {
        uid: cred.user.uid,
        name: cred.user.displayName || "New User",
        imageUrl: cred.user.photoURL || "",
        setupComplete: false,
        role: "artist",
        genres: [],
        bio: "",
        contact: { email: cred.user.email || "", phone: "", location: "" },
        socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
      };
      await setDoc(userRef, newUser);
      onSuccess(newUser);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-2xl">
      <p className="text-xs tracking-[0.3em] text-amber-200 uppercase">
        SoundBridge
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white italic">
        Join the Circuit
      </h1>
      <div className="space-y-3 pt-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all outline-none focus:border-red-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all outline-none focus:border-red-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 pt-2">
        <Button
          onClick={async () => {
            try {
              finalizeUser(
                await signInWithEmailAndPassword(auth, email, password),
              );
            } catch (e: any) {
              alert(e.message);
            }
          }}
          className="h-12 w-full bg-red-700 font-bold text-amber-100 hover:bg-red-600"
        >
          Login
        </Button>
        <Button
          onClick={async () => {
            try {
              finalizeUser(
                await createUserWithEmailAndPassword(auth, email, password),
              );
            } catch (e: any) {
              alert(e.message);
            }
          }}
          variant="outline"
          className="h-12 w-full border-red-900/60 bg-transparent font-bold text-amber-100 hover:bg-red-900/30"
        >
          Sign Up
        </Button>
        <div className="flex items-center gap-2 py-2 text-white/30">
          <div className="h-[1px] w-full bg-white/10" />
          <span className="text-xs uppercase">or</span>
          <div className="h-[1px] w-full bg-white/10" />
        </div>
        <Button
          onClick={async () => {
            try {
              finalizeUser(await signInWithPopup(auth, googleProvider));
            } catch (e: any) {
              alert(e.message);
            }
          }}
          className="h-12 w-full bg-white font-bold text-black hover:bg-slate-200"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
