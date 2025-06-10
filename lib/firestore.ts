import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Convert Firestore timestamp to Date
export const convertTimestamp = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// Generic Firestore helper functions for developers to build upon
export const createDocument = async (collectionName: string, data: any): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateDocument = async (collectionName: string, docId: string, data: any): Promise<void> => {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  await deleteDoc(doc(db, collectionName, docId));
};

export const getDocument = async (collectionName: string, docId: string): Promise<any | null> => {
  const docSnap = await getDoc(doc(db, collectionName, docId));
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : new Date(),
    };
  }
  
  return null;
};

export const getDocuments = async (collectionName: string, conditions?: any[]): Promise<any[]> => {
  let q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
  
  if (conditions) {
    conditions.forEach(condition => {
      q = query(q, condition);
    });
  }
  
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : new Date(),
    };
  });
};

// Real-time listeners
export const subscribeToDocument = (collectionName: string, docId: string, callback: (doc: any | null) => void) => {
  return onSnapshot(doc(db, collectionName, docId), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : new Date(),
      });
    } else {
      callback(null);
    }
  });
};

export const subscribeToCollection = (
  collectionName: string,
  callback: (docs: any[]) => void,
  conditions?: any[]
) => {
  let q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
  
  if (conditions) {
    conditions.forEach(condition => {
      q = query(q, condition);
    });
  }
  
  return onSnapshot(q, (querySnapshot) => {
    const docs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? convertTimestamp(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? convertTimestamp(data.updatedAt) : new Date(),
      };
    });
    callback(docs);
  });
};