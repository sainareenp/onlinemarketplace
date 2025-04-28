"use client"; // ✅ Required for useState, useEffect, and useRouter

import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Listing, updateCart, updateFavorited } from "@/lib/listingFunctions"; // Adjust the import path as needed
import ListingPopup from "./listingPopup";

const ListingPreview: React.FC<{
	listing: Listing;
	favorited: boolean;
	userId: string;
}> = ({ listing, favorited, userId }) => {
	const [showModal, setShowModal] = useState(false);
	const [isFavorited, setIsFavorited] = useState(favorited);

	// Sync isFavorited with the favorited prop
	useEffect(() => {
		setIsFavorited(favorited);
	}, [favorited]);

	if (!userId) return null;

	const handleFavoritedToggle = () => {
		setIsFavorited((prev) => !prev);
		updateFavorited(listing.id, userId);
	};

	const handleAddToCart = () => {
		updateCart(listing.id, userId);
	};

	return (
		<>
			<Card
				className="w-full cursor-pointer py-0"
				onClick={() => setShowModal(true)}
			>
				<div className="flex items-center justify-between gap-4 p-4">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10">
							<AspectRatio ratio={1}>
								<img
									src={listing.photos[0]}
									alt={`${listing.title} preview`}
									className="rounded-md object-cover w-full h-full"
								/>
							</AspectRatio>
						</div>
						<div>
							<CardTitle className="text-lg truncate">
								{listing.title}
							</CardTitle>
						</div>
						<div className="max-w-xs">
							<p className="text-sm text-secondary-foreground/60 truncate">
								{listing.description}
							</p>
						</div>
					</div>
					<div className="text-right text-lg text-primary font-semibold">
						${listing.price.toFixed(2)}
					</div>
				</div>
			</Card>

			<ListingPopup
				listing={listing}
				showModal={showModal}
				setShowModal={setShowModal}
				isFavorited={isFavorited}
				handleFavoritedToggle={handleFavoritedToggle}
				handleMessageSeller={() => {}}
				handleAddToCart={handleAddToCart}
			/>
		</>
	);
};

export default ListingPreview;
