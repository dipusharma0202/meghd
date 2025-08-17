"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle Email + Password Sign Up
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Account created successfully!");
      router.push("/dashboard"); // redirect after signup
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Google Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #2193b0, #6dd5ed)"
    }}>
      <form 
        onSubmit={handleSignup} 
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          width: "320px"
        }}
      >
        <h2 style={{textAlign: "center", marginBottom: "20px", color: "#2193b0"}}>Sign Up</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc"}}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc"}}
        />

        {/* Signup Button */}
        <button 
          type="submit" 
          style={{width: "100%", padding: "10px", borderRadius: "8px", background: "#2193b0", color: "white", fontWeight: "bold", marginBottom: "10px"}}
        >
          Sign Up
        </button>

        {/* Google Signup */}
        <button 
          type="button"
          onClick={handleGoogleSignup}
          style={{width: "100%", padding: "10px", borderRadius: "8px", background: "#db4437", color: "white", fontWeight: "bold", marginBottom: "15px"}}
        >
          Continue with Google
        </button>

        {/* Login Redirect */}
        <p style={{textAlign: "center"}}>
          Already have an account?{" "}
          <span 
            onClick={() => router.push("/login")} 
            style={{color: "#2193b0", cursor: "pointer", fontWeight: "bold"}}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}