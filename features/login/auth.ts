import { handleError } from "@/shared/utilities/errorHandler";
import { getUserDefault } from "@/features/users/userProfile";
import { authService } from "./authService";

/**
 * Logs in the user using Google popup authentication.
 *
 * Purpose:
 * - Authenticates the user with Google using a popup.
 * - Ensures the user exists in Firestore (creates if not).
 *
 * @returns The Firestore user object if successful, otherwise undefined.
 */
export const loginWithPopup = async () => {
  try {
    const user = await authService.signInPopUp();
    if (!user) {
      throw new Error("No user returned from signInPopUp.");
    }
    const newUser = await getUserDefault(user);
    return newUser;
  } catch (error) {
    handleError(
      "Error logging in with Google:",
      error,
      "Could not log in with Google."
    );
  }
};

/**
 * Logs out the current authenticated user.
 *
 * Purpose:
 * - Signs out the user from Firebase Auth.
 *
 * @returns void. Prints a message to the console if successful.
 */
export const logout = async () => {
  try {
    await authService.signOut();
    console.log("Session closed");
  } catch (error) {
    handleError("Error closing session:", error, "Could not close session.");
  }
};

/**
 * Signs in or creates a user with email and password.
 *
 * Purpose:
 * - Attempts to create a new user with email and password.
 * - If the email is already in use, tries to sign in instead.
 * - Ensures the user exists in Firestore (creates if not).
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The Firestore user object if successful, otherwise undefined.
 */
export const signInWithEmail = async (email: string, password: string) => {
  // Basic validation
  if (!email.includes("@")) {
    throw new Error("Invalid email address.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  try {
    const user = await authService.newUserEmailAndPassword(email, password);
    if (!user) {
      throw new Error("No user returned from newUserEmailAndPassword.");
    }
    const userFirestore = await getUserDefault(user);
    return userFirestore;
  } catch (err: any) {
    if (err.code === "auth/email-already-in-use") {
      try {
        const userf = await authService.signInEmail(email, password);
        if (!userf) {
          throw new Error("No user returned from signInEmail.");
        }
        const userFirestore = await getUserDefault(userf);
        return userFirestore;
      } catch (signInErr: any) {
        handleError(
          "Incorrect password or user does not exist:",
          signInErr,
          "Incorrect password or user does not exist."
        );
      }
    } else {
      handleError(
        "Error creating user with email:",
        err,
        "Could not create user. " + (err.message || "")
      );
    }
  }
};
