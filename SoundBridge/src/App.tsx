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
        <div className="min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <SigninSignup
            onSignin={() => setStage("login")}
            onSignup={() => setStage("login")}
          />
        </div>
      )}

      {stage === "login" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
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
        <div className="min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <RoleSelection onContinue={() => setStage("cards")} />
        </div>
      )}

      {stage === "cards" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <div className="mx-auto max-w-6xl space-y-8">
            <SwipableCards />
          </div>
          <Footer onExplore={() => setStage("cards")} onDeck={() => setStage("deck")} />
        </div>
      )}

      {stage === "deck" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <div className="mx-auto max-w-6xl">
            <Decks />
          </div>
          <Footer onExplore={() => setStage("cards")} onDeck={() => setStage("deck")} />
        </div>
      )}
    </>
  );
}

export default App;
