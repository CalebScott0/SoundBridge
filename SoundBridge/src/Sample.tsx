import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

function Sample() {
  useEffect(() => {
    console.log("Firebase Auth Object", auth);
  });

  const artists = useMemo(
    () => [
      {
        id: "a1",
        name: "Nova Rey",
        role: "Alt-R&B Vocalist",
        location: "Seattle, WA",
        vibe: "90s Grungy Indie x Neo-Soul",
        bio: "Raw vocals, live-band energy, and lyrically heavy hooks.",
        tags: ["Live Sessions", "Analog Warmth", "Storytelling"],
        image:
          "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=900&q=80",
        aiMatch:
          "You both lean into saturated tape textures and dusty drum breaks.",
      },
      {
        id: "a2",
        name: "Kai Lumen",
        role: "Hyperpop Producer",
        location: "Portland, OR",
        vibe: "Cyberpunk Noir x Future Bass",
        bio: "Glitchy synths, chromatic hooks, and cinematic tension.",
        tags: ["Sound Design", "Vocal Chops", "Neon Aesthetic"],
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        aiMatch:
          "Shared interest in metallic percussion and detuned lead stacks.",
      },
      {
        id: "a3",
        name: "Marisol Vega",
        role: "Indie Pop Artist",
        location: "San Diego, CA",
        vibe: "Dreamy Surf Pop x Bedroom",
        bio: "Lo-fi shimmer, sun-kissed melodies, and gentle harmonies.",
        tags: ["Guitar Pop", "Chillwave", "Co-writing"],
        image:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=900&q=80",
        aiMatch:
          "You both reference jangly guitars and soft-clip compression.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [lastAction, setLastAction] = useState<"like" | "pass" | null>(null);

  const current = artists[index];

  const handleAction = (action: "like" | "pass") => {
    setLastAction(action);
    setTimeout(() => {
      setIndex((prev) => Math.min(prev + 1, artists.length));
      setLastAction(null);
    }, 220);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 120) {
      handleAction("like");
    } else if (info.offset.x < -120) {
      handleAction("pass");
    }
  };

  const done = index >= artists.length;

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
        <div className="mb-8 w-full max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-200">
            SoundBridge Swipe
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Discover your next creative partner
          </h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Swipe right to collaborate, left to pass. Gemini highlights the vibe
            match in real time.
          </p>
        </div>

        <div className="w-full max-w-5xl items-start gap-8 lg:flex">
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
            <div className="absolute -top-6 right-4 rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-200">
              {Math.min(index + 1, artists.length)} / {artists.length}
            </div>

            <AnimatePresence>
              {!done && current && (
                <motion.div
                  key={current.id}
                  drag="x"
                  onDragEnd={handleDragEnd}
                  dragConstraints={{ left: 0, right: 0 }}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.95 }}
                  className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.6)] backdrop-blur"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="h-64 w-full object-cover"
                    />
                    {lastAction === "like" && (
                      <div className="absolute left-4 top-4 rounded-full border border-emerald-300 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
                        Vibe Match
                      </div>
                    )}
                    {lastAction === "pass" && (
                      <div className="absolute left-4 top-4 rounded-full border border-rose-300 bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-100">
                        Pass
                      </div>
                    )}
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <h2 className="text-2xl font-semibold">{current.name}</h2>
                      <p className="text-sm text-indigo-200">{current.role}</p>
                      <p className="text-xs text-slate-400">{current.location}</p>
                    </div>
                    <p className="text-sm text-slate-200">{current.bio}</p>
                    <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-3 text-xs text-indigo-100">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-indigo-300">
                        Gemini Vibe Insight
                      </p>
                      <p className="mt-2 text-sm">{current.aiMatch}</p>
                      <p className="mt-1 text-[11px] text-indigo-200">
                        Vibe: {current.vibe}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {done && (
              <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <h2 className="text-2xl font-semibold">That’s the full deck</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Update your preferences to refresh the vibe suggestions.
                </p>
              </div>
            )}

            <div className="mt-5 flex w-full items-center justify-between gap-4">
              <Button
                variant="outline"
                className="w-full border-rose-400/40 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20"
                onClick={() => handleAction("pass")}
                disabled={done}
              >
                Pass
              </Button>
              <Button
                className="w-full bg-emerald-500/90 text-white hover:bg-emerald-500"
                onClick={() => handleAction("like")}
                disabled={done}
              >
                Collaborate
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-left lg:mt-0">
            <h3 className="text-lg font-semibold">Why it’s a match</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                Gemini spots overlapping moods, references, and sonic textures in
                your projects.
              </li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                The deck prioritizes artists actively seeking producers within
                your creative lane.
              </li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                Match to open a direct chat and share session files instantly.
              </li>
            </ul>
            <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">
                Next step
              </p>
              <p className="mt-2 text-sm text-indigo-100">
                Once you swipe right, you’ll unlock a collab channel with stems,
                notes, and scheduling built in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sample;
