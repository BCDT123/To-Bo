import { Timestamp, FieldValue } from "firebase/firestore";

/**
 * User interface representing a user document in Firestore.
 *
 * Properties:
 * - id: Unique identifier for the user.
 * - email: User's email address.
 * - name: User's display name.
 * - admin: Boolean indicating if the user has admin privileges.
 * - photoUrl: URL of the user's profile picture.
 * - language: User's preferred language code.
 * - createdAt: Timestamp or FieldValue indicating when the user was created.
 * - updatedAt: (Optional) Date indicating when the user was last updated.
 *
 * Note:
 * - The password field is commented out because Firebase Auth handles authentication.
 */
export interface User {
  id: string;
  email: string;
  // password: string; // Remove if using Firebase Auth
  name: string;
  admin: boolean;
  photoUrl: string;
  language: string;
  createdAt: FieldValue | Date;
  updatedAt?: Date;
}
