import firebase from "firebase/app";
import ReduxSagaFirebase from "redux-saga-firebase";
import "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

const fb = firebase.initializeApp(firebaseConfig);
export const rsf = new ReduxSagaFirebase(fb);
export const db = firebase.firestore();

export default firebase;

export type User = {
  name: string;
  age: number;
};
