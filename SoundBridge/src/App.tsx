import { useState } from "react";
import { StarterPage } from "@/components/StarterPage";
import { SigninSignup } from "@/components/SigninSignup";
import { SwipableCards } from "@/components/SwipableCards";
import { Footer } from "@/components/Footer";
import { First, Second, Third } from "@/components/Login";
import {ArtistCard} from "@/components/Cards";

function App() {
  const [stage, setStage] = useState<
    "starter" | "auth" | "login" | "cards"
  >("starter");
  const [step, setStep] = useState<"first" | "second" | "third">("first");
  const [accountType, setAccountType] = useState<"Artist" | "Producer">(
    "Artist",
  );


  return (
    <>
    
      {stage === "starter" && (
        <StarterPage
          onGetStarted={() => {
            setStage("auth");
            setStep("first");
          }}
        />
      )}

      {stage === "auth" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <SigninSignup
            onSignin={() => setStage("login")}
            onSignup={() => setStage("login")}
          />
        </div>
      )}

      {stage === "login" && (
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
          {step === "third" && (
            <Third
              next={() => {
                setStage("cards");
                setStep("first");
              }}
            />
          )}
        </div>
      )}

      {stage === "cards" && (
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">
          <div className="mx-auto max-w-6xl">{/*<SwipableCards />*/}</div>
          <Footer />
        </div>
      )} */}
        <div className="min-h-svh justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-white">

       <div style={{margin: "20px", fontSize: "24px"}}>
        <p style={{fontWeight: "bold"}}>Choose your role</p>
        <p>Select one or multiple roles that fit you as an artist</p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <RoleButton  name="Guitarist"/>
        <RoleButton name="Drummer"/>
        <RoleButton name="Vocalist"/>
        <RoleButton name="Bassist"/>
        <RoleButton name="Performer"/>
      </div>

      <div style={{margin:"20px", marginTop: "15%", fontSize: "24px"}}>
        <p style={{fontWeight: "bold"}}>Choose your genres</p>
        <p>Select one or multiple genres to describe the type of music you create</p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <RoleButton  name="Rock"/>
        <RoleButton name="Pop"/>
        <RoleButton name="Hip-Hop"/>
        <RoleButton name="Jazz"/>
        <RoleButton name="Electronic"/>
      </div>
        <div className="flex flex-row items-center justify-center">
        <RoleButton  name="Indie"/>
        <RoleButton name="Latin"/>
        <RoleButton name="R&B/Soul"/>
        <RoleButton name="Metal"/>
        <RoleButton name="Acoustic"/>
      </div>
        <div className="flex flex-row items-center justify-center">
          <RoleButton  name="Blues"/>
          <RoleButton name="Trap"/>
          <RoleButton name="Reggae"/>
          <RoleButton name="K-pop"/>
          <RoleButton name="Punk"/>
      </div>
      </div>
    </>
  );
}

export default App;
