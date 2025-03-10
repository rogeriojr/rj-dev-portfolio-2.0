import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAqwJglss9IyEsHHh1xSrlTgHSOooxDpHE",
  authDomain: "rj-dev-6d825.firebaseapp.com",
  projectId: "rj-dev-6d825",
  storageBucket: "rj-dev-6d825.appspot.com",
  messagingSenderId: "55103209578",
  appId: "1:55103209578:web:cfd3f04cd50b47ccbf4a13",
  measurementId: "G-6CF1H2KZF7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);