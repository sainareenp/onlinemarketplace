import React from "react";
import Modal from "@/components/ui/modal";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { StarFilledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../ui/carousel";

interface ListingPopupProps {
	showModal: boolean;
	setShowModal: (value: boolean) => void;
	listing: {
		title: string;
		description: string;
		price: number;
		city?: string;
		state?: string;
		photos: string[];
	};
	isFavorited: boolean;
	handleFavoritedToggle: () => void;
	handleMessageSeller: () => void;
}

const ListingPopup: React.FC<ListingPopupProps> = ({
	showModal,
	setShowModal,
	listing,
	isFavorited,
	handleFavoritedToggle,
	handleMessageSeller,
}) => {
	return (
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
														} photo ${index + 1}`}
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
					<Button variant={"secondary"} onClick={handleMessageSeller}>
						<Pencil2Icon className="h-4 w-4" />
						Message Seller
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ListingPopup;
