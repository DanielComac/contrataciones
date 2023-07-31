// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU1Ofb3VCW_r_is1_J_NexSzBqv0fDoBc",
  authDomain: "appcontrataciones.firebaseapp.com",
  projectId: "appcontrataciones",
  storageBucket: "appcontrataciones.appspot.com",
  messagingSenderId: "476693258193",
  appId: "1:476693258193:web:f5687cc3058ce139534af0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default firebaseConfig