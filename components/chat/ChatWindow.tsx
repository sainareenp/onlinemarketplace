"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	serverTimestamp,
	doc,
	updateDoc,
	Timestamp,
} from "firebase/firestore";

interface Message {
	id: string;
	senderId: string;
	message: string;
	timestamp: Timestamp;
}

export interface Conversation {
	id: string;
	participants: string[];
	itemId: string;
	lastMessage: string;
	updatedAt: Timestamp;
}

export function ChatWindow({
	activeConversation,
}: {
	activeConversation: Conversation | null;
}) {
	const { user } = useAuth();
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!activeConversation || !user) return;

		const q = query(
			collection(db, "conversations", activeConversation.id, "messages"),
			orderBy("timestamp", "asc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const msgs = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Message[];
			setMessages(msgs);

			// Auto scroll to bottom
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 100);
		});

		return () => unsubscribe();
	}, [activeConversation, user]);

	const handleSendMessage = async () => {
		if (!newMessage.trim() || !activeConversation || !user) return;

		const msgRef = collection(
			db,
			"conversations",
			activeConversation.id,
			"messages"
		);
		await addDoc(msgRef, {
			senderId: user.uid,
			message: newMessage,
			timestamp: serverTimestamp(),
		});

		await updateDoc(doc(db, "conversations", activeConversation.id), {
			lastMessage: newMessage,
			updatedAt: serverTimestamp(),
		});

		setNewMessage("");
	};

	if (!activeConversation) {
		return (
			<div className="flex-1 flex items-center justify-center text-gray-400">
				Select a conversation to start chatting
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center flex-1 p-6">
			<div className="w-full max-w-2xl bg-white border rounded-lg shadow-lg flex flex-col overflow-hidden h-[80vh]">
				{/* Chat Header */}
				<div className="p-4 border-b text-sm text-gray-500 flex justify-between items-center">
					<span>
						{`Chat with ${activeConversation.participants
							.filter((id) => id !== user?.uid)
							.join(", ")}`}
					</span>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-4 space-y-4">
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`p-2 rounded-lg max-w-[70%] ${
								msg.senderId === user?.uid
									? "ml-auto bg-blue-600 text-white"
									: "bg-gray-300 text-black"
							}`}
						>
							{msg.message}
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				{/* Message Input */}
				<div className="p-4 border-t flex gap-2">
					<input
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" && handleSendMessage()
						}
						className="flex-1 border p-2 rounded"
						placeholder="Type your message..."
					/>
					<button
						onClick={handleSendMessage}
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
