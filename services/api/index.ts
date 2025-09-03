import useMock from "../../config/useMock";
import { mockClient } from "../mocks/mockClient";

import {
  fetchCollection,
  fetchFiltered,
  addToCollection,
  updateDocument,
  deleteDocument,
} from "@/services/api/firestore";

import { User } from "@/types/models";

// const babies = await fetchCollection<User>("users");
export const apiService = {
  getUsers: () =>
    useMock ? mockClient("/api/users") : fetchCollection<User>("users"),
  addUser: (data: User) =>
    useMock ? mockClient("/api/addUsers") : addToCollection("users", data),
};
