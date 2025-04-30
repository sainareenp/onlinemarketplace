// "use client"; // ✅ Required for useState, useEffect, and useRouter

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { AspectRatio } from "../ui/aspect-ratio";
// import { Listing } from "@/lib/listingFunctions"; // Adjust the import path as needed
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselPrevious,
// 	CarouselNext,
// } from "../ui/carousel";
// import { updateFavorited, updateCart } from "@/lib/listingFunctions";

// import { getOrCreateConversation } from "@/lib/conversationFunctions";
// import ListingPopup from "./listingPopup";

// const ListingCard: React.FC<{
// 	listing: Listing;
// 	userId: string;
// 	favorited: boolean;
// }> = ({ listing, userId, favorited }) => {
// 	const router = useRouter();
// 	const [showModal, setShowModal] = useState(false);
// 	const [isFavorited, setIsFavorited] = useState(favorited);

// 	// Sync isFavorited with the favorited prop
// 	useEffect(() => {
// 		setIsFavorited(favorited);
// 	}, [favorited]);

// 	if (!userId) return null;

// 	const handleFavoritedToggle = () => {
// 		setIsFavorited((prev) => !prev);
// 		updateFavorited(listing.id, userId);
// 	};

// 	const handleAddToCart = () => {
// 		updateCart(listing.id, userId);
// 	};

// 	const handleMessageSeller = async () => {
// 		const conversationId = await getOrCreateConversation(
// 			userId,
// 			listing.userId,
// 			listing.id
// 		);
// 		router.push(`/chat?conversationId=${conversationId}`);
// 	};

// 	return (
// 		<>
// 			<Card
// 				className="w-full cursor-pointer"
// 				onClick={() => setShowModal(true)}
// 			>
// 				<div className="flex flex-col">
// 					<div className="px-9">
// 						<Carousel className="w-full max-w-md mx-auto">
// 							<CarouselContent>
// 								{listing.photos.map((photo, index) => (
// 									<CarouselItem key={index}>
// 										<div className="p-1">
// 											<Card>
// 												<CardContent className="flex aspect-auto items-center justify-center">
// 													<AspectRatio ratio={4 / 4}>
// 														<img
// 															src={photo}
// 															alt={`${
// 																listing.title
// 															} photo ${
// 																index + 1
// 															}`}
// 															className="rounded-md object-cover w-full h-full"
// 														/>
// 													</AspectRatio>
// 												</CardContent>
// 											</Card>
// 										</div>
// 									</CarouselItem>
// 								))}
// 							</CarouselContent>
// 							{listing.photos.length > 1 && (
// 								<>
// 									<CarouselPrevious />
// 									<CarouselNext />
// 								</>
// 							)}
// 						</Carousel>
// 					</div>
// 					<div className="p-4">
// 						<CardHeader>
// 							<CardTitle className="text-lg">
// 								{listing.title}
// 							</CardTitle>
// 							<p className="text-sm text-muted-foreground">
// 								{listing.description.slice(0, 40)}
// 								{listing.description.length > 40 && "..."}
// 							</p>
// 						</CardHeader>
// 						<CardContent>
// 							<p className="font-medium text-primary mb-4">
// 								Price: ${listing.price}
// 							</p>
// 							{listing.city && listing.state && (
// 								<p className="font-medium text-primary mb-4">
// 									Location: {listing.city}, {listing.state}
// 								</p>
// 							)}
// 						</CardContent>
// 					</div>
// 				</div>
// 			</Card>

// 			{/* Modal for extended info */}
// 			<ListingPopup
// 				listing={listing}
// 				showModal={showModal}
// 				setShowModal={setShowModal}
// 				isFavorited={isFavorited}
// 				handleFavoritedToggle={handleFavoritedToggle}
// 				handleMessageSeller={handleMessageSeller}
// 				handleAddToCart={handleAddToCart}
// 			/>
// 		</>
// 	);
// };

// export default ListingCard;
// "use client"; // ✅ Required for useState, useEffect, and useRouter

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { AspectRatio } from "../ui/aspect-ratio";
// import { Listing } from "@/lib/listingFunctions";
// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselPrevious,
// 	CarouselNext,
// } from "../ui/carousel";
// import { updateFavorited, updateCart } from "@/lib/listingFunctions";
// import { getOrCreateConversation } from "@/lib/conversationFunctions";
// import ListingPopup from "./listingPopup";

// const ListingCard: React.FC<{
// 	listing: Listing;
// 	userId: string;
// 	favorited: boolean;
// 	onRemoveFromCart?: () => void; // ✅ Optional prop
// }> = ({ listing, userId, favorited, onRemoveFromCart }) => {
// 	const router = useRouter();
// 	const [showModal, setShowModal] = useState(false);
// 	const [isFavorited, setIsFavorited] = useState(favorited);

// 	useEffect(() => {
// 		setIsFavorited(favorited);
// 	}, [favorited]);

// 	if (!userId) return null;

// 	const handleFavoritedToggle = () => {
// 		setIsFavorited((prev) => !prev);
// 		updateFavorited(listing.id, userId);
// 	};

// 	const handleAddToCart = () => {
// 		updateCart(listing.id, userId);
// 	};

// 	const handleMessageSeller = async () => {
// 		const conversationId = await getOrCreateConversation(
// 			userId,
// 			listing.userId,
// 			listing.id
// 		);
// 		router.push(`/chat?conversationId=${conversationId}`);
// 	};

