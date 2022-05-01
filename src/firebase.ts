import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  Unsubscribe,
  User,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ref, computed, onMounted, onUnmounted } from "vue";

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

export const logout = () => {
  signOut(auth);
};

export const getUserState = () =>
  new Promise((resolve, reject) => onAuthStateChanged(auth, resolve, reject));

export const useAuthState = () => {
  const user = ref<User>();
  const error = ref<Error>();

  let unsubscribe: Unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u || undefined),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);

  return { user, error, isAuthenticated };
};

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
      timestamp: new Date().toISOString(),
      content: message,
    });
    return {
      success: true,
      msg: `Message saved with ID: ${docRef.id}`,
    };
  } catch (e) {
    return {
      success: false,
      msg: `Error adding message: ${e}`,
    };
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
