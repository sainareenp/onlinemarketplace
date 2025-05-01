// "use client";

// import { useEffect, useState, useRef } from "react";
// import { db } from "@/firebaseConfig";
// import { useAuth } from "@/context/AuthContext";
// import {
// 	collection,
// 	query,
// 	orderBy,
// 	onSnapshot,
// 	addDoc,
// 	serverTimestamp,
// 	doc,
// 	updateDoc,
// 	Timestamp,
// } from "firebase/firestore";
// import { ScrollArea } from "../ui/scroll-area";
// import { Listing } from "@/lib/listingFunctions";
// import ListingPreview from "../listing/listingPreview";
// import { getUserName } from "@/lib/conversationFunctions";

// interface Message {
// 	id: string;
// 	senderId: string;
// 	message: string;
// 	timestamp: Timestamp;
// }

// export interface Conversation {
// 	id: string;
// 	participants: string[];
// 	itemId: string;
// 	lastMessage: string;
// 	updatedAt: Timestamp;
// 	listing: Listing | null;
// }

// export function ChatWindow({
// 	activeConversation,
// }: {
// 	activeConversation: Conversation | null;
// }) {
// 	const { user } = useAuth();
// 	const [messages, setMessages] = useState<Message[]>([]);
// 	const [newMessage, setNewMessage] = useState("");
// 	const messagesEndRef = useRef<HTMLDivElement>(null);
// 	const [participantNames, setParticipantNames] = useState<string>("");

// 	useEffect(() => {
// 		if (!activeConversation || !user) return;

// 		const q = query(
// 			collection(db, "conversations", activeConversation.id, "messages"),
// 			orderBy("timestamp", "asc")
// 		);

// 		const participantNames = async () => {
// 			const names = (
// 				await Promise.all(
// 					activeConversation.participants
// 						.filter((id) => id !== user?.uid)
// 						.map(async (id) => {
// 							const participant = await getUserName(id);
// 							console.log("Participant name:", participant);
// 							return participant || id;
// 						})
// 				)
// 			).join(", ");
// 			setParticipantNames(names);
// 		};

// 		participantNames();

// 		const unsubscribe = onSnapshot(q, (snapshot) => {
// 			const msgs = snapshot.docs.map((doc) => ({
// 				id: doc.id,
// 				...doc.data(),
// 			})) as Message[];
// 			setMessages(msgs);

// 			// Auto scroll to bottom
// 			setTimeout(() => {
// 				messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 			}, 100);
// 		});

// 		return () => unsubscribe();
// 	}, [activeConversation, user]);

// 	const handleSendMessage = async () => {
// 		if (!newMessage.trim() || !activeConversation || !user) return;

// 		const msgRef = collection(
// 			db,
// 			"conversations",
// 			activeConversation.id,
// 			"messages"
// 		);
// 		await addDoc(msgRef, {
// 			senderId: user.uid,
// 			message: newMessage,
// 			timestamp: serverTimestamp(),
// 		});

// 		await updateDoc(doc(db, "conversations", activeConversation.id), {
// 			lastMessage: newMessage,
// 			updatedAt: serverTimestamp(),
// 		});

// 		setNewMessage("");
// 	};

// 	if (!user) {
// 		return (
// 			<div className="flex-1 flex items-center justify-center text-gray-400">
// 				Please log in to view messages
// 			</div>
// 		);
// 	}

// 	if (!activeConversation) {
// 		return (
// 			<div className="flex-1 flex items-center justify-center text-gray-400">
// 				Select a conversation to start chatting
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="flex-col justify-center items-center flex-1 pt-0  p-6 h-full">
// 			{activeConversation.listing && (
// 				<div className="w-full max-w-2xl mx-auto p-0 pb-4">
// 					<ListingPreview
// 						listing={activeConversation.listing}
// 						favorited={false}
// 						userId={user.uid}
// 					/>
// 				</div>
// 			)}
// 			<div className="w-full max-w-2xl bg-background border rounded-lg shadow-lg flex flex-col overflow-hidden h-full">
// 				{/* Chat Header */}
// 				<div className="border-b text-md text-muted-foreground flex justify-between items-center">
// 					<span className="text-md text-primary pl-4">{`${participantNames}`}</span>
// 				</div>

// 				{/* Messages */}
// 				<ScrollArea className="flex-1 overflow-y-auto">
// 					<div className="p-4 space-y-4">
// 						{messages.map((msg) => (
// 							<div
// 								key={msg.id}
// 								className={`p-2 rounded-lg max-w-[70%] w-fit ${
// 									msg.senderId === user?.uid
// 										? "ml-auto bg-primary text-secondary-foreground"
// 										: "bg-secondary text-secondary-foreground"
// 								}`}
// 							>
// 								{msg.message}
// 							</div>
// 						))}
// 						<div ref={messagesEndRef} />
// 					</div>
// 				</ScrollArea>

