import useMock from "../../../config/useMock";
import {
  loginWithPopup,
  logout,
  signInWithEmail,
  newUserWithEmailAndPassword,
} from "@/shared/services/firestore/firestore";

/**
 * Auth service for handling authentication logic.
 *
 * Purpose:
 * - Provides methods for signing in/out with Google popup or email/password.
 * - Uses mock implementations if useMock is enabled.
 */
export const authService = {
  /**
   * Signs in the user using Google popup authentication.
   * @returns The authenticated user object or null if using mock.
   */
  signInPopUp: () => (useMock ? null : loginWithPopup()),

  /**
   * Signs out the current authenticated user.
   * @returns void or null if using mock.
   */
  signOut: () => (useMock ? null : logout()),

  /**
   * Signs in a user with email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns The authenticated user object or null if using mock.
   */
  signInEmail: (email: string, password: string) =>
    useMock ? null : signInWithEmail(email, password),

  /**
   * Creates a new user with email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns The newly created user object or null if using mock.
   */
  newUserEmailAndPassword: (email: string, password: string) =>
    useMock ? null : newUserWithEmailAndPassword(email, password),
};
