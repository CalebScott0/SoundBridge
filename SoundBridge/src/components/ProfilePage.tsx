import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AppUser } from "@/types";

interface ProfilePageProps {
  profile: AppUser;
  onBack?: () => void;
  onCollab?: () => void;
}

export function ProfilePage({ profile, onBack }: ProfilePageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-amber-100 shadow-lg">
      <div className="flex flex-wrap items-start gap-6">
        <div className="w-full md:w-[280px]">
          <div className="overflow-hidden rounded-3xl border border-red-900/50 bg-black/50">
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="h-[320px] w-full object-cover"
            />
          </div>
          <div className="mt-4 space-y-2">
            <Badge className="border-red-900/60 bg-red-950/40 text-amber-100">
              {profile.role}
            </Badge>
            <div className="flex flex-wrap gap-2">
              {profile.genres.map((genre) => (
                <Badge
                  key={genre}
                  className="rounded-full border border-red-900/40 bg-black/40 text-amber-100"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-xs tracking-[0.35em] text-amber-200 uppercase">
              Profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{profile.name}</h1>
            <p className="mt-2 text-sm text-amber-200/80 italic">
              {profile.bio || "No bio provided."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-red-900/40 bg-black/40 p-4">
              <p className="text-xs tracking-[0.25em] text-amber-200 uppercase">
                Contact
              </p>
              <div className="mt-2 space-y-1 text-sm text-amber-200/80">
                {profile.contact.email && <p>Email: {profile.contact.email}</p>}
                {profile.contact.location && (
                  <p>Location: {profile.contact.location}</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-red-900/40 bg-black/40 p-4">
              <p className="text-xs tracking-[0.25em] text-amber-200 uppercase">
                Gemini Match
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold text-red-500">
                  {profile.score || "?? "}%
                </span>
                <p className="text-sm text-amber-200/80">
                  {profile.compatibility || "Analyzing..."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-red-900/60 bg-black/40 text-amber-100 hover:bg-red-900/30"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              className="bg-red-700 text-amber-100 hover:bg-red-600"
              onClick={() =>
                profile.audioUrl && window.open(profile.audioUrl, "_blank")
              }
            >
              Hear Music
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
