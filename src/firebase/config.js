import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "boost-eshop.firebaseapp.com",
  projectId: "boost-eshop",
  storageBucket: "boost-eshop.appspot.com",
  messagingSenderId: "182693568001",
  appId: "1:182693568001:web:89eade758618e8f078aa00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
