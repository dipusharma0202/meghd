import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        // fetch role from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const role = docSnap.data().role;
          setUserRole(role);

          if (allowedRoles && !allowedRoles.includes(role)) {
            router.push("/unauthorized"); // redirect if not allowed
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, allowedRoles]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}