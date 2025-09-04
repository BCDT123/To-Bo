import mockData from "./mockData";
import { endpoints } from "@/config/endpoints";

export async function mockClient<T>(endpoint: string): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData[endpoint] as T);
    }, 500); // Simula latencia
  });
}

// Funciones simuladas
export const firestoreMock = {
  fetchCollection: () => Promise.resolve(mockData[endpoints.users]),
  addToCollection: () => Promise.resolve("mock-id"),
  updateDoc: () => Promise.resolve(true),
  deleteDoc: () => Promise.resolve(true),
};
