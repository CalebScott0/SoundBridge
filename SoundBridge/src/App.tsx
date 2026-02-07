import { useState, useEffect } from "react";
import { AccountSetup } from "../src/components/AccountSetup";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ProfileForm } from "./components/ProfileCard";

// User type definition
export interface AppUser {
  uid: string;
  displayName: string | null;
  //email: string | null; // not sure if we want to include
  role?: "artist" | "producer";
  photoURL?: string | null;
  setupComplete?: boolean; 
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // User is logged in, fetch their role from Firestore
        const userRef = doc(db, "users", fbUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data() as AppUser);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      {user ? (
        <!user.setUpcomplete?
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {user.displayName}
          </h1>
          <div className="flex flex-col items-center gap-2">
            <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-4 py-1 text-sm font-medium">
              Account Type: {user.role?.toUpperCase()}
            </span>
          </div>

          <div className="text-muted-foreground mt-8 rounded-3xl border-2 border-dashed p-10">
            Main Dashboard / Swiping Logic Goes Here
          </div>

          <Button
            variant="ghost"
            onClick={() => setUser(null)}
            className="mt-4"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <AccountSetup onLoginSuccess={(u) => setUser(u)} />
      )}
    </main>
  );
}
