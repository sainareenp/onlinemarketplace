"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
	Timestamp,
} from "firebase/firestore";

interface Conversation {
	id: string;
	participants: string[];
	itemId: string;
	lastMessage: string;
	updatedAt: Timestamp;
}

export function ConversationList({
	onSelect,
}: {
	onSelect: (convo: Conversation) => void;
}) {
	const { user } = useAuth();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const searchParams = useSearchParams();
	const conversationId = searchParams.get("conversationId");

	useEffect(() => {
		if (conversationId && conversations.length > 0) {
			const currentConversation = conversations.find(
				(convo) => convo.id === conversationId
			);
			if (currentConversation) {
				onSelect(currentConversation);
			}
		}
	}, [conversationId, conversations]);

	useEffect(() => {
		if (!user) return;

		const q = query(
			collection(db, "conversations"),
			where("participants", "array-contains", user.uid),
			orderBy("updatedAt", "desc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const convos = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Conversation[];
			setConversations(convos);
		});

		return () => unsubscribe();
	}, [user]);

	return (
		<div className="w-[300px] border-r overflow-y-auto h-full flex flex-col">
			<h2 className="text-lg font-semibold p-4 border-b">
				Conversations
			</h2>
			{conversations.map((convo) => (
				<div
					key={convo.id}
					className="p-4 hover:bg-gray-100 cursor-pointer"
					onClick={() => onSelect(convo)}
				>
					<div className="font-medium truncate">
						{convo.lastMessage || "New conversation"}
					</div>
				</div>
			))}
		</div>
	);
}
