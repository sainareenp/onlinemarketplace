"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path as needed
import DisplayListings from "./displayListings";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function Dashboard() {
	const { user, logout, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				router.push("/auth");
			} else if (!user.isProfileComplete) {
				router.push("/complete-profile"); // ✅ Redirect if profile is incomplete
			}
		}
	}, [user, loading, router]);

	if (loading) return <p>Loading...</p>;
	if (!user) return null;

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="container mx-auto">
				<div className="bg-card shadow-lg rounded-lg p-8 w-[60%] mx-auto">
					<h2 className="text-3xl font-bold text-card-foreground mb-6 text-center">
						Welcome to Your Dashboard
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<p className="text-muted-foreground">
								<strong>Name:</strong>{" "}
								<span className="font-medium text-card-foreground">
									{user.name}
								</span>
							</p>
							<p className="text-muted-foreground">
								<strong>Email:</strong> {user.email}
							</p>
							<p className="text-muted-foreground">
								<strong>Birthday:</strong> {user.birthday}
							</p>
							<p className="text-muted-foreground">
								<strong>Address:</strong> {user.address}
							</p>
							<p className="text-muted-foreground">
								<strong>Profile Complete:</strong>{" "}
								{user.isProfileComplete ? "Yes" : "No"}
							</p>
						</div>
						<div className="flex flex-col space-y-4">
							<Button
								onClick={() => router.push("/create-listing")}
								className="w-full"
								variant="outline"
								size="lg"
							>
								<PlusCircledIcon className="mr-2" />
								Create Listing
							</Button>
							<Button
								onClick={logout}
								variant="destructive"
								className="w-full"
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
				<section className="mt-12">
					<div className="text-center mb-8">
						<h1 className="text-4xl font-bold text-primary">
							My Listings
						</h1>
						<p className="text-muted-foreground mt-2">
							Manage and view your active listings here.
						</p>
					</div>
					<div className="bg-card shadow-md rounded-lg p-6">
						<DisplayListings />
					</div>
				</section>
			</div>
		</div>
	);
}
