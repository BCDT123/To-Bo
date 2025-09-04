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
        name: user.displayName || "Sin nombre",
        admin: false,
        photoUrl: user.photoURL || "",
        language: navigator.language || "es",
        createdAt: serverTimestamp(), // mejor que new Date()
      };

      await userService.addUser(newUser); // usa el UID como ID
      console.log("Usuario creado en Firestore");
    } else {
      console.log("Usuario ya existe en Firestore");
    }

    return user; // opcional: puedes devolver el usuario
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada correctamente");
    // Opcional: redirige al usuario o limpia el estado
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
