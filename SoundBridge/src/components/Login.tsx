import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function First({ artist, producer }) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
      <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
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
  );
}

export function Second({ name, next }) {
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | "Other" | null
  >(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
      <h1 className="text-3xl font-semibold">Let’s set up your account</h1>
      <p className="mt-2 text-sm text-slate-300">
        Add a photo and tell us a bit about yourself.
      </p>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <label className="text-xs uppercase tracking-[0.25em] text-indigo-200">
            Profile photo
          </label>
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-slate-900/60">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 3a1 1 0 0 0-.894.553L7.382 5H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2.382l-.724-1.447A1 1 0 0 0 15 3H9zm3 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                  </svg>
                </div>
              )}
            </div>
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-slate-200 hover:bg-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 5a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V6a1 1 0 0 1 1-1z" />
              </svg>
              Upload photo
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (photoUrl) URL.revokeObjectURL(photoUrl);
                  setPhotoUrl(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            type="text"
            placeholder="First name"
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
          type="text"
          placeholder={`${name}'s name`}
        />

        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-indigo-200">
            Date of birth
          </label>
          <input
            type="date"
            className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.25em] text-indigo-200">
            Gender
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Button
              variant="outline"
              onClick={() => setSelectedGender("Male")}
              className={
                selectedGender === "Male"
                  ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }
            >
              Male
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedGender("Female")}
              className={
                selectedGender === "Female"
                  ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }
            >
              Female
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedGender("Other")}
              className={
                selectedGender === "Other"
                  ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }
            >
              Other
            </Button>
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
  );
}

export function Third({ next }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
      <h1 className="text-3xl font-semibold">Let’s showcase your work</h1>
      <p className="mt-2 text-sm text-slate-300">
        Upload a short audio clip and add any profile links.
      </p>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left">
          <label className="text-xs uppercase tracking-[0.25em] text-indigo-200">
            Audio preview
          </label>
          <input
            type="file"
            accept="audio/*"
            className="mt-3 w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-500/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-100 hover:file:bg-indigo-500/40"
          />
        </div>

        <div className="space-y-3">
          <input
            type="text"
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            placeholder="SoundCloud profile link"
          />
          <input
            type="text"
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            placeholder="Spotify profile link"
          />
          <input
            type="text"
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            placeholder="YouTube Music profile link"
          />
          <input
            type="text"
            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
            placeholder="Apple Music profile link"
          />
        </div>

        <Button onClick={next} className="w-full bg-indigo-500 text-white hover:bg-indigo-600">
          Continue
        </Button>
      </div>
    </div>
  );
}