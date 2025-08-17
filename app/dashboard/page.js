"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) return <p style={{textAlign:"center", marginTop:"50px"}}>Loading...</p>;

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"linear-gradient(to right, #00c6ff, #0072ff)"
    }}>
      <div style={{
        background:"white",
        padding:"30px",
        borderRadius:"15px",
        boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
        width:"400px",
        textAlign:"center"
      }}>
        <h2 style={{color:"#0072ff"}}>Welcome, {user.email}</h2>
        <p style={{marginBottom:"20px"}}>You are now logged in 🎉</p>
        <button 
          onClick={handleLogout} 
          style={{padding:"10px 20px", borderRadius:"8px", background:"#ff4d4d", color:"white", fontWeight:"bold"}}
        >
          Logout
        </button>
      </div>
    </div>
  );
}