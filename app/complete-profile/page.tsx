"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TOTPInput from "@/components/auth/totp";
import { TotpSecret } from "firebase/auth";
import { verifyTOTPCode, setUpTOTP } from "@/lib/auth";

export default function CompleteProfile() {
	const { user, refreshUser, fireBaseUser } = useAuth();
	const router = useRouter();
	const [name, setName] = useState(user?.name || "");
	const [age, setAge] = useState<number>(0);
	const [address, setAddress] = useState("");
	const [TOTP, setTOTP] = useState<string>("");
	const [totpSecret, setTopSecret] = useState<TotpSecret | null>(null);
	const [totpError, setTotpError] = useState<string | null>(null);
	const [totpSecretError, setTotpSecretError] = useState<string | null>(null);

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

	const handleTOTPSubmit = async () => {
		try {
			if (totpSecret && TOTP) {
				await verifyTOTPCode(
					fireBaseUser!,
					totpSecret,
					TOTP,
					"WristKey"
				);
				alert("TOTP code verified successfully!");
			} else {
				alert("Please set up TOTP first.");
			}
		} catch (error) {
			if (error instanceof Error) {
				setTotpError(error.message);
			} else {
				setTotpError("An unexpected error occurred.");
			}
		}
	};

	const handleTOTPSetup = async () => {
		if (!fireBaseUser) return;
		try {
			setTopSecret(await setUpTOTP(fireBaseUser!));
		} catch (error) {
			if (error instanceof Error) {
				setTotpSecretError(error.message);
			} else {
				setTotpSecretError("An unexpected error occurred.");
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<h2 className="text-2xl font-bold mb-6 text-primary">
				Complete Your Profile
			</h2>
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
						onChange={(e) =>
							setAge(e.target.value as unknown as number)
						}
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
				<div className="mb-4">
					<button
						type="button"
						onClick={handleTOTPSetup}
						className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
					>
						Initiate 2FA Setup
					</button>
					{totpSecretError && (
						<p className="text-sm text-red-500">
							{totpSecretError}
						</p>
					)}
				</div>

				<div className={`mb-4 ${!totpSecret ? "hidden" : ""}`}>
					<label className="block text-gray-700 font-medium mb-2">
						Setup TOTP 2FA:
					</label>
					<canvas
						id="qr-code-canvas"
						className="w-full h-48 border border-gray-300 rounded-md mb-2"
					></canvas>
					<div className="flex items-center justify-center mb-2">
						<TOTPInput
							value={TOTP}
							onSubmit={handleTOTPSubmit}
							onChange={setTOTP}
							error={totpError}
						/>
					</div>
					<button
						type="button"
						onClick={handleTOTPSubmit}
						className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200"
					>
						Confirm 2FA Code
					</button>
				</div>
				<Button type="submit" className="w-full mt-4">
					Save Profile
				</Button>
			</form>
		</div>
	);
}
