import { useRef, useState } from "react";
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
  const [matchNotification, setMatchNotification] = useState<AppUser | null>(null);
  const matchTimerRef = useRef<number | null>(null);

  const showMatchNotification = (profile: AppUser) => {
    setMatchNotification(profile);
    if (matchTimerRef.current) {
      window.clearTimeout(matchTimerRef.current);
    }
    matchTimerRef.current = window.setTimeout(() => {
      setMatchNotification(null);
      matchTimerRef.current = null;
    }, 2800);
  };

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

      if (photoFile) photoUrl = await uploadToCloudinary(photoFile, "image");
      if (audioFile) audioUrl = await uploadToCloudinary(audioFile, "video");

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
        imageUrl: photoUrl,
        audioUrl: audioUrl,
        setupComplete: true,
        updatedAt: new Date(),
        socials: { ...formData.socials },
      };

      await updateDoc(userRef, finalProfile as any);
      setUser(finalProfile);
      setStage("cards");
    } catch (error) {
      console.error("Error finalizing profile:", error);
      alert("Failed to save profile. Check Cloudinary credentials.");
    }
  };

  return (
    <>
      {stage === "starter" && (
        <StarterPage onGetStarted={() => setStage("auth")} />
      )}
      {stage === "auth" && (
        <div className="page-transition min-h-svh justify-center bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
          <SigninSignup
            onSuccess={(u: AppUser) => {
              setUser(u);
              setStage(u.setupComplete ? "cards" : "login");
            }}
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
            <Second
              name={accountType}
              formData={formData}
              setFormData={setFormData}
              setPhotoFile={setPhotoFile}
              next={() => setStep("third")}
            />
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
          {matchNotification && (
            <div className="pointer-events-none fixed left-1/2 top-6 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-red-900/60 bg-black/80 p-4 text-center text-amber-100 shadow-lg backdrop-blur">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
                It’s a match
              </p>
              <p className="mt-2 text-base font-semibold">
                You matched with {matchNotification.name}
              </p>
              <p className="mt-1 text-xs text-amber-200/80">
                Start the collaboration in your deck.
              </p>
            </div>
          )}
          <div className="mx-auto max-w-6xl space-y-8">
            {accountType === "Producer" ? (
              <ProducerSwipableCards onMatch={showMatchNotification} />
            ) : (
              <SwipableCards onMatch={showMatchNotification} />
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
