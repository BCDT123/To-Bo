import {
  collection,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  WhereFilterOp,
} from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

/**
 * Reference to the "users" collection in Firestore.
 */
const usuariosRef = collection(firestore, "users");

/**
 * Fetches all users from the "users" collection.
 * @returns An array of users with their data and id.
 */
export async function fetchUsers() {
  try {
    const snapshot = await getDocs(usuariosRef);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (e) {
    console.error("Error to get Users:", e);
  }
}

// Example usage:
// const users = await fetchCollection("users");
// const babies = await fetchCollection("babies");
// const feedLogs = await fetchCollection("feedLogs");

// interface Baby {
//   id: string;
//   name: string;
//   birth_date: string;
//   gender?: string;
//   photo_url?: string;
//   created_at: string;
// }

// Example usage with custom type:
// const babies = await fetchCollection<Baby>("babies");

/**
 * Dynamically fetches all documents from a specific Firestore collection.
 * @param collectionName - The name of the collection to query.
 * @returns An array of objects of type T containing the data of each document.
 */
export async function fetchCollection<T = DocumentData>(
  collectionName: string
): Promise<T[]> {
  try {
    const ref = collection(firestore, collectionName);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (e) {
    console.error(`Error fetching ${collectionName}:`, e);
    return [];
  }
}

// Example usage with filter:
// const babyGirls = await fetchFiltered<Baby>("babies", "gender", "==", "female");

/**
 * Dynamically fetches documents from a collection filtered by a field, operator, and value.
 * By using T = DocumentData, you allow the user to pass their own custom type if desired.
 * @param collectionName - The name of the collection to query.
 * @param field - The field to filter by.
 * @param operator - The comparison operator (e.g., "==", "<", ">", etc).
 * @param value - The value the field must match to be included in the result.
 * @returns An array of objects of type T that match the filter.
 */
export async function fetchFiltered<T = DocumentData>(
  collectionName: string,
  field: string,
  operator: WhereFilterOp,
  value: any
): Promise<T[]> {
  try {
    const ref = collection(firestore, collectionName);
    const q = query(ref, where(field, operator, value));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (e) {
    console.error(`Error fetching ${collectionName} with filter:`, e);
    return [];
  }
}
