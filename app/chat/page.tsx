"use client";

import { useState } from "react";
import { MainSidebar } from "@/components/navigation/MainSidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatWindow, Conversation } from "@/components/chat/ChatWindow";
import ListingCard from "@/components/ui/listingCard";
import { getListingById, Listing } from "@/lib/listingFunctions";
import { useAuth } from "@/context/AuthContext";

export default function MessagingPage() {
	const [activeConversation, setActiveConversation] =
		useState<Conversation | null>(null);
	const [activeListing, setActiveListing] = useState<Listing | null>(null);
	const { user } = useAuth();

	const onSelect = async (conversation: Conversation) => {
		const listing = await getListingById(conversation.itemId);
		setActiveListing(listing);
		setActiveConversation(conversation);
	};

	if (!user) return null;

	return (
		<div className="flex h-screen">
			{/* Main navigation */}
			<MainSidebar />

			{/* Conversation List */}
			<div className="w-[300px] border-r overflow-y-auto">
				<ConversationList onSelect={onSelect} />
			</div>

			{/* Main content */}
			<div className="flex-1 flex justify-center items-center overflow-auto p-6">
				{activeConversation && activeListing ? (
					<div className="flex gap-8 items-center justify-center max-w-7xl w-full">
						{/* Chat window */}
						<div className="flex-1 flex justify-center">
							<ChatWindow
								activeConversation={activeConversation}
							/>
						</div>

						{/* Listing card */}
						<div className="flex-shrink-0 w-[350px]">
							<ListingCard
								listing={activeListing}
								userId={user?.uid || ""}
								favorited={false}
							/>
						</div>
					</div>
				) : (
					<div className="text-gray-400">
						Select a conversation to start chatting
					</div>
				)}
			</div>
		</div>
	);
}