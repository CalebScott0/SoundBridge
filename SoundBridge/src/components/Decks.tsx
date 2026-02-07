import { ArtistCard } from "@/components/Cards";
import type { AppUser } from "@/types";

export function Decks() {
        // Display a stack of 3-5 ArtistCards with the top one being the most recent match
        const mockUsers: AppUser[] = [
            {
                uid: "1",
        name: "Luna Park",
                role: "Vocalist / Songwriter",
        genres: ["Alt Pop", "Indie", "R&B"],
        imageUrl:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        audioUrl:
            "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6b4b2342a1.mp3?filename=lofi-study-112191.mp3",
        bio: "Moody hooks, stacked harmonies, and late-night energy.",
        contact: {
            email: "jam@jaemeridian.com",
            location: "Portland, OR",
        },
        socials: {
            instagram: "@jaemeridian",
            tiktok: "@jaemeridian",
            website: "jaemeridian.com",
        },
        compatibility: "Shared love for analog tape warmth",
        setupComplete: true,
      },
      {
        uid: "2",
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
                uid: "3",
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
                uid: "4",
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
                uid: "5",
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
    ];

    const numberOfPeople = mockUsers.length;

    return (
        <div className="w-full justify-center rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-lg">
            <h1 className="mb-6 text-lg font-semibold text-amber-100">
                {numberOfPeople} people want to collaborate with you!
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
                {mockUsers.map((user) => (
                    <div key={user.uid} className="w-[280px] sm:w-[300px]">
                        <ArtistCard profile={user} isTop={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
                
