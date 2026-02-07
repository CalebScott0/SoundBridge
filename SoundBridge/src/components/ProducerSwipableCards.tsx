import { useMemo, useState } from "react";
import { ArtistCard } from "@/components/Cards";
import { type AppUser } from "@/types";

interface ProducerSwipableCardsProps {
  onMatch?: (profile: AppUser) => void;
}

export function ProducerSwipableCards({ onMatch }: ProducerSwipableCardsProps) {
  const profiles = useMemo<AppUser[]>(
    () => [
      {
        uid: "artist-1",
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
      },
      {
        uid: "artist-2",
        name: "Jae Meridian",
        imageUrl:
          "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=80",
        role: "Guitarist / Producer",
        genres: ["Shoegaze", "Grunge", "Dream Pop"],
        audioUrl:
          "https://cdn.pixabay.com/download/audio/2021/10/26/audio_02b620cc59.mp3?filename=slow-trip-ambient-11157.mp3",
        bio: "Fuzzy guitars, analog tape textures, and cinematic riffs.",
        setupComplete: true,
        contact: {
          email: "jam@jaemeridian.com",
          location: "Portland, OR",
        },
        socials: {
          instagram: "@jaemeridian",
          tiktok: "@jaemeridian",
          website: "jaemeridian.com",
        },
        compatibility: "Both love saturated guitar stacks",
      },
      {
        uid: "artist-3",
        name: "Mira Sol",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=80",
        role: "Producer / DJ",
        genres: ["House", "Future Funk", "Disco"],
        audioUrl:
          "https://cdn.pixabay.com/download/audio/2022/08/20/audio_5200b6572a.mp3?filename=disco-112504.mp3",
        bio: "Groovy basslines, neon pads, and dancefloor energy.",
        setupComplete: true,
        contact: {
          email: "collab@mirasol.fm",
          location: "San Diego, CA",
        },
        socials: {
          instagram: "@mirasol",
          tiktok: "@mirasol.music",
          website: "mirasol.fm",
        },
        compatibility: "Shared love for funky bass grooves",
      },
      {
        uid: "artist-4",
        name: "Nova Rey",
        imageUrl:
          "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=80",
        role: "Alt-R&B Vocalist",
        genres: ["R&B", "Indie", "Soul"],
        audioUrl:
          "https://cdn.pixabay.com/download/audio/2022/01/26/audio_4f7f1e1a2e.mp3?filename=deep-ambient-11185.mp3",
        bio: "Raw vocals, live-band energy, and lyrical hooks.",
        setupComplete: true,
        contact: {
          email: "hello@novarey.com",
          location: "Seattle, WA",
        },
        socials: {
          instagram: "@nova.rey",
          tiktok: "@novarey",
          website: "novarey.com",
        },
        compatibility: "Both lean into analog warmth",
      },
      {
        uid: "artist-5",
        name: "Kai Lumen",
        imageUrl:
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
        role: "Sound Designer / Producer",
        genres: ["Hyperpop", "Future Bass", "EDM"],
        audioUrl:
          "https://cdn.pixabay.com/download/audio/2022/03/10/audio_547c4d8d12.mp3?filename=ambient-110197.mp3",
        bio: "Glitchy synths and cinematic hooks.",
        setupComplete: true,
        contact: {
          email: "hi@kailumen.com",
          location: "Portland, OR",
        },
        socials: {
          instagram: "@kailumen",
          tiktok: "@kailumen",
          website: "kailumen.com",
        },
        compatibility: "Shared interest in metallic percussion",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const current = profiles[index];
  const done = index >= profiles.length;

  const advance = () => setIndex((prev) => Math.min(prev + 1, profiles.length));

  const handleMatch = (profile: AppUser) => {
    onMatch?.(profile);
    advance();
  };

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="rounded-3xl border border-red-900/60 bg-black/40 p-5 text-amber-100">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
          Producer Mode
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Discover rising artists</h2>
        <p className="mt-1 text-sm text-amber-200/80">
          Swipe to find vocalists and creatives that match your sound.
        </p>
      </div>

      {!done && current && (
        <ArtistCard
          profile={current}
          isTop
          onPass={advance}
          onCollab={handleMatch}
        />
      )}

      {done && (
        <div className="rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center text-amber-100">
          <h2 className="text-2xl font-semibold">No more artists</h2>
          <p className="mt-2 text-sm text-amber-200/80">
            Check back later for new profiles.
          </p>
        </div>
      )}
    </div>
  );
}
