import useMock from "../../config/useMock";
import { firestoreMock } from "@/shared/mocks/mockService";
import { endpoints } from "../../config/endpoints";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
  uploadFileToStorage,
} from "@/shared/services/firestore/firestore";

import { User } from "@/features/users/userModel";

/**
 * User service for interacting with Firestore and mock services.
 * Provides CRUD operations and image upload for user profiles.
 */
export const userService = {
  /**
   * Fetches all users from Firestore or mock service.
   * @returns An array of User objects.
   */
  getUsers: () =>
    useMock
      ? firestoreMock.fetchCollection(endpoints.users)
      : fetchCollection<User>(endpoints.users),

  /**
   * Fetches a user by ID from Firestore or mock service.
   * @param id - The user's unique ID.
   * @returns An array with the matching User object(s).
   */
  getUserById: (id: string) =>
    useMock
      ? firestoreMock.fetchFiltered(endpoints.users, "id", "==", id)
      : fetchFiltered<User>(endpoints.users, "id", "==", id),

  /**
   * Adds a new user to Firestore or mock service.
   * @param data - The User object to add.
   * @returns The ID of the created user or mock result.
   */
  addUser: (data: User) =>
    useMock
      ? firestoreMock.addToCollection(endpoints.users, data)
      : addToCollection(endpoints.users, data, data.id),

  /**
   * Updates an existing user in Firestore or mock service.
   * @param id - The user's unique ID.
   * @param data - Partial User object with fields to update.
   * @returns The updated User object or mock result.
   */
  updateUser: (id: string, data: Partial<User>) =>
    useMock
      ? firestoreMock.updateDocument(endpoints.users, id, data)
      : updateDocument(endpoints.users, id, data),

  /**
   * Deletes a user from Firestore or mock service.
   * @param id - The user's unique ID.
   * @returns True if deleted successfully, false otherwise.
   */
  deleteUser: (id: string) =>
    useMock
      ? firestoreMock.deleteDocument(endpoints.users, id)
      : deleteDocument(endpoints.users, id),

  /**
   * Uploads a user profile image to Firebase Storage.
   * @param storagePath - The path in Storage where the image will be saved.
   * @param imageFile - The image file to upload.
   * @returns The public URL of the uploaded image or null if using mock.
   */
  updateUserImage: (storagePath: string, imageFile: File) =>
    useMock ? null : uploadFileToStorage(storagePath, imageFile),
};
