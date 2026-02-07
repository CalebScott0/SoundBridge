import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Define Producer type
interface Producer {
  name: string;
  bio: string;
  tags: string[];
  audioUrl?: string; // optional field
}

export const ProfileCard = () => {
  const [data, setData] = useState<Producer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "producers", "test-producer");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setData(docSnap.data() as Producer);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading Producer...</div>;

  return (
    <div className="max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
      {/* This is where your Canva-to-Tailwind code goes */}
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="my-2 text-gray-600">{data.bio}</p>
      <div className="flex gap-2">
        {data.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
