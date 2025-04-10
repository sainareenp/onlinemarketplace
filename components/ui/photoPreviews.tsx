import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Cross2Icon } from "@radix-ui/react-icons"; // Adjust the import path as needed
import Image from "next/image"; // Import the Next.js Image component

interface PhotoPreviewsProps {
	photos: File[];
	onRemove: (index: number) => void;
}

const PhotoPreviews: React.FC<PhotoPreviewsProps> = ({ photos, onRemove }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{photos.map((photo, index) => (
				<div key={index} className="relative w-24 h-24">
					<Image
						src={URL.createObjectURL(photo)}
						alt={`Preview ${index + 1}`}
						fill
						className="object-cover rounded-md"
					/>
					<Button
						type="button"
						variant={"destructive"}
						size="icon"
						onClick={() => onRemove(index)}
						className="absolute top-1 right-1 w-4 h-4 p-0 rounded-full"
					>
						<Cross2Icon className="w-1 h-1" />
					</Button>
				</div>
			))}
		</div>
	);
};

export default PhotoPreviews;
