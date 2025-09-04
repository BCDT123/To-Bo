import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then(async (result) => {
    const user = result.user;
    await createUserDocument(user); // Aquí conectamos con Firestore
  })
  .catch((error) => {
    console.error("Error al iniciar sesión:", error);
  });
