import { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { type AppUser } from "../types";
// This component is used in the dashboard to display the user's profile information and audio clip. It is also used in the EditProfile component to display the user's current profile information and audio clip.

interface ArtistCardProps {
  profile: AppUser;
  isTop?: boolean;
  onPass?: (profile: AppUser) => void;
  onCollab?: (profile: AppUser) => void;
}

interface TagBadgesProps {
  tags: string[];
}

function TagBadges({ tags }: TagBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          className="rounded-full border border-white/20 bg-white/10 text-white"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

interface DetailsPanelProps {
  profile: AppUser;
}

function DetailsPanel({ profile }: DetailsPanelProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-zinc-200">{profile.bio}</p>
      <div className="text-xs text-zinc-300">
        {profile.contact.location && (
          <p>Location: {profile.contact.location}</p>
        )}
        {profile.contact.email && <p>Email: {profile.contact.email}</p>}
        {profile.contact.phone && <p>Phone: {profile.contact.phone}</p>}
      </div>
      <div className="text-xs text-zinc-300">
        {profile.socials.instagram && (
          <p>Instagram: {profile.socials.instagram}</p>
        )}
        {profile.socials.tiktok && <p>TikTok: {profile.socials.tiktok}</p>}
        {profile.socials.twitter && <p>Twitter: {profile.socials.twitter}</p>}
        {profile.socials.website && <p>Website: {profile.socials.website}</p>}
      </div>
    </div>
  );
}

interface CompatibilityBadgeProps {
  label?: string;
}

function CompatibilityBadge({ label }: CompatibilityBadgeProps) {
  return (
    <Badge className="rounded-full border border-indigo-400/40 bg-indigo-500/20 text-indigo-100">
      {label ?? "Gemini insight coming soon"}
    </Badge>
  );
}

interface ActionButtonsProps {
  onPass: () => void;
  onCollab: () => void;
}

function ActionButtons({ onPass, onCollab }: ActionButtonsProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-3">
      <Button
        variant="outline"
        className="flex-1 border-rose-400/40 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30"
        onClick={(event) => {
          event.stopPropagation();
          onPass();
        }}
      >
        Pass
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-emerald-400/40 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
        onClick={(event) => {
          event.stopPropagation();
          onCollab();
        }}
      >
        Collab
      </Button>
    </div>
  );
}

export function ArtistCard({
  profile,
  isTop = true,
  onPass,
  onCollab,
}: ArtistCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current; // store the current audio element in a variable
    if (!audio || !profile.audioUrl) return; // if there's no audio element or audio URL, do nothing

    if (!isTop) {
      // if this card is not the top card, ensure the audio is stopped and reset
      audio.pause(); // pause the audio
      audio.currentTime = 0; // set the audio back to the beginning
      return;
    }

    audio.currentTime = 0;
    audio.play().catch(() => undefined);

    const stopAt = 12;
    const handleTimeUpdate = () => {
      if (audio.currentTime >= stopAt) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isTop, profile.audioUrl]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      onPass?.(profile);
    } else {
      onCollab?.(profile);
    }
  };

  return (
    <Card
      className="cursor-pointer border-white/10 bg-zinc-900 text-white"
      onClick={() => setShowDetails((prev) => !prev)}
      role="button"
      tabIndex={0}
    >
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl font-semibold">{profile.name}</CardTitle>
        <Badge className="text-lg">{profile.role}</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="h-72 w-full object-cover"
          />
        </div>

        <TagBadges tags={profile.genres ?? []} />

        {showDetails && <DetailsPanel profile={profile} />}

        <audio ref={audioRef} src={profile.audioUrl} />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        {/* Compatibility Badge */}
        <CompatibilityBadge label={profile.compatibility} />

        {/* Button Container - Added w-full to fill the card */}
        <ActionButtons
          onPass={() => handleSwipe("left")}
          onCollab={() => handleSwipe("right")}
        />
      </CardFooter>
    </Card>
  );
}
