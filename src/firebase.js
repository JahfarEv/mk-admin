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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);

// secondary auth for shop creation
export const secondaryAuth = getAuth(
  initializeApp(firebaseConfig, "Secondary")
);
