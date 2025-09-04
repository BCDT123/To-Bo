import useMock from "../../config/useMock";
import { firestoreMock } from "../../mocks/mockServices/mockUserService";
import { endpoints } from "../../config/endpoints";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firestore/firestore";

import { User } from "@/types/models";

export const userService = {
  getUsers: () =>
    useMock
      ? firestoreMock.fetchCollection(endpoints.users)
      : fetchCollection<User>(endpoints.users),

  getUserById: (id: string) =>
    useMock
      ? firestoreMock.fetchFiltered(endpoints.users, "id", "==", id)
      : fetchFiltered<User>(endpoints.users, "id", "==", id),

  addUser: (data: User) =>
    useMock
      ? firestoreMock.addToCollection(endpoints.users, data)
      : addToCollection(endpoints.users, data),

  updateUser: (id: string, data: Partial<User>) =>
    useMock
      ? firestoreMock.updateDocument(endpoints.users, id, data)
      : updateDocument(endpoints.users, id, data),

  deleteUser: (id: string) =>
    useMock
      ? firestoreMock.deleteDocument(endpoints.users, id)
      : deleteDocument(endpoints.users, id),
};
