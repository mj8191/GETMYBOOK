// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEPctVbvcPgDqfhIx8H16AcMmu2lKx09M",
  authDomain: "getmybook-45c8e.firebaseapp.com",
  projectId: "getmybook-45c8e",
  storageBucket: "getmybook-45c8e.appspot.com",
  messagingSenderId: "824261023897",
  appId: "1:824261023897:web:4abf107cf2992d8060c008",
  measurementId: "G-4JDYJZ05NY"
};

// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
export {firebase};