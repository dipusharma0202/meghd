const admin = require("firebase-admin");

// Initialize Firebase Admin with your service account
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to set role
async function setUserRole(uid, role) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: role });
    console.log( 'Role ${role} has been assigned to user: ${uid}');
    process.exit(0); // Exit after success
  } catch (error) {
    console.error(" Error setting role:", error);
    process.exit(1); // Exit with error
  }
}

// -------- EDIT THIS --------
// Replace with Firebase Auth UID of the user and the role
const userId = "ZcUzhclKbVQ782YZdO5xv5Nx7tU2"; 
const role = "admin";  // e.g., "admin" | "teacher" | "student"
// ----------------------------

setUserRole(userId, role);