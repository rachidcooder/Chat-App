// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlww8Vfc2f3lrQMuE5UhSlasTOVNb0vB4",
  authDomain: "chat-app-599c7.firebaseapp.com",
  projectId: "chat-app-599c7",
  storageBucket: "chat-app-599c7.appspot.com",
  messagingSenderId: "532454074284",
  appId: "1:532454074284:web:29e0ee1545e296ad737c09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();  //const analytics = getAnalytics(app);

export const db = getFirestore();