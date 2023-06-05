// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlOmWdMtt4r1v32P0wt3jnxBtIaXkNIek",
  authDomain: "loginbt-d6f6e.firebaseapp.com",
  projectId: "loginbt-d6f6e",
  storageBucket: "loginbt-d6f6e.appspot.com",
  messagingSenderId: "1055089828372",
  appId: "1:1055089828372:web:1d35ffa24597c024ecfd01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default firebaseConfig