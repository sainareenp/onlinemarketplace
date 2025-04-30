// "use client";
// import React from "react";
// import { useAuth } from "@/context/AuthContext";
// import { getUserCart } from "@/lib/listingFunctions";
// import { useEffect, useState } from "react";
// import { Listing } from "@/lib/listingFunctions";

// const CheckoutPage = () => {
// 	const { user } = useAuth();
// 	const [listings, setListings] = useState<Listing[]>([]);

// 	useEffect(() => {
// 		const fetchListings = async () => {
// 			if (!user) return;
// 			const cartItems = await getUserCart(user.uid);
// 			setListings(cartItems);
// 		};
// 		fetchListings();
// 	}, [user]);

// 	if (!user) return <p>Please log in to continue.</p>;

// 	return (
// 		<div className="container mx-auto p-6">
// 			<h1 className="text-3xl font-bold mb-6">Checkout</h1>
// 			{listings.map((listing) => (
// 				<div key={listing.id} className="mb-4 p-4 border rounded">
// 					<h2 className="text-xl font-semibold">{listing.title}</h2>
// 					<p>{listing.description}</p>
// 					<p className="text-primary font-bold">${listing.price.toFixed(2)}</p>
// 				</div>
// 			))}
// 			<div className="mt-6">
// 				<button className="bg-primary text-white px-4 py-2 rounded">
// 					Confirm Payment
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default CheckoutPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { getUserCart, Listing } from "@/lib/listingFunctions";
// import { useRouter } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";

// // Top of file
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);


// const CheckoutPage = () => {
// 	const { user } = useAuth();
// 	const [listings, setListings] = useState<Listing[]>([]);
// 	const [subtotal, setSubtotal] = useState(0);
// 	const [selectedPayment, setSelectedPayment] = useState("card");
// 	const router = useRouter();

// 	useEffect(() => {
// 		const fetchListings = async () => {
// 			if (!user) return;
// 			const cartItems = await getUserCart(user.uid);
// 			setListings(cartItems);
// 			const total = cartItems.reduce((sum, item) => sum + item.price, 0);
// 			setSubtotal(total);
// 		};
// 		fetchListings();
// 	}, [user]);

// 	if (!user) return <p className="text-center mt-10">Please log in to continue.</p>;

// 	return (
// 		<div className="container mx-auto p-6">
// 			<h1 className="text-4xl font-bold mb-8 text-primary">Checkout</h1>

// 			{/* Cart Items */}
// 			{listings.length > 0 ? (
// 				<div className="space-y-4">
// 					{listings.map((listing) => (
// 						<div key={listing.id} className="border p-4 rounded shadow-sm">
// 							<h2 className="text-xl font-semibold">{listing.title}</h2>
// 							<p className="text-muted-foreground">{listing.description}</p>
// 							<p className="text-primary font-bold mt-2">${listing.price.toFixed(2)}</p>
// 						</div>
// 					))}
// 				</div>
// 			) : (
// 				<p className="text-center text-muted-foreground">No items in your cart.</p>
// 			)}

// 			{/* Subtotal */}
// 			<div className="mt-8 text-lg font-semibold flex justify-between border-t pt-4">
// 				<span>Subtotal:</span>
// 				<span>${subtotal.toFixed(2)}</span>
// 			</div>

// 			{/* Payment Methods */}
// 			<div className="mt-8">
// 				<h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
// 				<div className="space-y-3">
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="card"
// 							checked={selectedPayment === "card"}
// 							onChange={() => setSelectedPayment("card")}
// 						/>
// 						<span>Credit/Debit Card</span>
// 					</label>
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="paypal"
// 							checked={selectedPayment === "paypal"}
// 							onChange={() => setSelectedPayment("paypal")}
// 						/>
// 						<span>PayPal</span>
// 					</label>
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="cod"
// 							checked={selectedPayment === "cod"}
// 							onChange={() => setSelectedPayment("cod")}
// 						/>
// 						<span>Cash on Delivery</span>
// 					</label>
// 				</div>
// 			</div>

