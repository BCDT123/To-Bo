import { auth, provider } from "@/firebaseConfig";
import { handleError } from "@/lib/errorHandler";

import {
  signInWithPopup,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";

/**
 * Logs in the user using Google popup authentication.
 *
 * @returns The authenticated Firebase user object if successful, otherwise undefined.
 */
export const loginWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    handleError(
      "Error logging signInWithPopup",
      error,
      "Could not log in signInWithPopup."
    );
  }
};

/**
 * Logs out the current authenticated user.
 *
 * @returns void. Prints a message to the console if successful.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Session closed");
  } catch (error) {
    handleError("Error closing session:", error, "Could not close session.");
  }
};

/**
 * Signs in a user with email and password.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The authenticated Firebase user object if successful, otherwise undefined.
 */
export const signInWithEmail = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const signInResult = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return signInResult.user;
  } catch (signInErr: any) {
    handleError(
      "Incorrect password or user does not exist:",
      signInErr,
      "Incorrect password or user does not exist."
    );
  }
};

/**
 * Creates a new user with email and password.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The newly created Firebase user object if successful, otherwise undefined.
 */
export const newUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (err: any) {
    handleError("Error creating user with email:", err, err.message);
  }
};
