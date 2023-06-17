
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-HbUxe6zA75k9029wBvsT2whO8t-A_8U",
  authDomain: "disneyplus-clone-b3a24.firebaseapp.com",
  projectId: "disneyplus-clone-b3a24",
  storageBucket: "disneyplus-clone-b3a24.appspot.com",
  messagingSenderId: "944909466444",
  appId: "1:944909466444:web:59a73a4ec36ed512f22de9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth(app);
const provider = new GoogleAuthProvider();
const storageInstance = getStorage(app);

export { app, db, authInstance, provider, storageInstance };
