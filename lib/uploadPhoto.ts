import { storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadUserPhoto = async (
	file: File,
	uid: string,
	fileRefPath: string
): Promise<string> => {
	try {
		const fileRef = ref(storage, fileRefPath);

		// Upload the file
		const snapshot = await uploadBytes(fileRef, file);

		// Get the download URL
		const downloadURL = await getDownloadURL(snapshot.ref);

		console.log("📸 Uploaded photo URL:", downloadURL);
		return downloadURL;
	} catch (error) {
		console.error("❌ Error uploading photo:", error);
		throw error;
	}
};
