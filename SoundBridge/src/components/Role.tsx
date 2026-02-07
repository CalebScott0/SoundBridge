import { useState } from "react";
import "@/components/ui/rolebutton.css";
import { Button } from "@/components/ui/button";

interface RoleButtonProps {
    name: string;
}

const RoleButton = ({ name }: RoleButtonProps) => {
    const [isToggled, setToggled] = useState(false);

    const myStyle = {
        backgroundColor: isToggled ? "#0f172a" : "#b6b3b3",
        color: isToggled ? "white" : "black",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "9999px",
        border: "none",
        fontSize: "14px",
        fontWeight: 600,
    } as const;

    return (
        <div className="role-button-div">
            <button
                className="role-button"
                onClick={() => setToggled((prev) => !prev)}
                style={myStyle}
            >
                {name}
            </button>
        </div>
    );
};

interface RoleSelectionProps {
    onContinue: () => void;
}

export function RoleSelection({ onContinue }: RoleSelectionProps) {
    const roles = [
        "Vocalist",
        "Producer",
        "Guitarist",
        "Songwriter",
        "DJ",
        "Sound Designer",
    ];

    return (
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
                SoundBridge
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Pick your roles
            </h1>
            <p className="mt-2 text-sm text-slate-300">
                Select all that apply to tailor your matches.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {roles.map((role) => (
                    <RoleButton key={role} name={role} />
                ))}
            </div>

            <Button
                onClick={onContinue}
                className="mt-8 w-full bg-indigo-500 text-white hover:bg-indigo-600"
            >
                Continue
            </Button>
        </div>
    );
}

export default RoleButton;