import { Button } from "@/components/ui/button";

interface StarterPageProps {
  onGetStarted: () => void;
}

export function StarterPage({ onGetStarted }: StarterPageProps) {
  return (
    <div className="page-transition relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-red-950 to-stone-950 px-4 py-10 text-amber-100">
      <div className="theatre-glow theatre-glow--one left-[-60px] top-[-40px]" />
      <div className="theatre-glow theatre-glow--two right-[-40px] top-[20%]" />
      <div className="theatre-glow theatre-glow--three bottom-[-80px] left-[10%]" />
      <div className="w-full text-center">
        <h1 className="text-5xl font-bold tracking-[0.12em] text-amber-100 sm:text-6xl">
          SoundBridge
        </h1>

        <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
          Discover your next creative partner
        </h2>
        <p className="mt-2 text-sm text-amber-200/80 sm:text-base">
          Swipe right to collaborate, left to pass. Highlights the vibe match
          in real time.
        </p>
      </div>
      <Button
        className="mt-6 border-red-900/60 bg-red-950/40 text-amber-100 hover:bg-red-900/40"
        variant="outline"
        onClick={onGetStarted}
      >
        Get Started
      </Button>
    </div>
  );
}
