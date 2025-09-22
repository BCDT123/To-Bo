import useMock from "@/config/useMock";
import { firestoreMock } from "@/shared/mocks/mockService";
import { endpoints } from "@/config/endpoints";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
  uploadFileToStorage,
} from "@/shared/services/firestore/firestore";

import { House } from "../types/houseModel";

/**
 * House service for interacting with Firestore and mock services.
 * Provides CRUD operations for house profiles.
 */
export const houseService = {
  /**
   * Fetches all houses from Firestore or mock service.
   * @returns An array of House objects.
   */
  getHouses: () =>
    useMock
      ? firestoreMock.fetchCollection(endpoints.houses)
      : fetchCollection<House>(endpoints.houses),

  /**
   * Fetches a house by ID from Firestore or mock service.
   * @param id - The house's unique ID.
   * @returns An array with the matching House object(s).
   */
  getHouseById: (id: string) =>
    useMock
      ? firestoreMock.fetchFiltered(endpoints.houses, "id", "==", id)
      : fetchFiltered<House>(endpoints.houses, "id", "==", id),

  /**
   * Adds a new house to Firestore or mock service.
   * @param data - The House object to add.
   * @returns The ID of the created house or mock result.
   */
  addHouse: (data: House) =>
    useMock
      ? firestoreMock.addToCollection(endpoints.houses, data)
      : addToCollection(endpoints.houses, data, data.id),

  /**
   * Updates an existing house in Firestore or mock service.
   * @param id - The house's unique ID.
   * @param data - Partial House object with fields to update.
   * @returns The updated House object or mock result.
   */
  updateHouse: (id: string, data: Partial<House>) =>
    useMock
      ? firestoreMock.updateDocument(endpoints.houses, id, data)
      : updateDocument(endpoints.houses, id, data),

  /**
   * Deletes a house from Firestore or mock service.
   * @param id - The house's unique ID.
   * @returns True if deleted successfully, false otherwise.
   */
  deleteHouse: (id: string) =>
    useMock
      ? firestoreMock.deleteDocument(endpoints.houses, id)
      : deleteDocument(endpoints.houses, id),
};
