import { fetchCollection } from "@/services/firestore/fetch";
import { firestoreMockJest } from "@/mocks/firestoreMock.jest";
import mockData from "./mockData";
import { endpoints } from "@/config/endpoints";

jest.mock("@/services/firestore/fetch", () => ({
  fetchCollection: firestoreMockJest.fetchCollection,
}));

describe("fetchCollection", () => {
  it("should return mock data", async () => {
    const result = await fetchCollection(endpoints.users);
    expect(result).toEqual(mockData[endpoints.users]);
    // se usa para verificar que la función fetchCollection fue llamada con el argumento "Users" durante el tes
    //tiene que ser un mock porque solo los mock tienen acceso al toHaveBeenCAlledWith
    expect(firestoreMockJest.fetchCollection).toHaveBeenCalledWith(
      endpoints.users
    );
  });
});

//estender el mock para validar las otras funciones

// jest.mock("@/services/firestore/fetch", () => ({
//   fetchCollection: jest.fn(() => Promise.resolve([...mockData])),
//   fetchFiltered: jest.fn(() => Promise.resolve([...filteredMockData])),
//   fetchUsers: jest.fn(() => Promise.resolve([...userMockData])),
// }));
