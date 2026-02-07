import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";

function App() {
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );

  return (
    <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
      {step === "first" && (
        <First
          artist={() => {
            setAccountType("Artist");
            setStep("second");
          }}
          producer={() => {
            setAccountType("Producer");
            setStep("second");
          }}
        />
      )}
      {step === "second" && (
        <Second name={accountType} next={() => setStep("third")} />
      )}
      {step === "third" && <Third next={() => setStep("first")} />}
    </div>
  );
}

export default App;

// function App() {
//   const [started, setStarted] = useState(false);

//   // if (!started) {
//   //   return <StarterPage onGetStarted={() => setStarted(true)} />;
//   // }

//   return (
//     <>
//     {/* Login */}

//     <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
//       <div className="mx-auto max-w-6xl">
//         {/* <SwipableCards /> */}
        

//       </div>
//       {/* <Footer /> */}
//     </div>
//     </>
//   );
// }

// export default App;