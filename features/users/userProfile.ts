import { userService } from "@/features/users/userService";
import { User } from "./userModel";
import { handleError } from "@/shared/utilities/errorHandler";
import { serverTimestamp } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

/**
 * Gets a user by ID from Firestore. If the user does not exist, creates a new user document.
 *
 * @param u - The Firebase user object.
 * @returns The existing or newly created User object, or null if there was an error.
 */
export const getUserDefault = async (u: FirebaseUser) => {
  try {
    // Fetch user by ID from Firestore
    const usersArr = await userService.getUserById(u.uid);

    // If user does not exist, create a new user document
    if (!usersArr || usersArr.length === 0) {
      const newUser: User = {
        id: u.uid,
        email: u.email || "",
        name: u.displayName || "",
        admin: false,
        photoUrl: u.photoURL || "",
        language: navigator.language || "en",
        createdAt: serverTimestamp(),
      };

      await userService.addUser(newUser);
      console.log("User created in Firestore");
      return newUser;
    } else {
      // User already exists, return the first match
      console.log("User already exists in Firestore");
      return usersArr[0];
    }
  } catch (error) {
    handleError(
      "Error creating user in Firestore:",
      error,
      "Could not create user in Firestore."
    );
    return null;
  }
};

/**
 * Updates a user in Firestore and uploads a new profile image if provided.
 *
 * @param id - The user's unique ID.
 * @param data - Partial User object with fields to update.
 * @param imageFile - (Optional) Image file to upload as profile picture.
 * @returns The updated User object, or undefined if there was an error.
 */
export const updateUserWithImage = async (
  id: string,
  data: Partial<User>,
  imageFile?: File
) => {
  let photoUrl = data.photoUrl;

  // If an image file is provided, upload it and update photoUrl
  if (imageFile) {
    const storagePath = `profileImages/${id}/${imageFile.name}`;
    try {
      const uploadedUrl = await userService.updateUserImage(
        storagePath,
        imageFile
      );
      if (uploadedUrl) {
        photoUrl = uploadedUrl;
        data.photoUrl = photoUrl;
      }
    } catch (error) {
      handleError(
        "Error uploading profile image:",
        error,
        "Could not upload profile image."
      );
    }
  }
  try {
    // Update user document in Firestore
    const updatedUser = await userService.updateUser(id, data);
    return updatedUser;
  } catch (error) {
    handleError("Error updating user:", error, "Could not update user.");
  }
};