// 				{/* Message Input */}
// 				<div className="p-4 border-t flex gap-2">
// 					<input
// 						value={newMessage}
// 						onChange={(e) => setNewMessage(e.target.value)}
// 						onKeyDown={(e) =>
// 							e.key === "Enter" && handleSendMessage()
// 						}
// 						className="flex-1 border p-2 rounded bg-input text-input-foreground placeholder:text-muted-foreground"
// 						placeholder="Type your message..."
// 					/>
// 					<button
// 						onClick={handleSendMessage}
// 						className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
// 					>
// 						Send
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
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
  setDoc,
  serverTimestamp as firestoreTimestamp,
} from "firebase/firestore";
import { ScrollArea } from "../ui/scroll-area";
import { Listing } from "@/lib/listingFunctions";
import ListingPreview from "../listing/listingPreview";
import { getUserName } from "@/lib/conversationFunctions";
import { format, formatDistanceToNow } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import PresenceIndicator from "@/components/PresenceIndicator";

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: Timestamp;
  read?: boolean;
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
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [participantNames, setParticipantNames] = useState<string>("");

  const otherUserId =
    activeConversation?.participants.find((id) => id !== user?.uid) || "";

  useEffect(() => {
    if (!activeConversation || !user) return;

    const q = query(
      collection(db, "conversations", activeConversation.id, "messages"),
      orderBy("timestamp", "asc")
    );

    const fetchNames = async () => {
      const names = (
        await Promise.all(
          activeConversation.participants
            .filter((id) => id !== user?.uid)
            .map(async (id) => {
              const participant = await getUserName(id);
              return participant || id;
            })
        )
      ).join(", ");
      setParticipantNames(names);
    };

    fetchNames();

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(msgs);

      for (const msg of msgs) {
		if (msg.senderId !== user?.uid && !msg.read) {
		  await updateDoc(doc(db, "conversations", activeConversation.id, "messages", msg.id), {
			read: true,
		  });
		}
	  }
    });

    return () => unsubscribe();
  }, [activeConversation, user]);

  useEffect(() => {
    if (!user) return;
    const userStatusRef = doc(db, "status", user.uid);
    setDoc(userStatusRef, { online: true, lastSeen: firestoreTimestamp() });

    window.addEventListener("beforeunload", () => {
      setDoc(userStatusRef, { online: false, lastSeen: firestoreTimestamp() });
    });

    return () => {
      setDoc(userStatusRef, { online: false, lastSeen: firestoreTimestamp() });
    };
  }, [user]);

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
      read: false,
    });

    await updateDoc(doc(db, "conversations", activeConversation.id), {
      lastMessage: newMessage,
      updatedAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  const handleEmojiClick = (emojiData: any) => {
    setNewMessage((prev) => prev + emojiData.emoji);
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
    <div className="flex flex-col justify-center items-center flex-1 p-4 h-full min-h-lg">
      {activeConversation.listing && (
        <div className="w-full max-w-2xl mx-auto pb-4">
          <ListingPreview
            listing={activeConversation.listing}
            favorited={false}
            userId={user.uid}
          />
        </div>
      )}

      <div className="w-full h-[30vh] max-w-2xl border rounded-lg shadow-lg flex flex-col overflow-hidden bg-white dark:bg-black">
        <div className="border-b px-4 py-2 bg-gray-50 dark:bg-gray-900 text-sm font-semibold flex justify-between items-center">
          <span className="text-primary">Chat with: {participantNames}</span>
          <PresenceIndicator userId={otherUserId} />
        </div>

        <ScrollArea className="flex-1 overflow-y-auto max-h-[70vh] bg-gray-100 dark:bg-gray-800">
          <div className="p-4 space-y-3 min-h-lg">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`px-4 py-2 rounded-xl shadow text-sm max-w-[75%] break-words ${
                  msg.senderId === user?.uid
                    ? "ml-auto bg-green-100 text-black rounded-br-none"
                    : "bg-white dark:bg-gray-700 text-black dark:text-white rounded-bl-none"
                }`}
              >
                <div>{msg.message}</div>
                <div className="text-[10px] text-right text-gray-500 mt-1 flex justify-end gap-1">
                  {msg.timestamp?.toDate ? format(msg.timestamp.toDate(), "p") : ""}
                  {msg.senderId === user?.uid && (
                    <span className={msg.read ? "text-blue-500" : "text-gray-400"}>
                      {msg.read ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-gray-50 dark:bg-gray-900 flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setShowEmoji(!showEmoji)}>
              <FaSmile className="text-2xl text-gray-500" />
            </button>
            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} height={350} width={300} />
              </div>
            )}
          </div>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 border border-gray-300 p-2 rounded bg-white text-black placeholder:text-gray-500"
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
