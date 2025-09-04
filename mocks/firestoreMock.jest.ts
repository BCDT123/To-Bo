import { firestoreMock as rawMock } from "./mockClient";

// Versión mockeada con jest.fn()
// Se usa exclusivo para pruebas unitarias
export const firestoreMockJest = {
  fetchCollection: jest.fn(rawMock.fetchCollection),
  addToCollection: jest.fn(rawMock.addToCollection),
  updateDoc: jest.fn(rawMock.updateDoc),
  deleteDoc: jest.fn(rawMock.deleteDoc),
};
