import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SigninSignup } from "@/components/SigninSignup";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";
import { type AppUser } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [stage, setStage] = useState<"starter" | "auth" | "login" | "cards">(
    "starter",
  );
  const [step, setStep] = useState<"first" | "second" | "third">("first");
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

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "video",
  ) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "SoundBridge");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpjthgy4n/${resourceType}/upload`,
      {
        method: "POST",
        body: data,
      },
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
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <SigninSignup
            onSuccess={(u: AppUser) => {
              setUser(u);
              setStage(u.setupComplete ? "cards" : "login");
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
