// Elimina password si usas Firebase Auth
export interface User {
  id: string;
  email: string;
  //password: string;
  name: string;
  admin: boolean;
  photoUrl: string;
  language: string;
  createdAt: Date;
  updatedAt?: Date;
}
