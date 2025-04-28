
"use client";
import React from "react";
import CartDisplayListings from "./displayListings";
import { MainSidebar } from "@/components/navigation/MainSidebar";

const CartPage = () => {
	return (
		<>
			<MainSidebar />
			<section className="container mx-auto p-6">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-primary">
						Your Cart
					</h1>
					<p className="text-muted-foreground mt-2">
						Review the items you&apos;ve added to your cart before checkout.
					</p>
				</div>
				<div className="bg-card shadow-sm rounded-lg p-4">
					<CartDisplayListings />
				</div>
			</section>
		</>
	);
};

export default CartPage;
