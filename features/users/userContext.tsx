// context/UserContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, firestore } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { User as AppUser } from "@/features/users/userModel";

/**
 * Context type for user state management.
 *
 * Properties:
 * - user: The current user object, null if not logged in, or undefined while loading.
 * - setUser: Function to update the user state.
 */
type UserContextType = {
  user: AppUser | null | undefined;
  setUser: (user: AppUser | null | undefined) => void;
};

/**
 * React context for user state.
 */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provider component for user context.
 *
 * Purpose:
 * - Listens to Firebase Auth state changes.
 * - Fetches user data from Firestore when authenticated.
 * - Provides user and setUser to the component tree.
 *
 * @param children - React children components.
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userRef = doc(firestore, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data() as AppUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to access the user context object (user and setUser).
 *
 * @returns The user context object.
 * @throws Error if used outside of UserProvider.
 */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};

/**
 * Custom hook to access only the user object from context.
 *
 * @returns The current user object.
 */
export const useUser = () => {
  const { user } = useUserContext();
  return user;
};

/**
 * Custom hook to access only the setUser function from context.
 *
 * @returns The setUser function.
 */
export const useSetUser = () => {
  const { setUser } = useUserContext();
  return setUser;
};
