import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4X5ZodlRxyrzvY7jj3P668jFQl9KQ2ik",
  authDomain: "warehouse-software-4707f.firebaseapp.com",
  projectId: "warehouse-software-4707f",
  storageBucket: "warehouse-software-4707f.appspot.com",
  messagingSenderId: "274349646068",
  appId: "1:274349646068:web:62e61297053f543dedbea1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
