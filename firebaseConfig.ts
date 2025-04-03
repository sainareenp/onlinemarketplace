// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtnvQxVJkmDHdQyCBjCgBZ0bm5818dXnk",
  authDomain: "marketplace-5852f.firebaseapp.com",
  projectId: "marketplace-5852f",
  storageBucket: "marketplace-5852f.firebasestorage.app",
  messagingSenderId: "739366667555",
  appId: "1:739366667555:web:4732212b6a448453a1b896",
  measurementId: "G-LGNZSWD1P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export auth and db so they can be imported elsewhere
export { auth, db };
