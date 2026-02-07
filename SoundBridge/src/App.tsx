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
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import type { AppUser } from "@/types";

function App() {
  const [stage, setStage] = useState<
    "starter" | "auth" | "login" | "role" | "cards" | "deck" | "profile"
  >("starter");
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [user, setUser] = useState<AppUser | null>(null);
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    artistName: "",
    dob: "",
    gender: "",
    socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
  });
  const [matchNotification, setMatchNotification] = useState<AppUser | null>(
    null,
  );
  const matchTimerRef = useRef<number | null>(null);

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "video",
  ) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SoundBridge");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpjthgy4n/${resourceType}/upload`,
      { method: "POST", body: data },
    );
    const json = await res.json();
    if (json.error) throw new Error(json.error.message);
    return json.secure_url;
  };

  const handleFinalSubmit = async () => {
    if (!user) return;
    try {
      let photoUrl = user.imageUrl || "";
      let audioUrl = user.audioUrl || "";
      if (photoFile) photoUrl = await uploadToCloudinary(photoFile, "image");
      if (audioFile) audioUrl = await uploadToCloudinary(audioFile, "video");
      const finalProfile: AppUser = {
        ...user,
        role: accountType.toLowerCase() as any,
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
      await updateDoc(doc(db, "users", user.uid), finalProfile as any);
      setUser(finalProfile);
      setStage("role");
    } catch (e) {
      console.error(e);
      alert("Upload failed.");
    }
  };

  const showMatchNotification = (profile: AppUser) => {
    setMatchNotification(profile);
    if (matchTimerRef.current) window.clearTimeout(matchTimerRef.current);
    matchTimerRef.current = window.setTimeout(
      () => setMatchNotification(null),
      2800,
    );
  };

  return (
    <>
      {stage === "starter" && (
        <StarterPage onGetStarted={() => setStage("auth")} />
      )}
      {stage === "auth" && (
        <div className="flex min-h-svh items-center justify-center bg-black">
          <SigninSignup
            onSuccess={(u) => {
              setUser(u);
              setStage(u.setupComplete ? "cards" : "login");
            }}
          />
        </div>
      )}
      {stage === "login" && (
        <div className="min-h-svh bg-gradient-to-br from-black via-red-950 to-stone-950 p-4">
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
              formData={formData}
              setFormData={setFormData}
              setAudioFile={setAudioFile}
              next={handleFinalSubmit}
            />
          )}
        </div>
      )}
      {stage === "role" && (
        <div className="min-h-svh bg-black">
          <RoleSelection onContinue={() => setStage("cards")} />
        </div>
      )}
      {stage === "cards" && (
        <div className="min-h-svh bg-black py-10">
          {matchNotification && (
            <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-indigo-600 p-4 text-white">
              Matched with {matchNotification.name}!
            </div>
          )}
          <div className="mx-auto max-w-6xl">
            {accountType === "Producer" ? (
              <ProducerSwipableCards
                currentUser={user!}
                onMatch={showMatchNotification}
              />
            ) : (
              <SwipableCards
                currentUser={user!}
                onMatch={showMatchNotification}
              />
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
        <div className="min-h-svh bg-black">
          <Decks />
          <Footer
            onExplore={() => setStage("cards")}
            onDeck={() => setStage("deck")}
            onProfile={() => setStage("profile")}
          />
        </div>
      )}
      {stage === "profile" && (
        <div className="min-h-svh bg-black">
          <ProfilePage
            profile={user!}
            onBack={() => setStage("cards")}
            onCollab={() => setStage("deck")}
          />
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
