// features/users/auth.ts
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore, provider } from "@/firebaseConfig";
import { userService } from "@/features/users/userService";
import { signInWithPopup, signOut } from "firebase/auth";

export const loginWithPopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(firestore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newUser: User = {
        id: user.uid,
        email: user.email || "",
        name: user.displayName || "Unknown",
        admin: false,
        photoUrl: user.photoURL || "",
        language: navigator.language || "en",
        createdAt: serverTimestamp(), // mejor que new Date()
      };

      await userService.addUser(newUser); // usa el UID como ID
      console.log("User created in Firestore");
    } else {
      console.log("User exist in Firestore");
    }

    return user; // opcional: puedes devolver el usuario
  } catch (error) {
    console.error("Error log in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Session close", auth);
    // Opcional: redirige al usuario o limpia el estado
  } catch (error) {
    console.error("Error close session:", error);
  }
};
