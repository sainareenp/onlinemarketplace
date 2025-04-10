import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { AspectRatio } from "./aspect-ratio";
import { Listing } from "@/lib/listingFunctions"; // Adjust the import path as needed
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path as needed
import Modal from "@/components/ui/modal"; // Ensure you have a Modal component or create one
import { StarIcon, StarFilledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./carousel";
import { updateFavorited } from "@/lib/listingFunctions";

const ListingCard: React.FC<{
	listing: Listing;
	userId: string;
	favorited: boolean;
}> = ({ listing, userId, favorited }) => {
	const [showModal, setShowModal] = useState(false);
	const [isFavorited, setIsFavorited] = useState(favorited);

	// Sync isFavorited with the favorited prop
	useEffect(() => {
		setIsFavorited(favorited);
	}, [favorited]);

	if (!userId) return null; // Ensure user is logged in

	const handleFavoritedToggle = () => {
		setIsFavorited((prev) => !prev);
		updateFavorited(listing.id, userId);
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
													<AspectRatio
														ratio={4 / 4}
														key={index}
													>
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
													<AspectRatio
														ratio={4 / 4}
														key={index}
													>
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
							className=""
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
						<Button
							className=""
							onClick={() => alert("Purchase initiated!")}
						>
							Buy Now
						</Button>
						<Button
							className=""
							variant={"secondary"}
							onClick={() => alert("Messaging seller!")}
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
