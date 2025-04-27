"use client"; // ✅ Required for useState, useEffect, and useRouter

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { AspectRatio } from "./aspect-ratio";
import { Listing } from "@/lib/listingFunctions"; // Adjust the import path as needed
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { StarIcon, StarFilledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./carousel";
import { updateFavorited } from "@/lib/listingFunctions";
import { getOrCreateConversation } from "@/lib/conversationFunctions";

const ListingCard: React.FC<{
	listing: Listing;
	userId: string;
	favorited: boolean;
}> = ({ listing, userId, favorited }) => {
	const router = useRouter();
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

	const handleMessageSeller = async () => {
		const conversationId = await getOrCreateConversation(
			userId,
			listing.userId,
			listing.id
		);
		router.push(`/chat/${conversationId}`);
	};

	return (
		<>
			<Card
				className="w-full cursor-pointer"
				onClick={() => setShowModal(true)}
			>
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
															alt={`${
																listing.title
															} photo ${
																index + 1
															}`}
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
							<CardTitle className="text-lg">
								{listing.title}
							</CardTitle>
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
						</CardContent>
					</div>
				</div>
			</Card>

			{/* Modal for extended info */}
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<div className="p-6">
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
															alt={`${
																listing.title
															} photo ${
																index + 1
															}`}
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
					<h2 className="text-xl font-bold mb-4">{listing.title}</h2>
					<p className="mb-4">{listing.description}</p>
					<p className="font-medium text-primary mb-4">
						Price: ${listing.price}
					</p>
					{listing.city && listing.state && (
						<p className="font-medium text-primary mb-4">
							Location: {listing.city}, {listing.state}
						</p>
					)}
					<div className="flex gap-4 mt-4">
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={handleFavoritedToggle}
						>
							{isFavorited ? (
								<StarFilledIcon className="h-4 w-4" />
							) : (
								<StarIcon className="h-4 w-4" />
							)}
						</Button>
						<Button onClick={() => alert("Purchase initiated!")}>
							Buy Now
						</Button>
						<Button
							variant={"secondary"}
							onClick={handleMessageSeller}
						>
							<Pencil2Icon className="h-4 w-4" />
							Message Seller
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ListingCard;
