import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type AppUser } from "../types";

export function ProfileForm({
  user,
  onComplete,
}: {
  user: AppUser;
  onComplete: () => void;
}) {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        bio: bio,
        setupComplete: true, // This flips the switch in your App.tsx logic
        updatedAt: new Date(),
      });
      onComplete();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[450px] border-none p-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Complete your Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bio">Tell us about your sound</Label>
          <Textarea
            id="bio"
            placeholder="I produce trap beats with a lo-fi twist..."
            className="h-32 resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audio">Upload your best snippet (MP3)</Label>
          <Input
            id="audio"
            type="file"
            accept="audio/*"
            className="cursor-pointer"
          />
        </div>

        <Button
          onClick={handleSaveProfile}
          className="bg-primary h-12 w-full text-lg"
          disabled={loading || !bio}
        >
          {loading ? "Saving..." : "Start Matching"}
        </Button>
      </CardContent>
    </Card>
  );
}
