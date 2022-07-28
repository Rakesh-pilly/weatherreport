// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { getDatabase , ref, get, query, limitToFirst, startAt, orderByChild} from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2TF7ZyBGcLfAKcG4PptvEHZ9X0OtZdx8",
  authDomain: "redux-http-18c97.firebaseapp.com",
  databaseURL: "https://redux-http-18c97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "redux-http-18c97",
  storageBucket: "redux-http-18c97.appspot.com",
  messagingSenderId: "528608620072",
  appId: "1:528608620072:web:26dff68ad6ebdafea80f1d",
  measurementId: "G-BX2QW3STQW"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
 export const db = getDatabase();


//  const recentPostsRef = query(ref(db, 'cities'), orderByChild('name'),startAt("H"), limitToFirst(10));

//  get(recentPostsRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });






