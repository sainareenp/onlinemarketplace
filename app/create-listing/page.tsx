"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhotoPreviews from "@/components/ui/photoPreviews";
import { uploadUserPhoto } from "@/lib/uploadPhoto";
import { useAuth } from "@/context/AuthContext"; // Adjust the path as needed
import { db } from "@/firebaseConfig"; // Adjust the path as needed
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

const CreateListingPage = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		photos: [] as File[],
	});

	const router = useRouter();

	const { user } = useAuth();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const imageFiles = Array.from(e.target.files).filter((file) =>
				file.type.startsWith("image/")
			);
			setFormData((prev) => ({
				...prev,
				photos: [...prev.photos, ...imageFiles].slice(0, 5),
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) {
			alert("Please log in to create a listing.");
			return;
		}
		const listingId = v4();

		const createListing = async () => {
			const listingRef = doc(
				db,
				"listings",
				"users",
				user.uid,
				listingId
			);
			await setDoc(listingRef, {
				title: formData.title,
				description: formData.description,
				price: parseFloat(formData.price),
				userId: user.uid,
				createdAt: new Date(),
			});
			await setDoc(doc(db, "users", user.uid, "listings", listingId), {
				listingId: listingId,
			});
		};

		const uploadPhotos = async () => {
			const uploadedUrls = await Promise.all(
				formData.photos.map(async (photo, index) => {
					const url = await uploadUserPhoto(
						photo,
						user.uid,
						`users/${user.uid}/${listingId}/${index}.jpg`
					);
					return url;
				})
			);
			return uploadedUrls;
		};

		createListing()
			.then(() => {
				uploadPhotos()
					.then(async (urls) => {
						await updateDoc(
							doc(db, "listings", "users", user.uid, listingId),
							{
								photos: urls,
							}
						);
						console.log("Listing updated with photo URLs:", urls);
					})
					.then(() => {
						alert("Listing created successfully!");
						router.push("/dashboard"); // Redirect to dashboard after successful listing creation
					})
					.catch((error) => {
						console.error("Error uploading photos:", error);
					});
			})
			.catch((error) => {
				console.error("Error creating listing:", error);
			});
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-background">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle className="text-lg font-semibold">
						Create a New Listing
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label
								htmlFor="title"
								className="text-sm font-medium"
							>
								Title
							</Label>
							<Input
								id="title"
								name="title"
								placeholder="Enter item title"
								value={formData.title}
								onChange={handleChange}
								className="mt-1"
							/>
						</div>
						<div>
							<Label
								htmlFor="description"
								className="text-sm font-medium"
							>
								Description
							</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Enter item description"
								value={formData.description}
								onChange={handleChange}
								className="mt-1"
							/>
						</div>
						<div>
							<Label
								htmlFor="price"
								className="text-sm font-medium"
							>
								Price
							</Label>
							<Input
								id="price"
								name="price"
								type="number"
								placeholder="Enter item price"
								value={formData.price}
								onChange={handleChange}
								className="mt-1"
							/>
						</div>
						<div>
							<Label
								htmlFor="photos"
								className="text-sm font-medium"
							>
								Upload Photos
							</Label>
							<div
								onDrop={(e) => {
									e.preventDefault();
									if (e.dataTransfer.files) {
										const imageFiles = Array.from(
											e.dataTransfer.files
										).filter((file) =>
											file.type.startsWith("image/")
										);
										setFormData((prev) => ({
											...prev,
											photos: [
												...prev.photos,
												...imageFiles,
											].slice(0, 5),
										}));
									}
								}}
								onDragOver={(e) => e.preventDefault()}
								className="border-2 border-dashed border-muted p-4 rounded-md text-center"
							>
								<p className="text-sm text-muted-foreground">
									Drag and drop photos here<br></br>or
								</p>
								<Button
									type="button"
									onClick={() =>
										document
											.getElementById("photos")
											?.click()
									}
									className="mt-2"
								>
									Click to Upload
								</Button>
								<Input
									id="photos"
									name="photos"
									type="file"
									accept="image/*"
									multiple
									onChange={handlePhotoChange}
									className="hidden"
								/>
							</div>
						</div>
						<div className="flex space-x-2 mt-4">
							{formData.photos.length > 0 && (
								<PhotoPreviews
									photos={formData.photos}
									onRemove={(index) =>
										setFormData((prev) => ({
											...prev,
											photos: prev.photos.filter(
												(_, i) => i !== index
											),
										}))
									}
								/>
							)}
						</div>
						<Button type="submit" className="w-full">
							Submit Listing
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default CreateListingPage;
