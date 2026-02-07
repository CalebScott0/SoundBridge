import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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
      {tags &&
        tags.map((tag) => (
          <Badge
            key={tag}
            className="rounded-full border border-red-900/40 bg-black/40 text-amber-100"
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
    <div className="space-y-3 rounded-2xl border border-red-900/40 bg-black/40 p-4">
      <p className="text-sm text-amber-100">{profile.bio}</p>
      <div className="text-xs text-amber-200/80">
        {profile.contact.location && (
          <p>Location: {profile.contact.location}</p>
        )}
        {profile.contact.email && <p>Email: {profile.contact.email}</p>}
        {profile.contact.phone && <p>Phone: {profile.contact.phone}</p>}
      </div>
      <div className="text-xs text-amber-200/80">
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
  const swipeControls = useAnimation();

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") onPass?.(profile);
    else onCollab?.(profile);
  };

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
  }, [isTop, isPlaying]);

  const togglePlay = (full: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && isFullMode === full) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsFullMode(full);
      if (isFullMode !== full) audio.currentTime = 0;
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const triggerSwipe = (direction: "left" | "right") => {
    swipeControls
      .start({
        x: direction === "left" ? -500 : 500,
        opacity: 0,
        transition: { duration: 0.3 },
      })
      .then(() => {
        handleSwipe(direction);
        swipeControls.set({ x: 0, opacity: 1 });
      });
  };

  return (
    <motion.div
      drag="x"
      animate={swipeControls}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100)
          triggerSwipe(info.offset.x > 0 ? "right" : "left");
        else swipeControls.start({ x: 0 });
      }}
      className="touch-none"
    >
      <Card
        className="cursor-pointer border-red-900/60 bg-black/50 text-amber-100"
        onClick={() => setShowDetails(!showDetails)}
      >
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-semibold">
            {profile.name}
          </CardTitle>
          <Badge className="bg-red-950/40">{profile.role}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(false);
              }}
            >
              {isPlaying && !isFullMode ? "Pause" : "Preview"}
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-red-700"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(true);
              }}
            >
              {isPlaying && isFullMode ? "Pause" : "Full Clip"}
            </Button>
          </div>
          <TagBadges tags={profile.genres} />
          {showDetails && <DetailsPanel profile={profile} />}
          <audio ref={audioRef} src={profile.audioUrl} />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <CompatibilityBadge label={profile.compatibility} />
          <ActionButtons
            onPass={() => triggerSwipe("left")}
            onCollab={() => triggerSwipe("right")}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
