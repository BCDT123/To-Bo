import useMock from "../../config/useMock";
import { mockClient } from "../../mocks/mockClient";
import { endpoints } from "../../config/endpoints";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/firestore/firestore";

import { User } from "@/types/models";

// const babies = await fetchCollection<User>("users");
export const apiService = {
  getUsers: () =>
    useMock
      ? mockClient(endpoints.users)
      : fetchCollection<User>(endpoints.users),
  addUser: (data: User) =>
    useMock
      ? mockClient(endpoints.users)
      : addToCollection(endpoints.users, data),
};
