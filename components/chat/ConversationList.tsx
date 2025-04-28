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
import { getListingById, Listing } from "@/lib/listingFunctions";
import { format, isToday, isYesterday } from "date-fns";

interface Conversation {
	id: string;
	participants: string[];
	itemId: string;
	lastMessage: string;
	updatedAt: Timestamp;
	listing: Listing | null;
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

		const unsubscribe = onSnapshot(q, async (snapshot) => {
			const convos = (await Promise.all(
				snapshot.docs.map(async (doc) => {
					const data = doc.data();
					const listing = data.itemId
						? await getListingById(data.itemId)
						: null;
					return {
						id: doc.id,
						...data,
						listing,
					};
				})
			)) as Conversation[];
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
					className="p-4 hover:bg-muted cursor-pointer"
					onClick={() => onSelect(convo)}
				>
					<div className="font-medium truncate text-foreground">
						{convo.listing?.title || "Unnamed Listing"}
					</div>
					<div className="text-sm text-secondary-foreground/60 truncate">
						{convo.lastMessage || "No messages yet"}
					</div>
					<div className="text-xs text-primary/80">
						{(() => {
							if (!convo.updatedAt) return "...";

							const updatedDate = convo.updatedAt.toDate();

							if (isToday(updatedDate)) {
								return format(updatedDate, "p");
							} else if (isYesterday(updatedDate)) {
								return "Yesterday";
							} else {
								return format(updatedDate, "MM/dd/yyyy");
							}
						})()}
					</div>
				</div>
			))}
		</div>
	);
}
