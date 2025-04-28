import { db } from "@/firebaseConfig";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from "@firebase/firestore";

export interface Listing {
	id: string;
	title: string;
	description: string;
	price: number;
	city: string;
	state: string;
	userId: string;
	photos: string[];
}

export async function getListingById(
	listingId: string
): Promise<Listing | null> {
	if (!listingId) {
		throw new Error("Listing ID is required.");
	}

	const listingDoc = await getDoc(doc(db, "listings", listingId));

	try {
		if (!listingDoc.exists()) {
			return null;
		}
		return {
			id: listingDoc.id,
			...listingDoc.data(),
		} as Listing;
	} catch (error) {
		console.error("Error fetching listing:", error);
		throw error;
	}
}

export async function getUserListings(userId: string): Promise<Listing[]> {
	if (!userId) {
		throw new Error("User ID is required.");
	}

	const userListingsRef = collection(db, "users", userId, "listings");
	const userListingSnapshots = await getDocs(userListingsRef);

	const listingIds = userListingSnapshots.docs.map((doc) => doc.id);

	try {
		const listings: Listing[] = await Promise.all(
			listingIds.map(async (listingId) => {
				console.log("Listing ID:", listingId);
				const listing = await getListingById(listingId);
				if (listing) {
					return listing;
				}
				throw new Error(`Listing with ID ${listingId} not found.`);
			})
		);
		return listings;
	} catch (error) {
		console.error("Error fetching user listings:", error);
		throw error;
	}
}

export async function getUserFavorites(userId: string): Promise<Listing[]> {
	if (!userId) {
		throw new Error("User ID is required.");
	}

	const userFavoritesRef = collection(db, "users", userId, "favorites");
	const favoriteListingSnapshots = await getDocs(userFavoritesRef);

	const listingIds = favoriteListingSnapshots.docs.map((doc) => doc.id);

	try {
		const listings: Listing[] = await Promise.all(
			listingIds.map(async (listingId) => {
				console.log("Favorite Listing ID:", listingId);
				const listing = await getListingById(listingId);
				if (listing) {
					return listing;
				}
				throw new Error(
					`Favorite listing with ID ${listingId} not found.`
				);
			})
		);
		return listings;
	} catch (error) {
		console.error("Error fetching user favorites:", error);
		throw error;
	}
}

export async function getUserFavoritesIds(userId: string): Promise<string[]> {
	if (!userId) {
		throw new Error("User ID is required.");
	}

	const userFavoritesRef = collection(db, "users", userId, "favorites");
	const favoriteListingSnapshots = await getDocs(userFavoritesRef);

	const listingIds = favoriteListingSnapshots.docs.map((doc) => doc.id);
	return listingIds;
}

export async function getAllListings(): Promise<Listing[]> {
	const listingsRef = collection(db, "listings");
	const snapshot = await getDocs(listingsRef);
	try {
		const listings: Listing[] = snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				...data,
			} as Listing;
		});
		return listings;
	} catch (error) {
		console.error("Error fetching all listings:", error);
		throw error;
	}
}

export async function updateFavorited(listingId: string, userId: string) {
	if (!listingId || !userId) {
		throw new Error("Listing ID and User ID are required.");
	}

	try {
		const userFavoriteListingsRef = collection(
			db,
			"users",
			userId,
			"favorites"
		);
		const favoriteListingSnapshots = await getDocs(userFavoriteListingsRef);

		const listingIds = favoriteListingSnapshots.docs.map((doc) => doc.id);
		if (listingIds.includes(listingId)) {
			// If the listing is already favorited, remove it
			const listingDocRef = doc(userFavoriteListingsRef, listingId);
			await deleteDoc(listingDocRef);
		} else {
			// If the listing is not favorited, add it
			const listingDocRef = doc(userFavoriteListingsRef, listingId);
			await setDoc(listingDocRef, { listingId }, { merge: true });
		}
	} catch (error) {
		console.error("Error updating favorites:", error);
		throw error;
	}
}

export async function updateCart(listingId: string, userId: string) {
	if (!listingId || !userId) {
		throw new Error("Listing ID and User ID are required.");
	}

	try {
		const userCartListingsRef = collection(db, "users", userId, "cart");
		const cartListingSnapshots = await getDocs(userCartListingsRef);

		const listingIds = cartListingSnapshots.docs.map((doc) => doc.id);
		if (listingIds.includes(listingId)) {
			// If the listing is already in cart, remove it
			const listingDocRef = doc(userCartListingsRef, listingId);
			await deleteDoc(listingDocRef);
		} else {
			// If the listing is not in cart, add it
			const listingDocRef = doc(userCartListingsRef, listingId);
			await setDoc(listingDocRef, { listingId }, { merge: true });
		}
	} catch (error) {
		console.error("Error updating cart:", error);
		throw error;
	}
	
}

export async function getUserCart(userId: string): Promise<Listing[]> {
	if (!userId) {
		throw new Error("User ID is required.");
	}

	const userCartRef = collection(db, "users", userId, "cart");
	const cartListingSnapshots = await getDocs(userCartRef);

	const listingIds = cartListingSnapshots.docs.map((doc) => doc.id);

	try {
		const listings: Listing[] = await Promise.all(
			listingIds.map(async (listingId) => {
				console.log("Cart Listing ID:", listingId);
				const listing = await getListingById(listingId);
				if (listing) {
					return listing;
				}
				throw new Error(`Cart listing with ID ${listingId} not found.`);
			})
		);
		return listings;
	} catch (error) {
		console.error("Error fetching user cart listings:", error);
		throw error;
	}
}