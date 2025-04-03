"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function Register() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	// const [age, setAge] = useState<number>(0);
	const router = useRouter();
	const { refreshUser, loginWithProvider } = useAuth();
	const [birthday, setBirthday] = useState("");


	const handleRegister = async () => {
		setError(null);
		if (email.length < 5 || password.length < 6) {
			setError("Email must be valid & password at least 6 characters.");
			return;
		}

		try {
			await signUp(email, password, name, address, birthday);
			router.replace("/dashboard"); // Redirect after registration
			alert("Registration successful! You can now log in.");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	const handleProviderSignIn = async (Provider: string) => {
		setError(null);
		try {
			await loginWithProvider(Provider);
			await refreshUser;
			router.replace("/dashboard"); // Redirect after Google sign-in
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	const [activeTab, setActiveTab] = useState<"register" | "login">(
		"register"
	);

	const handleLogin = async () => {
		setError(null);
		if (email.length < 5 || password.length < 6) {
			setError("Email must be valid & password at least 6 characters.");
			return;
		}

		try {
			await signIn(email, password);
			router.replace("/dashboard"); // Redirect after login
			alert("Login successful!");
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
				<div className="flex justify-center mb-6">
					<Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "register" | "login")}>
						<TabsList className="bg-muted text-muted-foreground">
							<TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
								Register
							</TabsTrigger>
							<TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
								Login
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				{error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
				{activeTab === "register" ? (
					<div className="space-y-4">
						<Input
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Input
							type="text"
							placeholder="Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Label htmlFor="age" className="text-primary">
							Birthday:
						</Label>
						<Input
							type="date"
							placeholder="Birthday"
							onChange={(e) => setBirthday(e.target.value)}
							className="bg-input text-input-foreground"
						/>

						<Button onClick={handleRegister} className="w-full bg-primary text-primary-foreground">
							Sign Up
						</Button>
						<Button variant="secondary" onClick={() => handleProviderSignIn("Google")} className="w-full">
							Sign Up with Google
						</Button>
						<Button variant="secondary" onClick={() => handleProviderSignIn("GitHub")} className="w-full">
							Sign Up with GitHub
						</Button>
					</div>
				) : (
					<div className="space-y-4">
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="bg-input text-input-foreground"
						/>
						<Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground">
							Log In
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
