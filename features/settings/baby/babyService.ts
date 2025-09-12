import useMock from "@/config/useMock";
import { firestoreMock } from "@/mocks/mockService";
import { endpoints } from "@/config/endpoints";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
  uploadFileToStorage,
} from "@/services/firestore/firestore";

import { Baby } from "./babyModel";

/**
 * Baby service for interacting with Firestore and mock services.
 * Provides CRUD operations and image upload for baby profiles.
 */
export const babyService = {
  /**
   * Fetches all babies from Firestore or mock service.
   * @returns An array of Baby objects.
   */
  getBabies: () =>
    useMock
      ? firestoreMock.fetchCollection(endpoints.babies)
      : fetchCollection<Baby>(endpoints.babies),

  /**
   * Fetches a baby by ID from Firestore or mock service.
   * @param id - The baby's unique ID.
   * @returns An array with the matching Baby object(s).
   */
  getBabyById: (id: string) =>
    useMock
      ? firestoreMock.fetchFiltered(endpoints.babies, "id", "==", id)
      : fetchFiltered<Baby>(endpoints.babies, "id", "==", id),

  /**
   * Adds a new baby to Firestore or mock service.
   * @param data - The Baby object to add.
   * @returns The ID of the created baby or mock result.
   */
  addBaby: (data: Baby) =>
    useMock
      ? firestoreMock.addToCollection(endpoints.babies, data)
      : addToCollection(endpoints.babies, data, data.id),

  /**
   * Updates an existing baby in Firestore or mock service.
   * @param id - The baby's unique ID.
   * @param data - Partial Baby object with fields to update.
   * @returns The updated Baby object or mock result.
   */
  updateBaby: (id: string, data: Partial<Baby>) =>
    useMock
      ? firestoreMock.updateDocument(endpoints.babies, id, data)
      : updateDocument(endpoints.babies, id, data),

  /**
   * Deletes a baby from Firestore or mock service.
   * @param id - The baby's unique ID.
   * @returns True if deleted successfully, false otherwise.
   */
  deleteBaby: (id: string) =>
    useMock
      ? firestoreMock.deleteDocument(endpoints.babies, id)
      : deleteDocument(endpoints.babies, id),

  /**
   * Uploads a baby profile image to Firebase Storage.
   * @param storagePath - The path in Storage where the image will be saved.
   * @param imageFile - The image file to upload.
   * @returns The public URL of the uploaded image or null if using mock.
   */
  updateBabyImage: (storagePath: string, imageFile: File) =>
    useMock ? null : uploadFileToStorage(storagePath, imageFile),
};
