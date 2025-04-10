import { db } from "@/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";

export interface Listing {
	id: string;
	name: string;
	description: string;
	price: number;
	photos: string[];
}


export async function getUserListings(userId: string): Promise<Listing[]> {
	if (!userId) {
		throw new Error("User ID is required.");
	}

    const listingsRef = collection(db, "listings", "users", userId);
	const snapshot = await getDocs(listingsRef);

	try {
	const listings: Listing[] = snapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			name: data.name || "",
			description: data.description || "",
			price: data.price || 0,
			photos: data.photos || [],
			createdAt: data.createdAt || new Date(),
		} as Listing;
	});
		return listings;
	} catch (error) {
		console.error("Error fetching user listings:", error);
		throw error;
	}
}
