import { Button } from "@/components/ui/button"; // Import the button
import { useEffect } from "react";
import { auth } from "../firebase";
import { ProfileCard } from "./components/ProfileCard";
import { Progress } from "./components/ui/progress";
import { Bold } from "lucide-react";
import RoleButton from "./components/ui/rolebutton";
import './components/ui/rolebutton.css';

function App() {
  useEffect(() => {
    console.log("Firebase Auth Object", auth);
  });
  return (
    <>
      <div style={{margin: "20px", fontSize: "24px"}}>
        <p style={{fontWeight: "bold"}}>Choose your role</p>
        <p>Select one or multiple roles that fit you as an artist</p>
      </div>
      <div className="flex min-h-svh flex-row items-center justify-center">
        <RoleButton  name="Guitarist"/>
        <RoleButton name="Drummer"/>
        <RoleButton name="Vocalist"/>
        <RoleButton name="Bassist"/>
        <RoleButton name="Performer"/>
      </div>


    </>
  );
}
export default App;
