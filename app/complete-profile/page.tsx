"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompleteProfile() {
	const { user, refreshUser } = useAuth();
	const router = useRouter();
	const [name, setName] = useState(user?.name || "");
	const [age, setAge] = useState<number>(0);
	const [address, setAddress] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		try {
			await updateDoc(doc(db, "users", user.uid), {
				name,
				age: Number(age),
				address,
				isProfileComplete: true, // ✅ Mark as complete
			});

			await refreshUser();

			router.push("/dashboard"); // ✅ Redirect to dashboard after completing profile
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<h2 className="text-2xl font-bold mb-6 text-primary">Complete Your Profile</h2>
			<form
				onSubmit={handleSubmit}
				className="bg-card p-6 rounded-lg shadow-md w-full max-w-md"
			>
				<div className="mb-4">
					<Label htmlFor="name" className="text-primary">
						Name:
					</Label>
					<Input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="mt-2"
					/>
				</div>
				<div className="mb-4">
					<Label htmlFor="age" className="text-primary">
						Age:
					</Label>
					<Input
						id="age"
						type="number"
						value={age}
						onChange={(e) => setAge(e.target.value as unknown as number)}
						required
						className="mt-2"
					/>
				</div>
				<div className="mb-4">
					<Label htmlFor="address" className="text-primary">
						Address:
					</Label>
					<Input
						id="address"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
						className="mt-2"
					/>
				</div>
				<Button type="submit" className="w-full mt-4">
					Save Profile
				</Button>
			</form>
		</div>
	);
}
