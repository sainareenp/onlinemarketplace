import { MainSidebar } from "@/components/navigation/MainSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomeImages from "@/components/ui/Homepage";

export default function Home() {
	return (
		<>
			<MainSidebar />
			<div className="min-h-screen bg-background text-foreground">
				<header className="bg py-4">
					<div className="container mx-auto text-center">
						<h1 className="text-4xl">Welcome to SecureMarket</h1>
						<p className="text-lg mt-2">
							Your trusted platform for secure and reliable buying
							and selling
						</p>
					</div>
				</header>
				<main className="container mx-auto py-8 px-4">
        			<HomeImages />
					</main>
				<main className="container mx-auto py-8 px-4">
					<section className="mb-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl font-semibold">
									Why Choose SecureMarket?
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>
									SecureMarket ensures a safe and seamless
									experience for all your buying and selling
									needs. With advanced security measures and a
									user-friendly interface, we prioritize your
									trust and convenience.
								</p>
							</CardContent>
						</Card>
					</section>

					<section className="mb-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl font-semibold">
									Our Commitment to Security
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>
									We use state-of-the-art encryption and fraud
									detection systems to protect your
									transactions and personal information. Your
									safety is our top priority.
								</p>
							</CardContent>
						</Card>
					</section>

					<section className="mb-8">
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl font-semibold">
									Buy and Sell with Confidence
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>
									Whether you&apos;re a buyer or a seller,
									SecureMarket provides the tools and support
									you need to succeed. Join our community and
									experience the difference.
								</p>
							</CardContent>
						</Card>
					</section>

					<div className="text-center mt-8">
						<Button asChild variant={"outline"}>
							<a href="/auth">Get Started</a>
						</Button>
					</div>
				</main>

				<footer className="bg-muted py-4 mt-8">
					<div className="container mx-auto text-center">
						<p>&copy; 2023 SecureMarket. All rights reserved.</p>
					</div>
				</footer>
			</div>
		</>
	);
}
