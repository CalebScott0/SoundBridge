import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SigninSignup } from "@/components/SigninSignup";
import { SwipableCards } from "@/components/SwipableCards";
import { ProducerSwipableCards } from "@/components/ProducerSwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";
import { RoleSelection } from "@/components/Role";
import { Decks } from "@/components/Decks";
import { ProfilePage } from "@/components/ProfilePage";
import type { AppUser } from "@/types";

function App() {
  const [stage, setStage] = useState<
    "starter" | "auth" | "login" | "role" | "cards" | "deck" | "profile"
  >("starter");
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );

  const mockProfile: AppUser = {
    uid: "profile-1",
    name: "Luna Park",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    role: "Vocalist / Songwriter",
    genres: ["Alt Pop", "Indie", "R&B"],
    audioUrl:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6b4b2342a1.mp3?filename=lofi-study-112191.mp3",
    bio: "Moody hooks, stacked harmonies, and late-night energy.",
    setupComplete: true,
    contact: {
      email: "hello@lunaparkmusic.com",
      location: "Seattle, WA",
    },
    socials: {
      instagram: "@luna.park",
      tiktok: "@lunapark",
      website: "lunaparkmusic.com",
    },
    compatibility: "Shared love for analog tape warmth",
  };


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
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <SigninSignup
            onSignin={() => setStage("login")}
            onSignup={() => setStage("login")}
          />
        </div>
      )}

      {stage === "login" && (
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
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
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <RoleSelection onContinue={() => setStage("cards")} />
        </div>
      )}

      {stage === "cards" && (
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <div className="mx-auto max-w-6xl space-y-8">
            {accountType === "Producer" ? (
              <ProducerSwipableCards />
            ) : (
              <SwipableCards />
            )}
          </div>
          <Footer
            onExplore={() => setStage("cards")}
            onDeck={() => setStage("deck")}
            onProfile={() => setStage("profile")}
          />
        </div>
      )}

      {stage === "deck" && (
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <div className="mx-auto max-w-6xl">
            <Decks />
          </div>
          <Footer
            onExplore={() => setStage("cards")}
            onDeck={() => setStage("deck")}
            onProfile={() => setStage("profile")}
          />
        </div>
      )}

      {stage === "profile" && (
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <div className="mx-auto max-w-6xl">
            <ProfilePage
              profile={mockProfile}
              onBack={() => setStage("cards")}
              onCollab={() => setStage("deck")}
            />
          </div>
          <Footer
            onExplore={() => setStage("cards")}
            onDeck={() => setStage("deck")}
            onProfile={() => setStage("profile")}
          />
        </div>
      )}
    </>
  );
}

export default App;
