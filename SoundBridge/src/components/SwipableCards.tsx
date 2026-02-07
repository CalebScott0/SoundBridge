import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { ArtistCard } from "@/components/Cards";
import { type AppUser } from "../types.ts";

export function SwipableCards({ currentUser }: { currentUser: AppUser }) {
  const [profiles, setProfiles] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // db collection users
        const usersRef = collection(db, "users");
        // query profiles with complete setup
        const targetRole =
          currentUser.role === "artist" ? "producer" : "artist";
        const q = query(
          usersRef,
          where("role", "==", targetRole),
          where("setupComplete", "==", true),
        );
        // receive data
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map(
          (doc) => doc.data() as AppUser,
        );
        console.log(querySnapshot.size);
        setProfiles(fetchedData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentUser.role]);

  if (loading)
    return <div className="p-10 text-center">Loading artists...</div>;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            className="w-[320px] shrink-0 snap-center sm:w-[380px]"
          >
            <ArtistCard profile={profile} isTop={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
