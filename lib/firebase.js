// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwT4Y2lMrU3HZEVscvfJrRCNveDearh8M",
  authDomain: "meghd-a3653.firebaseapp.com",
  projectId: "meghd-a3653",
  storageBucket: "meghd-a3653.firebasestorage.app",
  messagingSenderId: "486926754786",
  appId: "1:486926754786:web:4112769d372a76ce5d0fbb",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Ensure user doc exists; set default role "Teacher" on first login
export async function upsertUserProfile(user, defaultRole = "Teacher") {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email || "",
      role: defaultRole,
      createdAt: new Date(),
    });
  }
  return (await getDoc(ref)).data();
}

export async function signInWithGoogleAndProfile() {
  const res = await signInWithPopup(auth, googleProvider);
  const profile = await upsertUserProfile(res.user);
  return { user: res.user, profile };
}

export { signOut };