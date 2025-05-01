import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
    console.log("✅ Stripe checkout API hit");
	const { cartItems } = await req.json();

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: cartItems.map((item: any) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.title,
						description: item.description,
					},
					unit_amount: Math.round(item.price * 100), // cents
				},
				quantity: 1,
			})),
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
		});

		return NextResponse.json({ id: session.id });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
