// pages/chat/[sellerId].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Message type definition
type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string | Date;
};

export default function ChatPage() {
  const router = useRouter();
  const { sellerId, item } = router.query;

  // ✅ Simulated current user ID (replace with real auth user ID)
  const senderId = "currentUser123";

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState<string>("");

  // ✅ Load messages between buyer and seller
  useEffect(() => {
    if (!sellerId) return;

    axios
      .get<Message[]>(`/api/messages?senderId=${senderId}&receiverId=${sellerId}`)
      .then((res) => setMessages(res.data))
      .catch((err: unknown) => {
        console.error("Failed to fetch messages", err);
      });
  }, [sellerId]);

  // ✅ Send new message
  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const msg: Message = {
      senderId,
      receiverId: sellerId as string,
      content: newMsg,
      timestamp: new Date(),
    };

    try {
      await axios.post("/api/messages", msg);
      setMessages((prev) => [...prev, msg]);
      setNewMsg("");
    } catch (error: unknown) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat with Seller</h2>

      {/* Chat Messages */}
      <div className="border p-4 mb-4 h-64 overflow-y-auto bg-gray-100 rounded shadow-sm">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">
                {msg.senderId === senderId ? "You" : "Seller"}:
              </span>{" "}
              {msg.content}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 p-2 rounded"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
