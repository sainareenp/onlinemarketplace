// firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let app;

// Make sure Firebase isn't initialized multiple times
if (!getApps().length) {
	app = initializeApp({
		apiKey: "AIzaSyBtnvQxVJkmDHdQyCBjCgBZ0bm5818dXnk",
  authDomain: "marketplace-5852f.firebaseapp.com",
  projectId: "marketplace-5852f",
  storageBucket: "marketplace-5852f.firebasestorage.app",
  messagingSenderId: "739366667555",
  appId: "1:739366667555:web:4732212b6a448453a1b896",
  measurementId: "G-LGNZSWD1P4"
	});
} else {
	app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Optional: You can add Firebase Analytics if needed
export { app, auth, db, storage };
