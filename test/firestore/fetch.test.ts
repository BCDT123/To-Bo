import { firestoreMockJest } from "@/mocks/firestoreMock.jest";
import mockData from "@/mocks/mockData";
import { endpoints } from "@/config/endpoints";

// Luego haz el mock de la dependencia
jest.mock("@/services/firestore/fetch", () => ({
  fetchCollection: firestoreMockJest.fetchCollection,
}));

// Ahora puedes importar la función mockeada
import { fetchCollection } from "@/shared/services/firestore/fetch";

describe("fetchCollection", () => {
  it("should return mock data", async () => {
    const result = await fetchCollection(endpoints.users);
    expect(result).toEqual(mockData[endpoints.users]);
    // se usa para verificar que la función fetchCollection fue llamada con el argumento "User" durante el tes
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
