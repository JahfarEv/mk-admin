// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAM8oPKKJ-dIKANGOzjpRSkvqoQfZevAM0",
//   authDomain: "mk-fasion.firebaseapp.com",
//   projectId: "mk-fasion",
//   storageBucket: "mk-fasion.firebasestorage.app",
//   messagingSenderId: "9900303904",
//   appId: "1:9900303904:web:09083a183ca3930651be45",
//   measurementId: "G-H3P60Z7ER3"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app); // Admin auth
// export const db = getFirestore(app);

// // ✅ SECONDARY AUTH (for creating shops)
// export const secondaryAuth = getAuth(
//   initializeApp(firebaseConfig, "Secondary")
// );


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAM8oPKKJ-dIKANGOzjpRSkvqoQfZevAM0",
  authDomain: "mk-fasion.firebaseapp.com",
  databaseURL: "https://mk-fasion-default-rtdb.firebaseio.com",
  projectId: "mk-fasion",
  storageBucket: "mk-fasion.firebasestorage.app",
  messagingSenderId: "9900303904",
  appId: "1:9900303904:web:09083a183ca3930651be45",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);

// secondary auth for shop creation
export const secondaryAuth = getAuth(
  initializeApp(firebaseConfig, "Secondary")
);
