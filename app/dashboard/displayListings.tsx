import React from "react";
import ListingCard from "@/components/listing/listingCard";
import { getUserFavoritesIds, getUserListings } from "@/lib/listingFunctions";
import { useAuth } from "@/context/AuthContext"; // Adjust the path as needed
import { Listing } from "@/lib/listingFunctions"; // Adjust the import path as needed

const DisplayListings: React.FC = () => {
	const { user } = useAuth(); // Adjust the path as needed
	const [listings, setListings] = React.useState<Listing[]>([]);
	const [favorites, setFavorites] = React.useState<string[]>([]);

	React.useEffect(() => {
		const fetchListings = async () => {
			try {
				if (!user) return;
				const userListings = await getUserListings(user?.uid);
				setListings(userListings);
				const userFavorites = await getUserFavoritesIds(user?.uid);
				setFavorites(userFavorites);
			} catch (error) {
				console.error("Error fetching user listings:", error);
			}
		};
		fetchListings();
	}, [user]);
	if (!user) return null; // Ensure user is logged in
	return (
		<div className="listings-container">
			{listings.length > 0 ? (
				listings.map((listing) => (
					<ListingCard
						key={listing.id}
						listing={listing}
						userId={user.uid}
						favorited={favorites.includes(listing.id)}
					/>
				))
			) : (
				<p>No listings available.</p>
			)}
		</div>
	);
};

export default DisplayListings;