// 			{/* Confirm Payment */}
// 			<div className="mt-10 flex justify-end">
// 				<button
// 					disabled={listings.length === 0}
// 					className={`px-6 py-3 font-bold text-white rounded ${
// 						listings.length === 0
// 							? "bg-gray-400 cursor-not-allowed"
// 							: "bg-green-600 hover:bg-green-700"
// 					}`}
// 					onClick={() => {
// 						// Just a fake confirmation for now
// 						alert(`Payment successful with ${selectedPayment.toUpperCase()}!`);
// 						router.push("/"); // Go back to home or success page
// 					}}
// 				>
// 					Confirm Payment
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default CheckoutPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { getUserCart, Listing } from "@/lib/listingFunctions";
// import { useRouter } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";

// // Stripe public key loader
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// const CheckoutPage = () => {
// 	const { user } = useAuth();
// 	const [listings, setListings] = useState<Listing[]>([]);
// 	const [subtotal, setSubtotal] = useState(0);
// 	const [selectedPayment, setSelectedPayment] = useState("card");
// 	const router = useRouter();
//     console.log("Stripe public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    

// 	useEffect(() => {
//         console.log("Stripe public key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
// 		const fetchListings = async () => {
// 			if (!user) return;
// 			const cartItems = await getUserCart(user.uid);
// 			setListings(cartItems);
// 			const total = cartItems.reduce((sum, item) => sum + item.price, 0);
// 			setSubtotal(total);
// 		};
// 		fetchListings();
// 	}, [user]);

// 	if (!user) return <p className="text-center mt-10">Please log in to continue.</p>;

// 	const handleStripeCheckout = async () => {
// 		const stripe = await stripePromise;
// 		if (!stripe) {
// 			alert("Stripe failed to load");
// 			return;
// 		}

// 		const response = await fetch("/api/create-checkout-session", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ cartItems: listings }),
// 		});

// 		const session = await response.json();

// 		if (session?.id) {
// 			await stripe.redirectToCheckout({ sessionId: session.id });
// 		} else {
// 			alert("Failed to start Stripe Checkout.");
// 		}
// 	};

// 	return (
// 		<div className="container mx-auto p-6">
// 			<h1 className="text-4xl font-bold mb-8 text-primary">Checkout</h1>

// 			{/* Cart Items */}
// 			{listings.length > 0 ? (
// 				<div className="space-y-4">
// 					{listings.map((listing) => (
// 						<div key={listing.id} className="border p-4 rounded shadow-sm">
// 							<h2 className="text-xl font-semibold">{listing.title}</h2>
// 							<p className="text-muted-foreground">{listing.description}</p>
// 							<p className="text-primary font-bold mt-2">${listing.price.toFixed(2)}</p>
// 						</div>
// 					))}
// 				</div>
// 			) : (
// 				<p className="text-center text-muted-foreground">No items in your cart.</p>
// 			)}

// 			{/* Subtotal */}
// 			<div className="mt-8 text-lg font-semibold flex justify-between border-t pt-4">
// 				<span>Subtotal:</span>
// 				<span>${subtotal.toFixed(2)}</span>
// 			</div>

// 			{/* Payment Methods */}
// 			<div className="mt-8">
// 				<h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
// 				<div className="space-y-3">
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="card"
// 							checked={selectedPayment === "card"}
// 							onChange={() => setSelectedPayment("card")}
// 						/>
// 						<span>Credit/Debit Card (via Stripe)</span>
// 					</label>
// 					{/* These are just visual for now — only Stripe card is wired */}
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="paypal"
// 							checked={selectedPayment === "paypal"}
// 							onChange={() => setSelectedPayment("paypal")}
// 							disabled
// 						/>
// 						<span className="text-muted-foreground">PayPal (Coming soon)</span>
// 					</label>
// 					<label className="flex items-center space-x-3">
// 						<input
// 							type="radio"
// 							name="payment"
// 							value="cod"
// 							checked={selectedPayment === "cod"}
// 							onChange={() => setSelectedPayment("cod")}
// 							disabled
// 						/>
// 						<span className="text-muted-foreground">Cash on Delivery (Coming soon)</span>
// 					</label>
// 				</div>
// 			</div>

