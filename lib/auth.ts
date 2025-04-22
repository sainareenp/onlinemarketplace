// lib/auth.ts
import { auth } from "../firebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	User,
	MultiFactorError,
	MultiFactorResolver,
	PhoneMultiFactorGenerator,
	TotpMultiFactorGenerator,
	multiFactor,
	TotpSecret,
} from "firebase/auth";
import { saveUserToFirestore } from "./firestore";
import QRCode from "qrcode";

// Type definition for User object
export interface AuthUser {
	uid: string;
	email: string | null;
}

export const signUp = async (
	email: string,
	password: string,
	name: string,
	address: string,
	birthday: string
): Promise<AuthUser> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		const userData: AuthUser = { uid: user.uid, email: user.email };

		await updateProfile(user, { displayName: email });
		await saveUserToFirestore(userData, name, address, birthday); // Save user to Firestore
		return userData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred during sign-up.");
		}
	}
};

export const logout = async (): Promise<void> => {
	await signOut(auth);
};

export const signInWithProvider = async (
	providerType: string
): Promise<User> => {
	let provider;
	switch (providerType) {
		case "Google":
			provider = new GoogleAuthProvider();
			break;
		case "GitHub":
			provider = new GithubAuthProvider();
			break;
		default:
			throw new Error("Unsupported provider");
	}
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		return user;
	} catch (error) {
		if (
			(error as MultiFactorError).code ===
			"auth/multi-factor-auth-required"
		) {
			throw error;
		}
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			console.error("An unknown error occurred:", error);
			throw new Error("An unknown error occurred.");
		}
	}
};

export const signInWithTOTP = async (
	mfaResolver: MultiFactorResolver,
	selectedIndex: number,
	otpFromAuthenticator: string
) => {
	switch (mfaResolver.hints[selectedIndex].factorId) {
		case TotpMultiFactorGenerator.FACTOR_ID:
			const multiFactorAssertion =
				TotpMultiFactorGenerator.assertionForSignIn(
					mfaResolver.hints[selectedIndex].uid,
					otpFromAuthenticator
				);
			try {
				const userCredential = await mfaResolver.resolveSignIn(
					multiFactorAssertion
				);
				return userCredential.user;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(error.message);
				} else {
					console.error("An unknown error occurred:", error);
					throw new Error("An unknown error occurred.");
				}
			}
			break;
		case PhoneMultiFactorGenerator.FACTOR_ID:
			// Handle SMS second factor.
			throw new Error(
				"Phone multi-factor authentication is not implemented."
			);
			break;
		default:
			// Unsupported second factor?
			throw new Error("Unsupported second factor.");
			break;
	}
};

export const setUpTOTP = async (user: User) => {
	if (!user) {
		throw new Error("User is not authenticated");
	}
	if (!user.email) {
		throw new Error("User email is not available");
	}
	const multiFactorSession = await multiFactor(user).getSession();
	const totpSecret = await TotpMultiFactorGenerator.generateSecret(
		multiFactorSession
	);
	const totpUri = totpSecret.generateQrCodeUrl(user.email, "Your App's Name");

	const qrCanvas = document.getElementById(
		"qr-code-canvas"
	) as HTMLCanvasElement;

	if (qrCanvas) {
		await QRCode.toCanvas(qrCanvas, totpUri);
	} else {
		throw new Error("QR code canvas element not found");
	}
	return totpSecret;
};

export const verifyTOTPCode = async (
	user: User,
	totpSecret: TotpSecret,
	totpCode: string,
	displayName: string
) => {
	const multiFactorAssertion =
		TotpMultiFactorGenerator.assertionForEnrollment(totpSecret, totpCode);
	return multiFactor(user).enroll(multiFactorAssertion, displayName);
};

export const signIn = async (
	email: string,
	password: string
): Promise<AuthUser> => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return { uid: user.uid, email: user.email };
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred during sign-in.");
		}
	}
};
