import { Button } from "@/components/ui/button";

interface StarterPageProps {
  onGetStarted: () => void;
}

export function StarterPage({ onGetStarted }: StarterPageProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
      <div className="w-full text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-indigo-200">
          SoundBridge
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Discover your next creative partner
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Swipe right to collaborate, left to pass. Highlights the vibe match
          in real time.
        </p>
      </div>
      <Button
        className="mt-6 text-indigo-950 hover:bg-indigo-500 hover:text-white"
        variant="outline"
        onClick={onGetStarted}
      >
        Get Started
      </Button>
    </div>
  );
}
