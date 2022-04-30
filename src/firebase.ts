import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTvkDecjLBR67HR3lLXK3KaFop9W4mxWY",
  authDomain: "emk-uplink.firebaseapp.com",
  projectId: "emk-uplink",
  storageBucket: "emk-uplink.appspot.com",
  messagingSenderId: "1073205622730",
  appId: "1:1073205622730:web:e4e198f30f46bf92b40133",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(`user is logged in: ${uid}}`);
  }
});

export const getMessagesOnce = async () => {
  try {
    const snapshot = await getDocs(collection(db, "messages"));
    return snapshot.docs.map((x) => x.data());
  } catch (e) {
    return `Error getting messages: ${e}`;
  }
};

export const saveMessage = async (message: string) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      timestamp: serverTimestamp(),
      content: message,
    });
    return `Message saved with ID: ${docRef.id}`;
  } catch (e) {
    return `Error adding message: ${e}`;
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await await deleteDoc(doc(db, "messages", id));
    return `Message with ID: ${id} deleted`;
  } catch (e) {
    return `Error deleting message: ${e}`;
  }
};
