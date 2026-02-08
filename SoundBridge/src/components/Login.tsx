import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { type AppUser } from "../../src/types";

async function uploadToCloudinary(file: File, type: "image" | "video") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
    { method: "POST", body: formData },
  );
  const data = await res.json();
  return data.secure_url;
}

interface FormData {
  firstName: string;
  lastName: string;
  artistName: string;
  dob: string;
  gender: string;
  socials: {
    soundcloud: string;
    spotify: string;
    youtube: string;
    apple: string;
  };
}

interface StepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  next: () => void;
}

function SetupHeader({ step }: { step: number }) {
  return (
    <div className="mx-auto mb-8 w-full max-w-xl">
      <p className="text-center text-xs tracking-[0.3em] text-amber-200 uppercase">
        SoundBridge
      </p>
      <Progress value={(step / 3) * 100} className="mt-4 h-2 bg-white/10" />
    </div>
  );
}

export function First({
  artist,
  producer,
}: {
  artist: () => void;
  producer: () => void;
}) {
  return (
    <div className="space-y-6">
      <SetupHeader step={1} />
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-amber-100">
          Let’s set up your account
        </h1>
        <p className="mt-2 text-sm text-amber-200/80">
          Which type of account would you like to set up?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Button
            onClick={artist}
            variant="outline"
            className="h-12 border-red-900/60 bg-black/40 text-amber-100 hover:bg-red-900/40"
          >
            Artist
          </Button>
          <Button
            onClick={producer}
            variant="outline"
            className="h-12 border-red-900/60 bg-black/40 text-amber-100 hover:bg-red-900/40"
          >
            Producer
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Second({
  name,
  next,
  formData,
  setFormData,
  setPhotoFile,
}: StepProps & { name: string; setPhotoFile: (file: File) => void }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const updateField = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));
  return (
    <div className="space-y-6">
      <SetupHeader step={2} />
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-red-900/60 bg-black/40 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-amber-100">
          Profile Details
        </h1>
        <div className="mt-6 space-y-4">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-900/40 bg-black/50 p-4">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-red-900/50 bg-black/60">
              {photoUrl && (
                <img src={photoUrl} className="h-full w-full object-cover" />
              )}
            </div>
            <label className="cursor-pointer rounded-full border border-red-900/60 bg-black/40 px-6 py-2 text-sm text-amber-100 hover:bg-red-900/30">
              Upload photo
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhotoFile(file);
                    setPhotoUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="w-full rounded-xl border border-red-900/40 bg-black/40 px-4 py-3 text-white"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-red-900/40 bg-black/40 px-4 py-3 text-white"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </div>
          <input
            className="w-full rounded-xl border border-red-900/40 bg-black/40 px-4 py-3 text-white"
            placeholder={`${name}'s name`}
            value={formData.artistName}
            onChange={(e) => updateField("artistName", e.target.value)}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {["Male", "Female", "Other"].map((g) => (
              <Button
                key={g}
                variant="outline"
                className={
                  formData.gender === g
                    ? "border-red-700 bg-red-800/40"
                    : "border-red-900/40"
                }
                onClick={() => updateField("gender", g)}
              >
                {g}
              </Button>
            ))}
          </div>
          <Button onClick={next} className="w-full bg-red-700 text-amber-100">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Third({
  formData,
  setFormData,
  setAudioFile,
  next,
  loading,
}: StepProps & { setAudioFile: (file: File) => void; loading?: boolean }) {
  const updateSocial = (key: keyof FormData["socials"], val: string) =>
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: val },
    }));
  return (
    <div className="space-y-6">
      <SetupHeader step={3} />
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-red-900/60 bg-black/40 p-8 shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-amber-100">
          Showcase Work
        </h1>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-red-900/40 bg-black/50 p-4">
            <label className="text-xs text-amber-200 uppercase">
              Audio Preview
            </label>
            <input
              type="file"
              accept="audio/*"
              className="mt-2 w-full text-white"
              onChange={(e) =>
                e.target.files?.[0] && setAudioFile(e.target.files[0])
              }
            />
          </div>
          {Object.keys(formData.socials).map((s) => (
            <input
              key={s}
              className="w-full rounded-xl border border-red-900/40 bg-black/40 px-4 py-3 text-white"
              placeholder={`${s.charAt(0).toUpperCase() + s.slice(1)} link`}
              value={formData.socials[s as keyof FormData["socials"]]}
              onChange={(e) => updateSocial(s as any, e.target.value)}
            />
          ))}
          <Button
            onClick={next}
            disabled={loading}
            className="w-full bg-red-700 text-amber-100"
          >
            {loading ? "Syncing..." : "Complete Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingContainer({
  currentUser,
  onComplete,
}: {
  currentUser: AppUser;
  onComplete: (user: AppUser) => void;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    artistName: "",
    dob: "",
    gender: "",
    socials: { soundcloud: "", spotify: "", youtube: "", apple: "" },
  });

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const [imageUrl, audioUrl] = await Promise.all([
        photoFile
          ? uploadToCloudinary(photoFile, "image")
          : Promise.resolve(currentUser.imageUrl),
        audioFile
          ? uploadToCloudinary(audioFile, "video")
          : Promise.resolve(""),
      ]);
      const finalUserData = {
        ...currentUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name:
          formData.artistName || `${formData.firstName} ${formData.lastName}`,
        imageUrl,
        audioUrl,
        gender: formData.gender,
        socials: formData.socials,
        setupComplete: true,
        updatedAt: new Date(),
      };
      await updateDoc(doc(db, "users", currentUser.uid), finalUserData);
      onComplete(finalUserData);
    } catch (e) {
      console.error("Final sync failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <First artist={() => setStep(2)} producer={() => setStep(2)} />
      )}
      {step === 2 && (
        <Second
          name={currentUser.role}
          next={() => setStep(3)}
          formData={formData}
          setFormData={setFormData}
          setPhotoFile={setPhotoFile}
        />
      )}
      {step === 3 && (
        <Third
          formData={formData}
          setFormData={setFormData}
          setAudioFile={setAudioFile}
          next={handleFinalSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}
