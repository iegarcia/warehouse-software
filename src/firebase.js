import { db, storage } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const storeData = async (collection, data) => {
  try {
    await setDoc(doc(db, collection, data.code), {
      data,
    });
    return doc;
  } catch (e) {
    throw new Error(e);
  }
};

export const getWarehouses = async () => {
  let docs = [];
  const querySnapshot = await getDocs(collection(db, "warehouses"));
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });
  let results = docs.map((d) => {
    return d.data;
  });
  return results;
};

export const getDbData = async (collection, id) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const deleteWarehouse = async (id) => {
  await deleteDoc(doc(db, "warehouses", id));
};

export const storeFile = async (name, file) => {
  const fileRef = ref(storage, `${name}-${file.name}`);
  await uploadBytes(fileRef, file);
  const link = await getDownloadURL(fileRef);
  return link;
};
