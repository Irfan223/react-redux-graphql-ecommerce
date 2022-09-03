import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDChPzYTC-YqJQMfi71pUE61-PN3-hE7AI",
  authDomain: "clothing-app-d1780.firebaseapp.com",
  projectId: "clothing-app-d1780",
  storageBucket: "clothing-app-d1780.appspot.com",
  messagingSenderId: "620298776133",
  appId: "1:620298776133:web:fa1c8b76e3832504b33d2c",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
//   console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
//   console.log(userSnapShot);
//   console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // If user data exists
  return userDocRef;

};
