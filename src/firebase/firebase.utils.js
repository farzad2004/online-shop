import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDr9T0MnwvPqb7AY4IDCCLdwkfwJPz_QYY",
  authDomain: "crwn-db-73003.firebaseapp.com",
  databaseURL: "https://crwn-db-73003.firebaseio.com",
  projectId: "crwn-db-73003",
  storageBucket: "crwn-db-73003.appspot.com",
  messagingSenderId: "1054082852797",
  appId: "1:1054082852797:web:1fa966cb816913400d14d4",
  measurementId: "G-DCRK6K6EH2",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ promp: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
