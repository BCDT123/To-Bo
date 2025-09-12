import mockData from "@/shared/mocks/mockData";

// Funciones simuladas
export const firestoreMock = {
  fetchCollection: (endpoint: string) =>
    Promise.resolve(mockData[endpoint] || []),

  fetchFiltered: (
    endpoint: string,
    field: string,
    operator: string,
    value: any
  ) =>
    Promise.resolve(
      (mockData[endpoint] || []).filter((item: any) => item[field] === value)
    ),

  addToCollection: (_endpoint: string, _data: any) =>
    Promise.resolve("mock-id"),

  updateDocument: (_endpoint: string, _id: string, _data: any) =>
    Promise.resolve(_data),

  deleteDocument: (_endpoint: string, _id: string) => Promise.resolve(true),
};
