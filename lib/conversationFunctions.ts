import {
	collection,
	addDoc,
	serverTimestamp,
	FieldValue,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export interface Message {
	id: string;
	message: string;
	senderId: string;
	timestamp: FieldValue;
}

export interface Conversation {
	participants: string[];
	itemId: string;
	lastMessage: string;
	updatedAt: FieldValue;
}

export const getOrCreateConversation = async (
	buyerId: string,
	sellerId: string,
	itemId: string
): Promise<string | null> => {
	try {
		const conversationsRef = collection(db, "conversations");

		if (buyerId === sellerId) {
			console.error("❌ Buyer and seller IDs are the same:", buyerId);
			return null;
		}

		// Check if conversation already exists
		const q = query(
			conversationsRef,
			where("participants", "array-contains", buyerId),
			where("itemId", "==", itemId)
		);

		const querySnapshot = await getDocs(q);

		// Filter results manually because array-contains only checks one participant
		const existingConversation = querySnapshot.docs.find((doc) => {
			const data = doc.data();
			return data.participants.includes(sellerId);
		});

		if (existingConversation) {
			console.log(
				"✅ Found existing conversation:",
				existingConversation.id
			);
			return existingConversation.id;
		}

		// If not found, create a new one
		const newConversationRef = await addDoc(conversationsRef, {
			participants: [buyerId, sellerId],
			itemId,
			lastMessage: "",
			updatedAt: serverTimestamp(),
		});

		console.log("✨ Created new conversation:", newConversationRef.id);
		return newConversationRef.id;
	} catch (error) {
		console.error("❌ Error finding or creating conversation:", error);
		return null;
	}
};

export const getUserName = async (userId: string): Promise<string | null> => {
	try {
		const userRef = collection(db, "users");
		const q = query(userRef, where("uid", "==", userId));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.log("❌ No user found with ID:", userId);
			return null;
		}

		const userDoc = querySnapshot.docs[0].data();
		console.log("✅ User found:", userDoc.name);
		return userDoc.name || null;
	} catch (error) {
		console.error("❌ Error fetching user name:", error);
		return null;
	}
};
