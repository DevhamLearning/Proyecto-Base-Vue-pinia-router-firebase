// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0t0-HYAQv_A648sZo9lj67HOeKAAmm4g",
    authDomain: "vue3-auth-082022.firebaseapp.com",
    projectId: "vue3-auth-082022",
    storageBucket: "vue3-auth-082022.appspot.com",
    messagingSenderId: "240706165445",
    appId: "1:240706165445:web:761d3098649076c7f22eac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };