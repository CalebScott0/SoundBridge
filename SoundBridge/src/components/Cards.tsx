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
      {tags.map((tag) => (
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swipeControls = useAnimation();

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

  const triggerSwipe = (direction: "left" | "right") => {
    const x = direction === "left" ? -300 : 300;
    swipeControls
      .start({
        x,
        y: 0,
        rotate: direction === "left" ? -12 : 12,
        opacity: 0,
        transition: { duration: 0.25 },
      })
      .then(() => {
        handleSwipe(direction);
        swipeControls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
      });
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset;
    const threshold = 120;

    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      const direction = x >= 0 ? 1 : -1;
      swipeControls
        .start({
          x: x + direction * 300,
          y: y,
          rotate: direction * 12,
          opacity: 0,
          transition: { duration: 0.25 },
        })
        .then(() => {
          if (x < 0) {
            handleSwipe("left");
          } else {
            handleSwipe("right");
          }
          swipeControls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
        });
    } else {
      swipeControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 280, damping: 20 },
      });
    }
  };

  return (
    <motion.div
      drag
      animate={swipeControls}
      onDragEnd={handleDragEnd}
      className="touch-pan-y"
    >
      <Card
        className="cursor-pointer border-red-900/60 bg-black/50 text-amber-100"
        onClick={() => setShowDetails((prev) => !prev)}
        role="button"
        tabIndex={0}
      >
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-semibold">{profile.name}</CardTitle>
          <Badge className="border-red-900/60 bg-red-950/40 text-amber-100">
            {profile.role}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="h-72 w-full object-cover"
            />
          </div>

          <TagBadges tags={profile.genres} />

          {showDetails && <DetailsPanel profile={profile} />}

          <audio ref={audioRef} src={profile.audioUrl} />
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4">
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
