import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// --- Types for Props ---
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

// --- SHARED PROGRESS HEADER ---
function SetupHeader({ step }: { step: number }) {
  const progress = (step / 3) * 100;
  return (
    <div className="mx-auto mb-8 w-full max-w-2xl px-4">
      <div className="mb-2 flex justify-between text-xs font-medium tracking-widest text-indigo-200 uppercase">
        <span>Step {step} of 3</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2 bg-white/10" />
    </div>
  );
}

// --- STEP 1: ROLE SELECTION ---
export function First({
  artist,
  producer,
}: {
  artist: () => void;
  producer: () => void;
}) {
  return (
    <>
      <SetupHeader step={1} />
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
        <p className="text-xs tracking-[0.3em] text-indigo-200 uppercase">
          SoundBridge
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Let’s set up your account
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Which type of account would you like to set up?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Button
            onClick={artist}
            variant="outline"
            className="h-12 border-indigo-400/40 bg-white/5 text-indigo-100 hover:bg-indigo-500 hover:text-white"
          >
            Artist
          </Button>
          <Button
            onClick={producer}
            variant="outline"
            className="h-12 border-indigo-400/40 bg-white/5 text-indigo-100 hover:bg-indigo-500 hover:text-white"
          >
            Producer
          </Button>
        </div>
      </div>
    </>
  );
}

// --- STEP 2: PROFILE DETAILS ---
export function Second({
  name,
  next,
  formData,
  setFormData,
  setPhotoFile,
}: StepProps & { name: string; setPhotoFile: (file: File) => void }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  const updateField = (
    field: keyof Omit<FormData, "socials">,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SetupHeader step={2} />
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
        <h1 className="text-3xl font-semibold">Profile Details</h1>
        <p className="mt-2 text-sm text-slate-300">
          Add a photo and tell us a bit about yourself.
        </p>
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <label className="text-xs tracking-[0.25em] text-indigo-200 uppercase">
              Profile photo
            </label>
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <div className="h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-slate-900/60">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                      fill="currentColor"
                    >
                      <path d="M9 3a1 1 0 0 0-.894.553L7.382 5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2.382l-.724-1.447A1 1 0 0 0 15 3H9zm3 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-slate-200 hover:bg-white/10">
                Upload photo
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPhotoUrl(URL.createObjectURL(file));
                      setPhotoFile(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </div>
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            placeholder={`${name}'s name`}
            value={formData.artistName}
            onChange={(e) => updateField("artistName", e.target.value)}
          />
          <div>
            <label className="text-xs tracking-[0.25em] text-indigo-200 uppercase">
              Date of birth
            </label>
            <input
              type="date"
              className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
              value={formData.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.25em] text-indigo-200 uppercase">
              Gender
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {["Male", "Female", "Other"].map((g) => (
                <Button
                  key={g}
                  variant="outline"
                  onClick={() => updateField("gender", g)}
                  className={
                    formData.gender === g
                      ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }
                >
                  {g}
                </Button>
              ))}
            </div>
          </div>
          <Button
            onClick={next}
            className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

// --- STEP 3: SHOWCASE ---
export function Third({
  next,
  formData,
  setFormData,
  setAudioFile,
}: StepProps & { setAudioFile: (file: File) => void }) {
  const updateSocial = (platform: keyof FormData["socials"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value },
    }));
  };

  return (
    <>
      <SetupHeader step={3} />
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
        <h1 className="text-3xl font-semibold">Showcase Your Work</h1>
        <p className="mt-2 text-sm text-slate-300">
          Upload a short audio clip and add any profile links.
        </p>
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left">
            <label className="text-xs tracking-[0.25em] text-indigo-200 uppercase">
              Audio preview
            </label>
            <input
              type="file"
              accept="audio/*"
              className="mt-3 w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-500/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-100 hover:file:bg-indigo-500/40"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAudioFile(file);
              }}
            />
          </div>
          <div className="space-y-3">
            {Object.keys(formData.socials).map((platform) => (
              <input
                key={platform}
                type="text"
                className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} profile link`}
                value={formData.socials[platform as keyof FormData["socials"]]}
                onChange={(e) =>
                  updateSocial(
                    platform as keyof FormData["socials"],
                    e.target.value,
                  )
                }
              />
            ))}
          </div>
          <Button
            onClick={next}
            className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </>
  );
}
