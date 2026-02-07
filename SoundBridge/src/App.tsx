import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {!started ? (
        <StarterPage onGetStarted={() => setStarted(true)} />
      ) : (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            <SwipableCards />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
