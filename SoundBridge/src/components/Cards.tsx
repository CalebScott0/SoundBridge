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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullMode, setIsFullMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => {
      if (!isFullMode && audio.currentTime >= 10) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnd);
      audio.pause();
    };
  }, [isFullMode]);

  useEffect(() => {
    if (!isTop && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isTop]);

  const togglePlay = (full: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && isFullMode === full) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsFullMode(full);
      if (isFullMode !== full) audio.currentTime = 0;
      audio.play().catch(() => alert("Interact with page first"));
      setIsPlaying(true);
    }
  };

  return (
    <Card
      className="cursor-pointer border-white/10 bg-zinc-900 text-white"
      onClick={() => setShowDetails(!showDetails)}
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
        <div className="flex w-full gap-2">
          <Button
            variant={isPlaying && !isFullMode ? "destructive" : "secondary"}
            className="h-10 flex-1"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay(false);
            }}
          >
            {isPlaying && !isFullMode ? "Stop Preview" : "Preview (10s)"}
          </Button>
          <Button
            variant={isPlaying && isFullMode ? "destructive" : "default"}
            className="h-10 flex-1 bg-indigo-600 hover:bg-indigo-700"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay(true);
            }}
          >
            {isPlaying && isFullMode ? "Stop Full" : "Full Clip"}
          </Button>
        </div>
        <TagBadges tags={profile.genres ?? []} />
        {showDetails && <DetailsPanel profile={profile} />}
        <audio ref={audioRef} src={profile.audioUrl} />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <CompatibilityBadge label={profile.compatibility} />
        <ActionButtons
          onPass={() => onPass?.(profile)}
          onCollab={() => onCollab?.(profile)}
        />
      </CardFooter>
    </Card>
  );
}
