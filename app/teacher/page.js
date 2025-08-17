"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function TeacherPage() {
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({ title: "", subject: "", description: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        fetchTests(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ✅ Fetch teacher's tests
  const fetchTests = async (uid) => {
    setLoading(true);
    const q = query(collection(db, "tests"), where("teacherId", "==", uid));
    const querySnapshot = await getDocs(q);
    const testsList = [];
    querySnapshot.forEach((docSnap) => {
      testsList.push({ id: docSnap.id, ...docSnap.data() });
    });
    setTests(testsList);
    setLoading(false);
  };

  // ✅ Add a new test
  const addTest = async () => {
    if (!newTest.title || !newTest.subject) {
      alert("Please fill all fields!");
      return;
    }
    const user = auth.currentUser;
    await addDoc(collection(db, "tests"), {
      ...newTest,
      teacherId: user.uid,
      createdAt: new Date(),
    });
    setNewTest({ title: "", subject: "", description: "" });
    fetchTests(user.uid);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Teacher Dashboard</h1>

      {/* Add New Test Form */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">➕ Add New Test</h2>
        <input
          type="text"
          placeholder="Test Title"
          value={newTest.title}
          onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Subject"
          value={newTest.subject}
          onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={newTest.description}
          onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={addTest}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Test
        </button>
      </div>

      {/* List of Tests */}
      <h2 className="text-lg font-semibold mb-2">📂 Your Tests</h2>
      {tests.length === 0 ? (
        <p>No tests created yet.</p>
      ) : (
        <ul className="space-y-2">
          {tests.map((test) => (
            <li key={test.id} className="border p-3 rounded">
              <h3 className="font-bold">{test.title}</h3>
              <p className="text-sm">{test.subject}</p>
              <p className="text-gray-600">{test.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}