// 			{/* Confirm Payment */}
// 			<div className="mt-10 flex justify-end">
// 				<button
// 					disabled={listings.length === 0 || selectedPayment !== "card"}
// 					className={`px-6 py-3 font-bold text-white rounded ${
// 						listings.length === 0 || selectedPayment !== "card"
// 							? "bg-gray-400 cursor-not-allowed"
// 							: "bg-green-600 hover:bg-green-700"
// 					}`}
// 					onClick={handleStripeCheckout}
// 				>
// 					Confirm & Pay with Stripe
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default CheckoutPage;

"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserCart, Listing } from "@/lib/listingFunctions";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
	const { user } = useAuth();
	const [listings, setListings] = useState<Listing[]>([]);
	const [subtotal, setSubtotal] = useState(0);
	const [selectedPayment, setSelectedPayment] = useState("card");
	const router = useRouter();
	console.log("Loaded Stripe key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

	useEffect(() => {
		console.log("Loaded Stripe key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


		const fetchListings = async () => {
			if (!user) return;
			const cartItems = await getUserCart(user.uid);
			setListings(cartItems);
			const total = cartItems.reduce((sum, item) => sum + item.price, 0);
			setSubtotal(total);
		};
		fetchListings();
	}, [user]);

	if (!user) return <p className="text-center mt-10">Please log in to continue.</p>;

	const handleStripeCheckout = async () => {
		const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

		if (!stripeKey) {
			alert("Stripe public key is missing.");
			return;
		}

		const stripe = await loadStripe(stripeKey);

		if (!stripe) {
			alert("Stripe failed to initialize.");
			return;
		}

		const response = await fetch("/api/create-checkout-session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cartItems: listings }),
		});

		const session = await response.json();

		if (session?.id) {
			await stripe.redirectToCheckout({ sessionId: session.id });
		} else {
			alert("Failed to start Stripe Checkout.");
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-4xl font-bold mb-8 text-primary">Checkout</h1>

			{/* Cart Items */}
			{listings.length > 0 ? (
				<div className="space-y-4">
					{listings.map((listing) => (
						<div key={listing.id} className="border p-4 rounded shadow-sm">
							<h2 className="text-xl font-semibold">{listing.title}</h2>
							<p className="text-muted-foreground">{listing.description}</p>
							<p className="text-primary font-bold mt-2">${listing.price.toFixed(2)}</p>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-muted-foreground">No items in your cart.</p>
			)}

			{/* Subtotal */}
			<div className="mt-8 text-lg font-semibold flex justify-between border-t pt-4">
				<span>Subtotal:</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>

			{/* Payment Methods */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
				<div className="space-y-3">
					<label className="flex items-center space-x-3">
						<input
							type="radio"
							name="payment"
							value="card"
							checked={selectedPayment === "card"}
							onChange={() => setSelectedPayment("card")}
						/>
						<span>Credit/Debit Card (via Stripe)</span>
					</label>
					<label className="flex items-center space-x-3">
						<input
							type="radio"
							name="payment"
							value="paypal"
							checked={selectedPayment === "paypal"}
							onChange={() => setSelectedPayment("paypal")}
							disabled
						/>
						<span className="text-muted-foreground">PayPal (Coming soon)</span>
					</label>
					<label className="flex items-center space-x-3">
						<input
							type="radio"
							name="payment"
							value="cod"
							checked={selectedPayment === "cod"}
							onChange={() => setSelectedPayment("cod")}
							disabled
						/>
						<span className="text-muted-foreground">Cash on Delivery (Coming soon)</span>
					</label>
				</div>
			</div>

			{/* Confirm Payment */}
			<div className="mt-10 flex justify-end">
				<button
					disabled={listings.length === 0 || selectedPayment !== "card"}
					className={`px-6 py-3 font-bold text-white rounded ${
						listings.length === 0 || selectedPayment !== "card"
							? "bg-gray-400 cursor-not-allowed"
							: "bg-green-600 hover:bg-green-700"
					}`}
					onClick={handleStripeCheckout}
				>
					Confirm & Pay with Stripe
				</button>
			</div>
		</div>
	);
};

export default CheckoutPage;
