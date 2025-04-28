
"use client";
import React from "react";
import ListingCard from "@/components/listing/listingCard";
import { getUserCart } from "@/lib/listingFunctions";
import { useAuth } from "@/context/AuthContext";
import { Listing } from "@/lib/listingFunctions";

const CartDisplayListings: React.FC = () => {
	const { user } = useAuth();
	const [listings, setListings] = React.useState<Listing[]>([]);

	React.useEffect(() => {
		const fetchListings = async () => {
			try {
				if (!user) return;
				const userListings = await getUserCart(user?.uid);
				setListings(userListings);
			} catch (error) {
				console.error("Error fetching cart listings:", error);
			}
		};
		fetchListings();
	}, [user]);

	if (!user) return null;

	return (
		<div className="listings-container flex flex-wrap justify-center gap-4 p-4">
			{listings.length > 0 ? (
				listings.map((listing) => (
					<div key={listing.id} className="listing-item w-1/4 p-2">
						<ListingCard
							key={listing.id}
							listing={listing}
							favorited={false} // No favorited for cart
							userId={user.uid}
						/>
					</div>
				))
			) : (
				<p>No listings in your cart yet.</p>
			)}
		</div>
	);
};

export default CartDisplayListings;
