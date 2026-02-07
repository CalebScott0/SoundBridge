import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SigninSignup } from "@/components/SigninSignup";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";
import { RoleSelection } from "@/components/Role";
import { Decks } from "@/components/Decks";

function App() {
  const [stage, setStage] = useState<
    "starter" | "auth" | "login" | "role" | "cards" | "deck"
  >("starter");
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );


  return (
    <>
      {stage === "starter" && (
        <StarterPage
          onGetStarted={() => {
            setStage("auth");
            setStep("first");
          }}
        />
      )}

      {stage === "auth" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <SigninSignup
            onSignin={() => setStage("login")}
            onSignup={() => setStage("login")}
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
            <Second name={accountType} next={() => setStep("third")} />
          )}
          {step === "third" && (
            <Third
              next={() => {
                setStage("role");
                setStep("first");
              }}
            />
          )}
        </div>
      )}

      {stage === "role" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <RoleSelection onContinue={() => setStage("cards")} />
        </div>
      )}

      {stage === "cards" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-6xl space-y-8">
            <SwipableCards />
            <div className="flex justify-center">
              <button
                className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                onClick={() => setStage("deck")}
              >
                Go to Deck
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {stage === "deck" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            <Decks />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
