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
						Your Favorite Listings
					</h1>
					<p className="text-muted-foreground mt-2">
						Keep track of your favorite items and never miss a deal!
					</p>
				</div>
				<div className="bg-card shadow-sm rounded-lg p-4">
					<DisplayListings />
				</div>
			</section>
		</>
	);
};

export default ExplorePage;
