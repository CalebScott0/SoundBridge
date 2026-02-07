import { useState } from "react";
import "@/components/ui/rolebutton.css";
import { Button } from "@/components/ui/button";

interface RoleButtonProps {
    name: string;
}

const RoleButton = ({ name }: RoleButtonProps) => {
    const [isToggled, setToggled] = useState(false);

    const myStyle = {
        backgroundColor: isToggled ? "#7f1d1d" : "#f5f5dc",
        color: isToggled ? "#fef3c7" : "#1c1917",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "9999px",
        border: "none",
        fontSize: "14px",
        fontWeight: 600,
        transition: "background-color 200ms ease-out, color 200ms ease-out",
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

    const genres = [
        "Hip-Hop",
        "Rock",
        "Electronic",
        "Pop",
        "Jazz",
        "Classical",
        "Country",
        "R&B",
        "Metal",
        "Reggae",
        "Folk",
        "Blues",
        "Latin",
        "Funk",
        "Soul",
        "Punk",
        "Indie",
        "Alternative",
        "Ambient",
        "World",
        "Experimental",
    ];

    return (
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-red-900/60 bg-black/40 p-8 text-center shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                SoundBridge
            </p>

            {/* Pick Roles */}
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Pick your roles
            </h1>
            <p className="mt-2 text-sm text-amber-200/80">
                Select all that apply to tailor your matches.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center">
                {roles.map((role) => (
                    <RoleButton key={role} name={role} />
                ))}
            </div>

            {/* Pick Genres */}
            <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">
                Pick your genres
            </h1>
            <p className="mt-2 text-sm text-amber-200/80">
                Select all that apply to tailor your matches.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center">
                {genres.map((genre) => (
                    <RoleButton key={genre} name={genre} />
                ))}
            </div>

            <Button
                onClick={onContinue}
                className="mt-8 w-full bg-red-700 text-amber-100 hover:bg-red-600"
            >
                Continue
            </Button>
        </div>
    );
}

export default RoleButton;