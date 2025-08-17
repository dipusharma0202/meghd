"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle Email + Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
      router.push("/dashboard"); // redirect after login
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Google Login successful!");
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
      background: "linear-gradient(to right, #8e2de2, #4a00e0)"
    }}>
      <form 
        onSubmit={handleLogin} 
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          width: "320px"
        }}
      >
        <h2 style={{textAlign: "center", marginBottom: "20px", color: "#4a00e0"}}>Login</h2>

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

        {/* Email Login Button */}
        <button 
          type="submit" 
          style={{width: "100%", padding: "10px", borderRadius: "8px", background: "#4a00e0", color: "white", fontWeight: "bold", marginBottom: "10px"}}
        >
          Login
        </button>

        {/* Google Login Button */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          style={{width: "100%", padding: "10px", borderRadius: "8px", background: "#db4437", color: "white", fontWeight: "bold", marginBottom: "15px"}}
        >
          Continue with Google
        </button>

        {/* Signup Redirect */}
        <p style={{textAlign: "center"}}>
          Don’t have an account?{" "}
          <span 
            onClick={() => router.push("/signup")} 
            style={{color: "#4a00e0", cursor: "pointer", fontWeight: "bold"}}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}