// 	return (
// 		<>
// 			<Card
// 				className="w-full cursor-pointer"
// 				onClick={() => setShowModal(true)}
// 			>
// 				<div className="flex flex-col">
// 					<div className="px-9">
// 						<Carousel className="w-full max-w-md mx-auto">
// 							<CarouselContent>
// 								{listing.photos.map((photo, index) => (
// 									<CarouselItem key={index}>
// 										<div className="p-1">
// 											<Card>
// 												<CardContent className="flex aspect-auto items-center justify-center">
// 													<AspectRatio ratio={4 / 4}>
// 														<img
// 															src={photo}
// 															alt={`${listing.title} photo ${index + 1}`}
// 															className="rounded-md object-cover w-full h-full"
// 														/>
// 													</AspectRatio>
// 												</CardContent>
// 											</Card>
// 										</div>
// 									</CarouselItem>
// 								))}
// 							</CarouselContent>
// 							{listing.photos.length > 1 && (
// 								<>
// 									<CarouselPrevious />
// 									<CarouselNext />
// 								</>
// 							)}
// 						</Carousel>
// 					</div>

// 					<div className="p-4">
// 						<CardHeader>
// 							<CardTitle className="text-lg">{listing.title}</CardTitle>
// 							<p className="text-sm text-muted-foreground">
// 								{listing.description.slice(0, 40)}
// 								{listing.description.length > 40 && "..."}
// 							</p>
// 						</CardHeader>

// 						<CardContent>
// 							<p className="font-medium text-primary mb-4">
// 								Price: ${listing.price}
// 							</p>
// 							{listing.city && listing.state && (
// 								<p className="font-medium text-primary mb-4">
// 									Location: {listing.city}, {listing.state}
// 								</p>
// 							)}

// 							{onRemoveFromCart && (
								
								
// 								<button
// 									onClick={(e) => {
// 										e.stopPropagation(); // prevent opening modal
// 										onRemoveFromCart();
// 									}}
// 									className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
// 								>
// 									Remove from Cart
// 								</button>
// 							)}
// 						</CardContent>
// 					</div>
// 				</div>
// 			</Card>

// 			<ListingPopup
// 				listing={listing}
// 				showModal={showModal}
// 				setShowModal={setShowModal}
// 				isFavorited={isFavorited}
// 				handleFavoritedToggle={handleFavoritedToggle}
// 				handleMessageSeller={handleMessageSeller}
// 				handleAddToCart={handleAddToCart}
// 			/>
// 		</>
// 	);
// };

// export default ListingCard;
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Listing } from "@/lib/listingFunctions";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../ui/carousel";
import { updateFavorited, updateCart } from "@/lib/listingFunctions";
import { getOrCreateConversation } from "@/lib/conversationFunctions";
import ListingPopup from "./listingPopup";

const ListingCard: React.FC<{
	listing: Listing;
	userId: string;
	favorited: boolean;
	onRemoveFromCart?: () => void;
}> = ({ listing, userId, favorited, onRemoveFromCart }) => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [isFavorited, setIsFavorited] = useState(favorited);

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

	const handleMessageSeller = async () => {
		const conversationId = await getOrCreateConversation(
			userId,
			listing.userId,
			listing.id
		);
		router.push(`/chat?conversationId=${conversationId}`);
	};

	return (
		<>
			<Card className="w-full cursor-pointer" onClick={() => setShowModal(true)}>
				<div className="flex flex-col">
					<div className="px-9">
						<Carousel className="w-full max-w-md mx-auto">
							<CarouselContent>
								{listing.photos.map((photo, index) => (
									<CarouselItem key={index}>
										<div className="p-1">
											<Card>
												<CardContent className="flex aspect-auto items-center justify-center">
													<AspectRatio ratio={4 / 4}>
														<img
															src={photo}
															alt={`${listing.title} photo ${index + 1}`}
															className="rounded-md object-cover w-full h-full"
														/>
													</AspectRatio>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							{listing.photos.length > 1 && (
								<>
									<CarouselPrevious />
									<CarouselNext />
								</>
							)}
						</Carousel>
					</div>

					<div className="p-4">
						<CardHeader>
							<CardTitle className="text-lg">{listing.title}</CardTitle>
							<p className="text-sm text-muted-foreground">
								{listing.description.slice(0, 40)}
								{listing.description.length > 40 && "..."}
							</p>
						</CardHeader>

						<CardContent>
							<p className="font-medium text-primary mb-4">
								Price: ${listing.price}
							</p>
							{listing.city && listing.state && (
								<p className="font-medium text-primary mb-4">
									Location: {listing.city}, {listing.state}
								</p>
							)}

							{/* ✅ Remove from Cart button if prop exists */}
							{onRemoveFromCart && (
								<>
									{(() => {
										console.log("✅ Showing Remove button for:", listing.title);
										return null;
									})()}
									<button
										onClick={(e) => {
											e.stopPropagation();
											onRemoveFromCart();
										}}
										className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
									>
										Remove from Cart
									</button>
								</>
							)}
						</CardContent>
					</div>
				</div>
			</Card>

			<ListingPopup
				listing={listing}
				showModal={showModal}
				setShowModal={setShowModal}
				isFavorited={isFavorited}
				handleFavoritedToggle={handleFavoritedToggle}
				handleMessageSeller={handleMessageSeller}
				handleAddToCart={handleAddToCart}
			/>
		</>
	);
};

export default ListingCard;
