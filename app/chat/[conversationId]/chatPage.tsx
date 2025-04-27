"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
	collection,
	doc,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	getDoc,
	serverTimestamp,
	updateDoc,
	FieldValue,
} from "firebase/firestore";
import { Message } from "@/lib/conversationFunctions";

interface Conversation {
	participants: string[];
	itemId: string;
	lastMessage: string;
	updatedAt: FieldValue;
}

export default function ChatPage({
	conversationId,
}: {
	conversationId: string;
}) {
	const { user } = useAuth();
	const [conversation, setConversation] = useState<Conversation | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMsg, setNewMsg] = useState("");
	const router = useRouter();

	useEffect(() => {
		console.log("Conversation ID:", conversationId);
		if (!conversationId || !user) return;

		// Get conversation metadata
		const fetchConversation = async () => {
			const docRef = doc(db, "conversations", conversationId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log("Conversation data:", docSnap.data());
				setConversation(docSnap.data() as Conversation);
			} else {
				console.error("Conversation does not exist");
				router.push("/"); // Redirect if conversation missing
			}
		};

		fetchConversation();
	}, [conversationId, user]);

	useEffect(() => {
		if (!conversationId || !user) return;

		const q = query(
			collection(db, "conversations", conversationId, "messages"),
			orderBy("timestamp", "asc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const loaded = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Message[];
			setMessages(loaded);
		});

		return () => unsubscribe();
	}, [conversationId, user]);

	const submitMessage = async () => {
		if (!newMsg.trim()) {
			console.error("Message is empty");
			return;
		}
		if (!conversation) {
			console.error("Conversation not found");
			return;
		}
		if (!user) {
			console.error("User not authenticated");
			return;
		}

		const msgRef = collection(
			db,
			"conversations",
			conversationId,
			"messages"
		);

		await addDoc(msgRef, {
			senderId: user.uid,
			message: newMsg,
			timestamp: serverTimestamp(),
		});

		// Update the last message in conversation
		const convRef = doc(db, "conversations", conversationId);
		await updateDoc(convRef, {
			lastMessage: newMsg,
			updatedAt: serverTimestamp(),
		});

		setNewMsg("");
	};

	return (
		<div className="p-8 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Chat</h1>

			<div className="bg-gray-100 h-64 p-4 overflow-y-auto rounded shadow-sm mb-4">
				{messages.length === 0 ? (
					<p className="text-gray-500">No messages yet.</p>
				) : (
					messages.map((msg) => (
						<div key={msg.id} className="mb-2 text-black">
							<strong>
								{msg.senderId === user?.uid ? "You" : "Them"}:
							</strong>{" "}
							{msg.message}
						</div>
					))
				)}
			</div>

			<div className="flex gap-2">
				<input
					className="flex-1 border p-2 rounded"
					value={newMsg}
					onChange={(e) => setNewMsg(e.target.value)}
					placeholder="Type your message..."
				/>
				<button
					onClick={submitMessage}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				>
					Send
				</button>
			</div>
		</div>
	);
}
