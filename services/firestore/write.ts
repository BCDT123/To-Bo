import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "@/firebaseConfig";

/**
 * Adds a new document to a Firestore collection.
 * @param collectionName - The name of the collection.
 * @param data - The object containing the data to save.
 * @param customId - (Optional) Custom ID for the document.
 * @returns The ID of the created document or null if there was an error.
 */
export async function addToCollection<T extends object>(
  collectionName: string,
  data: T,
  customId?: string
): Promise<string | null> {
  try {
    const ref = collection(firestore, collectionName);
    const docRef = customId ? doc(ref, customId) : doc(ref);

    const enrichedData = {
      ...data,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, enrichedData);
    return docRef.id;
  } catch (e) {
    console.error(`Error adding to ${collectionName}:`, e);
    return null;
  }
}

/**
 * Updates an existing document in Firestore and returns the updated document.
 * @param collectionName - The name of the collection.
 * @param docId - The ID of the document to update.
 * @param data - Partial object with the fields to update.
 * @returns The updated document as an object or null if there was an error.
 */
export async function updateDocument<T extends object>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<T | null> {
  try {
    const ref = doc(firestore, collectionName, docId);
    await updateDoc(ref, data);
    const updatedSnap = await getDoc(ref);
    if (updatedSnap.exists()) {
      return updatedSnap.data() as T;
    }
    return null;
  } catch (e) {
    console.error(`Error updating ${collectionName}/${docId}:`, e);
    return null;
  }
}

/**
 * Deletes a document from Firestore.
 * @param collectionName - The name of the collection.
 * @param docId - The ID of the document to delete.
 * @returns true if deleted successfully, false if there was an error.
 */
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

/**
 * Uploads a file to Firebase Storage and returns the public download URL.
 * @param path - The path where the file will be stored in Storage.
 * @param file - The file to upload.
 * @returns The public URL of the uploaded file or null if there was an error.
 */
export async function uploadFileToStorage(
  path: string,
  file: File
): Promise<string | null> {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (e) {
    console.error(`Error uploading file to storage:`, e);
    return null;
  }
}
