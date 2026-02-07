import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useState } from "react";



const [user, setUser] = useState<any>(null)

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Welcome", result.user.displayName);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

return(
  <div className="flex h-screen flex-col items-center justify-center">
    {user ? (
      <div>
        <h1>Welcome, {user.displayName}</h1>
        {/* Your Swipe Card Component Goes Here */}
        {/* MOVE THIS TO NON LOGIN COMPONENT */}
        <ProfileCard /> 
      </div>
    ) : (
      <button
        onClick={handleLogin}
        className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    )}
  </div>,
);
