import mockData from "../mockData";
import { endpoints } from "@/config/endpoints";

export async function mockUser<T>(endpoint: string): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData[endpoint] as T);
    }, 500); // Simula latencia
  });
}

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
    Promise.resolve(true),

  deleteDocument: (_endpoint: string, _id: string) => Promise.resolve(true),
};
