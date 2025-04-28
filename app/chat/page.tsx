"use client";

import { useState } from "react";
import { MainSidebar } from "@/components/navigation/MainSidebar";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatWindow, Conversation } from "@/components/chat/ChatWindow";
import { useAuth } from "@/context/AuthContext";

export default function MessagingPage() {
	const [activeConversation, setActiveConversation] =
		useState<Conversation | null>(null);
	const { user } = useAuth();

	const onSelect = async (conversation: Conversation) => {
		setActiveConversation(conversation);
	};

	if (!user) return null;

	return (
		<>
			{/* Main navigation */}
			<MainSidebar />

			{/* Conversation List */}
			<div className="border-r overflow-y-auto">
				<ConversationList onSelect={onSelect} />
			</div>

			{/* Main content */}
			<div className="flex-1 flex justify-center items-center overflow-auto p-6">
				{activeConversation ? (
					<div className="flex flex-col gap-8 items-center justify-center max-w-5xl w-full">
						{/* Inner container that centers horizontally */}
						<div className="flex flex-col items-center justify-center w-full">
							{/* Chat Window */}
							<div className="w-full max-w-2xl mx-auto pt-0">
								<div className="h-[40vh]">
									<ChatWindow
										activeConversation={activeConversation}
									/>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="text-gray-400 text-center w-full">
						Select a conversation to start chatting
					</div>
				)}
			</div>
		</>
	);
}
