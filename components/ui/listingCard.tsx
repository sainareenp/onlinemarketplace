import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { AspectRatio } from "./aspect-ratio";
import { Listing } from "@/lib/listingFunctions"; // Adjust the import path as needed
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "./carousel";

const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
	return (
		<Card>
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/2 p-4">
					<CardHeader>
						<CardTitle className="text-lg">{listing.name}</CardTitle>
						<p className="text-sm text-muted-foreground">
							{listing.description}
						</p>
					</CardHeader>
					<CardContent>
						<p className="font-medium text-primary mb-4">
							Price: ${listing.price}
						</p>
					</CardContent>
				</div>
				<div className="md:w-1/2 p-4">
					<Carousel className="w-full max-w-xs mx-auto">
						<CarouselContent>
							{listing.photos.map((photo, index) => (
								<CarouselItem key={index}>
									<div className="p-1">
										<Card>
											<CardContent className="flex aspect-auto items-center justify-center p-2">
												<AspectRatio
													ratio={4 / 3}
													key={index}
												>
													<img
														src={photo}
														alt={`${
															listing.name
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
						<><CarouselPrevious /><CarouselNext /></>)}
					</Carousel>
				</div>
			</div>
		</Card>
	);
};

export default ListingCard;
