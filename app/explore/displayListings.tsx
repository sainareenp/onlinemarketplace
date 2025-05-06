import React from "react";
import ListingCard from "@/components/listing/listingCard";
import { getAllListings, getUserFavoritesIds, Listing } from "@/lib/listingFunctions";
import { useAuth } from "@/context/AuthContext";

interface DisplayListingsProps {
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

const DisplayListings: React.FC<DisplayListingsProps> = ({
  searchQuery = "",
  minPrice,
  maxPrice,
}) => {
  const { user } = useAuth();
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      const all = await getAllListings();
      setListings(all);
      setFavorites(await getUserFavoritesIds(user.uid));
    };
    fetchListings();
  }, [user]);

  if (!user) return null;

  const q = searchQuery.trim().toLowerCase();

  const filtered = listings.filter((listing) => {
    // text match
    const textMatch =
      listing.title.toLowerCase().includes(q) ||
      listing.description?.toLowerCase().includes(q);

    // normalize price field to number
    const priceNum =
      typeof listing.price === "string"
        ? parseFloat(listing.price.toString().replace(/[^0-9.]/g, "")) || 0
        : listing.price || 0;

    const minOk = minPrice == null ? true : priceNum >= minPrice;
    const maxOk = maxPrice == null ? true : priceNum <= maxPrice;

    return textMatch && minOk && maxOk;
  });

  return (
    <div className="listings-container flex flex-wrap justify-center gap-4 p-4">
      {filtered.length > 0 ? (
        filtered.map((listing) => (
          <div key={listing.id} className="listing-item w-1/4 p-2">
            <ListingCard
              listing={listing}
              favorited={favorites.includes(listing.id)}
              userId={user.uid}
            />
          </div>
        ))
      ) : (
        <p>No listings match your search.</p>
      )}
    </div>
  );
};

export default DisplayListings;
