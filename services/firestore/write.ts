import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

// const newBaby = {
//   name: "Luna",
//   birth_date: "2025-08-15",
//   gender: "female",
//   created_at: new Date().toISOString(),
// };

// const babyId = await addToCollection("babies", newBaby);

export async function addToCollection<T extends object>(
  collectionName: string,
  data: T
): Promise<string | null> {
  try {
    const ref = collection(firestore, collectionName);
    const docRef = await addDoc(ref, data);
    return docRef.id;
  } catch (e) {
    console.error(`Error adding to ${collectionName}:`, e);
    return null;
  }
}

// await updateDocument("babies", babyId!, {
//   name: "Luna Valentina",
// });

export async function updateDocument<T extends object>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<boolean> {
  try {
    const ref = doc(firestore, collectionName, docId);
    await updateDoc(ref, data);
    return true;
  } catch (e) {
    console.error(`Error updating ${collectionName}/${docId}:`, e);
    return false;
  }
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<boolean> {
  try {
    const ref = doc(firestore, collectionName, docId);
    await deleteDoc(ref);
    return true;
  } catch (e) {
    console.error(`Error deleting ${collectionName}/${docId}:`, e);
    return false;
  }
}
