import { db } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createNotification = async (
  userId: string,
  message: string
): Promise<void> => {
  try {
    console.log("📣 Listing Created By:", userId, message);
    await addDoc(collection(db, "notifications"), {
      userId,
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error creating notification:", err);
  }
};
