import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { ArtistCard } from "@/components/Cards";
import { type AppUser } from "@/types";
import { getBatchCompatibility } from "@/lib/gemini";

export function SwipableCards({
  currentUser,
  onMatch,
}: {
  currentUser: AppUser;
  onMatch?: (profile: AppUser) => void;
}) {
  const [profiles, setProfiles] = useState<AppUser[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAndRank = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const targetRole =
          currentUser.role === "artist" ? "producer" : "artist";
        const rawProfiles = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), uid: doc.id }) as AppUser)
          .filter(
            (p) =>
              p.setupComplete === true &&
              p.role === targetRole &&
              p.uid !== currentUser.uid,
          );

        const insights = await getBatchCompatibility(currentUser, rawProfiles);
        const ranked = rawProfiles
          .map((p) => {
            const match = insights.find((i: any) => i.uid === p.uid);
            return {
              ...p,
              compatibility: match?.insight || "Match potential high",
              score: match?.score || 0,
            };
          })
          .sort((a, b) => b.score - a.score);

        setProfiles(ranked);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAndRank();
  }, [currentUser]);

  if (!currentUser || loading)
    return (
      <div className="mt-20 text-center text-amber-200">
        Loading {currentUser?.role === "artist" ? "Producers" : "Artists"}...
      </div>
    );

  const current = profiles[index];
  const done = index >= profiles.length;

  return (
    <div className="mx-auto w-full max-w-lg">
      {!done && current ? (
        <ArtistCard
          profile={current}
          isTop
          onPass={() => setIndex((prev) => prev + 1)}
          onCollab={(p) => {
            onMatch?.(p);
            setIndex((prev) => prev + 1);
          }}
        />
      ) : (
        <div className="rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center text-amber-100">
          <h2 className="text-2xl font-semibold">No more profiles found</h2>
          <p className="mt-2 text-sm text-amber-200/80">
            Check back later for more{" "}
            {currentUser.role === "artist" ? "producers" : "artists"}.
          </p>
        </div>
      )}
    </div>
  );
}
