// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
// 이렇게 firebase 자체에 초기화만 시켜놓으면 매우 괜춘.
export const dbService = getFirestore();

// const = initializeApp(firebaseConfig);
// export const authService = getAuth();

// console.log(process.env.REACT_APP_API_KEY);
// console.log(process.env.REACT_APP_AUTH_DOMAIN);
// console.log(process.env.REACT_APP_PROJECT_ID);
// console.log(process.env.REACT_APP_STORAGE_BUCKET);
// console.log(process.env.REACT_APP_MESSAGIN_ID);
// console.log(process.env.REACT_APP_APP_ID);
