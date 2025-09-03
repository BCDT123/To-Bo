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

const usuariosRef = collection(firestore, "users");

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

// const babies = await fetchCollection<Baby>("babies");

//Fetch Collection Dinamica
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

// const babyGirls = await fetchFiltered<Baby>("babies", "gender", "==", "female");

//Fetch Collection Dinamico y Filtrado
//Al usar T = DocumentData, permites que el usuario pase su propio tipo personalizado si lo desea
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
