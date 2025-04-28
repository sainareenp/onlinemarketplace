"use client";
import React from "react";
import DisplayListings from "./displayListings";
import { MainSidebar } from "@/components/navigation/MainSidebar";
const ExplorePage = () => {
	return (
		<>
			<MainSidebar />
			<section className="container mx-auto p-6">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-primary">
						Explore Listings
					</h1>
					<p className="text-muted-foreground mt-2">
						Discover the best items available in the marketplace
					</p>
				</div>
				<div className="bg-card shadow-sm rounded-lg p-4 mx-auto">
					<DisplayListings />
				</div>
			</section>
		</>
	);
};

export default ExplorePage;
