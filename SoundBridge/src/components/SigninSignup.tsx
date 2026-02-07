import { Button } from "@/components/ui/button";

interface SigninSignupProps {
  onSignin: () => void;
  onSignup: () => void;
}

export function SigninSignup({ onSignin, onSignup }: SigninSignupProps) {
  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-lg">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
        SoundBridge
      </p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-amber-200/80">
        Sign in to your account or create a new one.
      </p>

      <div className="mt-8 grid gap-4">
        <Button
          onClick={onSignin}
          className="h-12 w-full bg-red-700 text-amber-100 hover:bg-red-600"
        >
          Sign in
        </Button>
        <Button
          onClick={onSignup}
          variant="outline"
          className="h-12 w-full border-red-900/60 bg-black/40 text-amber-100 hover:bg-red-900/30"
        >
          Create account
        </Button>
      </div>
    </div>
  );
}