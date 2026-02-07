import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SigninSignup } from "@/components/SigninSignup";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";
import { type AppUser } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { seedDatabase } from "./seed"; // Import the function

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [stage, setStage] = useState<"starter" | "auth" | "login" | "cards">(
    "starter",
  );
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    artistName: "",
    dob: "",
    gender: "",
    socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
  });

  const handleFinalSubmit = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const finalProfile: AppUser = {
        ...user,
        role: accountType.toLowerCase() as "artist" | "producer",
        firstName: formData.firstName,
        lastName: formData.lastName,
        artistName: formData.artistName,
        name:
          formData.artistName || `${formData.firstName} ${formData.lastName}`,
        dob: formData.dob,
        gender: formData.gender,
        setupComplete: true,
        updatedAt: new Date(),
        socials: { ...formData.socials },
      };

      await updateDoc(userRef, finalProfile as any);
      setUser(finalProfile);
      setStage("cards");
    } catch (error) {
      console.error("Error finalizing profile:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => seedDatabase()}
        className="fixed right-4 bottom-4 z-50 rounded bg-red-600 px-2 py-1 text-xs text-white opacity-20 hover:opacity-100"
      >
        DEBUG: Seed DB
      </button>
      {stage === "starter" && (
        <StarterPage onGetStarted={() => setStage("auth")} />
      )}

      {stage === "auth" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <SigninSignup
            // Pass the user object received from Firebase back to App state
            onSuccess={(authenticatedUser: AppUser) => {
              setUser(authenticatedUser);
              setStage(authenticatedUser.setupComplete ? "cards" : "login");
            }}
          />
        </div>
      )}

      {stage === "login" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          {step === "first" && (
            <First
              artist={() => {
                setAccountType("Artist");
                setStep("second");
              }}
              producer={() => {
                setAccountType("Producer");
                setStep("second");
              }}
            />
          )}
          {step === "second" && (
            <Second
              name={accountType}
              formData={formData}
              setFormData={setFormData}
              next={() => setStep("third")}
            />
          )}
          {step === "third" && (
            <Third
              formData={formData}
              setFormData={setFormData}
              next={handleFinalSubmit}
            />
          )}
        </div>
      )}

      {stage === "cards" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            {user && <SwipableCards currentUser={user} />}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
