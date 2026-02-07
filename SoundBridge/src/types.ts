export interface AppUser {
  uid: string;
  role: "artist" | "producer";
  setupComplete: boolean;

  // Personal Details from Step 2
  firstName?: string;
  lastName?: string;
  artistName?: string;
  name?: string; // Display name (usually artistName or First + Last)
  dob?: string;
  gender?: string;

  imageUrl?: string;
  bio?: string;
  genres?: string[];
  audioUrl?: string;

  contact?: {
    email: string;
    phone: string;
    location: string;
  };

  // Music-specific Socials from Step 3
  socials?: {
    soundcloud: string;
    spotify: string;
    youtube: string;
    apple: string;
  };

  compatibility?: string;
  updatedAt?: Date;
}
