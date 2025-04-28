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
import { ScrollArea } from "../ui/scroll-area";
import { Listing } from "@/lib/listingFunctions";
import ListingPreview from "../listing/listingPreview";
import { getUserName } from "@/lib/conversationFunctions";

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
	listing: Listing | null;
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
	const [participantNames, setParticipantNames] = useState<string>("");

	useEffect(() => {
		if (!activeConversation || !user) return;

		const q = query(
			collection(db, "conversations", activeConversation.id, "messages"),
			orderBy("timestamp", "asc")
		);

		const participantNames = async () => {
			const names = (
				await Promise.all(
					activeConversation.participants
						.filter((id) => id !== user?.uid)
						.map(async (id) => {
							const participant = await getUserName(id);
							console.log("Participant name:", participant);
							return participant || id;
						})
				)
			).join(", ");
			setParticipantNames(names);
		};

		participantNames();

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

	if (!user) {
		return (
			<div className="flex-1 flex items-center justify-center text-gray-400">
				Please log in to view messages
			</div>
		);
	}

	if (!activeConversation) {
		return (
			<div className="flex-1 flex items-center justify-center text-gray-400">
				Select a conversation to start chatting
			</div>
		);
	}

	return (
		<div className="flex-col justify-center items-center flex-1 pt-0  p-6 h-full">
			{activeConversation.listing && (
				<div className="w-full max-w-2xl mx-auto p-0 pb-4">
					<ListingPreview
						listing={activeConversation.listing}
						favorited={false}
						userId={user.uid}
					/>
				</div>
			)}
			<div className="w-full max-w-2xl bg-background border rounded-lg shadow-lg flex flex-col overflow-hidden h-full">
				{/* Chat Header */}
				<div className="border-b text-md text-muted-foreground flex justify-between items-center">
					<span className="text-md text-primary pl-4">{`${participantNames}`}</span>
				</div>

				{/* Messages */}
				<ScrollArea className="flex-1 overflow-y-auto">
					<div className="p-4 space-y-4">
						{messages.map((msg) => (
							<div
								key={msg.id}
								className={`p-2 rounded-lg max-w-[70%] w-fit ${
									msg.senderId === user?.uid
										? "ml-auto bg-primary text-secondary-foreground"
										: "bg-secondary text-secondary-foreground"
								}`}
							>
								{msg.message}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</ScrollArea>

				{/* Message Input */}
				<div className="p-4 border-t flex gap-2">
					<input
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" && handleSendMessage()
						}
						className="flex-1 border p-2 rounded bg-input text-input-foreground placeholder:text-muted-foreground"
						placeholder="Type your message..."
					/>
					<button
						onClick={handleSendMessage}
						className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
