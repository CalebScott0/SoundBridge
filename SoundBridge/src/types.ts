export interface AppUser {
  uid: string; // Keep this for Firebase lookups
  name: string;
  imageUrl: string;
  role: string; // e.g., ['Vocalist', 'Songwriter']
  genres: string[];
  audioUrl?: string;
  bio: string;
  setupComplete: boolean;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
  };
  socials: {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    website?: string;
  };
  compatibility?: string; // AI generated later
}
