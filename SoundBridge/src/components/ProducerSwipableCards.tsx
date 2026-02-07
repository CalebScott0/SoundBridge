import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { ArtistCard } from "@/components/Cards";
import { type AppUser } from "@/types";

export function ProducerSwipableCards({
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
    const fetchProfiles = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const filtered = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), uid: doc.id }) as AppUser)
          .filter(
            (p) =>
              p.setupComplete === true &&
              p.role === "artist" &&
              p.uid !== currentUser.uid,
          );
        setProfiles(filtered);
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [currentUser]);

  if (!currentUser || loading)
    return (
      <div className="mt-20 text-center text-amber-200">
        Scanning for artists...
      </div>
    );

  const current = profiles[index];
  const done = index >= profiles.length;

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="rounded-3xl border border-red-900/60 bg-black/40 p-5 text-amber-100">
        <p className="text-xs tracking-[0.35em] text-amber-200 uppercase">
          Producer Mode
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Discover rising artists</h2>
      </div>
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
          <h2 className="text-2xl font-semibold">No more artists found</h2>
        </div>
      )}
    </div>
  );
}
