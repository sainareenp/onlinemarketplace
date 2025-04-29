
// "use client";
// import React from "react";
// import ListingCard from "@/components/listing/listingCard";
// import { getUserCart } from "@/lib/listingFunctions";
// import { useAuth } from "@/context/AuthContext";
// import { Listing } from "@/lib/listingFunctions";

// const CartDisplayListings: React.FC = () => {
// 	const { user } = useAuth();
// 	const [listings, setListings] = React.useState<Listing[]>([]);

// 	React.useEffect(() => {
// 		const fetchListings = async () => {
// 			try {
// 				if (!user) return;
// 				const userListings = await getUserCart(user?.uid);
// 				setListings(userListings);
// 			} catch (error) {
// 				console.error("Error fetching cart listings:", error);
// 			}
// 		};
// 		fetchListings();
// 	}, [user]);

// 	if (!user) return null;

// 	return (
// 		<div className="listings-container flex flex-wrap justify-center gap-4 p-4">
// 			{listings.length > 0 ? (
// 				listings.map((listing) => (
// 					<div key={listing.id} className="listing-item w-1/4 p-2">
// 						<ListingCard
// 							key={listing.id}
// 							listing={listing}
// 							favorited={false} // No favorited for cart
// 							userId={user.uid}
// 						/>
// 					</div>
// 				))
// 			) : (
// 				<p>No listings in your cart yet.</p>
// 			)}
// 		</div>
// 	);
// };

// export default CartDisplayListings;

"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "@/components/listing/listingCard";
import { getUserCart } from "@/lib/listingFunctions";
import { useAuth } from "@/context/AuthContext";
import { Listing } from "@/lib/listingFunctions";
import { useRouter } from "next/navigation";

const CartDisplayListings: React.FC = () => {
	const { user } = useAuth();
	const [listings, setListings] = useState<Listing[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				if (!user) return;
				const userListings = await getUserCart(user.uid);
				setListings(userListings);
			} catch (error) {
				console.error("Error fetching cart listings:", error);
			}
		};
		fetchListings();
	}, [user]);

	if (!user) return null;

	const totalPrice = listings.reduce((sum, item) => sum + item.price, 0);

	return (
		<div className="listings-container flex flex-col items-center gap-6 p-4">
			<div className="flex flex-wrap justify-center gap-4 w-full">
				{listings.length > 0 ? (
					listings.map((listing) => (
						<div key={listing.id} className="listing-item w-1/4 p-2">
							<ListingCard
								listing={listing}
								favorited={false}
								userId={user.uid}
							/>
						</div>
					))
				) : (
					<p>No listings in your cart yet.</p>
				)}
			</div>

			{listings.length > 0 && (
				<div className="w-full max-w-4xl mt-6">
					<div className="flex justify-between items-center text-lg font-semibold p-4 border rounded shadow-sm bg-card">
						<span>Total:</span>
						<span>${totalPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-end mt-4">
						<button
							onClick={() => router.push("/checkout")}
							className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-6 rounded"
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartDisplayListings;

