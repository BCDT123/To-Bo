// features/users/auth.ts
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore, provider } from "@/firebaseConfig";
import { userService } from "@/features/users/userService";
import { handleError } from "@/lib/errorHandler";

import {
  signInWithPopup,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { User } from "@/features/users/userModel";

/** Login with Google popup */
export const loginWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await createUserDefault(user);
    return user;
  } catch (error) {
    handleError(
      "Error logging in with Google:",
      error,
      "Could not log in with Google."
    );
  }
};

/** Creates a user document in Firestore if it doesn't exist */
export const createUserDefault = async (u: FirebaseUser) => {
  try {
    const userRef = doc(firestore, "users", u.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newUser: User = {
        id: u.uid,
        email: u.email || "",
        name: u.displayName || "Unknown",
        admin: false,
        photoUrl: u.photoURL || "",
        language: navigator.language || "en",
        createdAt: serverTimestamp(),
      };

      await userService.addUser(newUser);
      console.log("User created in Firestore");
    } else {
      console.log("User already exists in Firestore");
    }
  } catch (error) {
    handleError(
      "Error creating user in Firestore:",
      error,
      "Could not create user in Firestore."
    );
  }
};

/** Logs out the current user */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Session closed");
  } catch (error) {
    handleError("Error closing session:", error, "Could not close session.");
  }
};

/** Signs in or creates a user with email and password */
export const signInWithEmail = async (email: string, password: string) => {
  const auth = getAuth();

  // Basic validation
  if (!email.includes("@")) {
    throw new Error("Invalid email address.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDefault(result.user);
    return result.user;
  } catch (err: any) {
    if (err.code === "auth/email-already-in-use") {
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
    } else {
      handleError(
        "Error creating user with email:",
        err,
        "Could not create user. " + (err.message || "")
      );
    }
  }
};
