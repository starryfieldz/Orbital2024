// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHHPnC856gH1XaYskbn2tC105TETza8PA",
  authDomain: "finance360-7e990.firebaseapp.com",
  projectId: "finance360-7e990",
  storageBucket: "finance360-7e990.appspot.com",
  messagingSenderId: "660957544396",
  appId: "1:660957544396:web:df4b8ef250f30f47d6a769",
  measurementId: "G-D5NFPRLTNL",
  databaseURL: "https://finance360-7e990-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const DATABASE = getDatabase(FIREBASE_APP);