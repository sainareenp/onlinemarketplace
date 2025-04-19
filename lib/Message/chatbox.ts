// pages/api/messages/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebaseConfig";// your firestore init
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { senderId, receiverId } = req.body || req.query;

  if (req.method === "POST") {
    const { content } = req.body;
    try {
      const newMessage = {
        senderId,
        receiverId,
        content,
        timestamp: Timestamp.now(),
        read: false,
      };
      const docRef = await addDoc(collection(db, "messages"), newMessage);
      res.status(200).json({ success: true, id: docRef.id });
    } catch (err) {
      res.status(500).json({ success: false, error: "Message send failed" });
    }
  } else if (req.method === "GET") {
    try {
      const q = query(
        collection(db, "messages"),
        where("senderId", "in", [senderId, receiverId]),
        where("receiverId", "in", [senderId, receiverId]),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);
      const messages = snapshot.docs.map((doc) => doc.data());
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: "Failed to load messages" });
    }
  }
}
