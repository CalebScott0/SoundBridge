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

export function SigninSignup({ onSignin, onSignup }: SigninSignupProps) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-lg">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
        SoundBridge
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-amber-200/80">
        Sign in to your account or create a new one.
      </p>

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
          onClick={onSignin}
          className="h-12 w-full bg-red-700 text-amber-100 hover:bg-red-600"
        >
          Login
        </Button>
        <Button
          onClick={onSignup}
          variant="outline"
          className="h-12 w-full border-red-900/60 bg-black/40 text-amber-100 hover:bg-red-900/30"
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