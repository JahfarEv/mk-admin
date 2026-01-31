// // export default function Login() {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-black px-4">
// //       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

// //         <h1 className="text-3xl font-serif text-center text-gold mb-8">
// //           MK FASHION
// //         </h1>

// //         <input
// //           type="text"
// //           placeholder="Username"
// //           className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         <button className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide">
// //           LOGIN
// //         </button>

// //         <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
// //           Forgot Password?
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useState } from "react";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../firebase";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       setError("Please enter email and password");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       alert("Login successful ✅");
// //     } catch (err) {
// //       setError("Invalid email or password");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-black px-4">
// //       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

// //         <h1 className="text-3xl font-serif text-center text-gold mb-8">
// //           MK FASHION
// //         </h1>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         {error && (
// //           <p className="text-red-400 text-sm mb-3 text-center">
// //             {error}
// //           </p>
// //         )}

// //         <button
// //           onClick={handleLogin}
// //           disabled={loading}
// //           className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide disabled:opacity-60"
// //         >
// //           {loading ? "Logging in..." : "LOGIN"}
// //         </button>

// //         <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
// //           Forgot Password?
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }





// // import { useState, useEffect } from "react";
// // import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";
// // import { auth } from "../firebase";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const navigate = useNavigate();

// //   // Redirect if already logged in
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         navigate("/dashboard", { replace: true });
// //         console.log(user);
        
// //       }
// //     });
// //     return () => unsubscribe();
// //   }, [navigate]);

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       setError("Please enter email and password");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       navigate("/dashboard", { replace: true });
// //     } catch (err) {
// //       setError("Invalid email or password");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-black px-4">
// //       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

// //         <h1 className="text-3xl font-serif text-center text-gold mb-8">
// //           MK FASHION
// //         </h1>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
// //         />

// //         {error && (
// //           <p className="text-red-400 text-sm mb-3 text-center">
// //             {error}
// //           </p>
// //         )}

// //         <button
// //           onClick={handleLogin}
// //           disabled={loading}
// //           className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide disabled:opacity-60"
// //         >
// //           {loading ? "Logging in..." : "LOGIN"}
// //         </button>

// //         <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
// //           Forgot Password?
// //         </p>

// //       </div>
// //     </div>
// //   );
// // }






// import { useState, useEffect } from "react";
// import {
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { ref, get, set } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// import { auth, rtdb } from "../firebase";

// /* ================= ADMIN EMAIL WHITELIST ================= */
// const ADMIN_EMAILS = ["mkmenswearblr@gmail.com"];

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [info, setInfo] = useState("");

//   const navigate = useNavigate();

//   /* ================= AUTO LOGIN (REFRESH PROTECTION) ================= */
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) return;

//       // ❌ Block non-admin users
//       if (!ADMIN_EMAILS.includes(user.email)) {
//         await signOut(auth);
//         return;
//       }

//       const userRef = ref(rtdb, `users/${user.uid}`);
//       const snap = await get(userRef);

//       // ✅ Auto-create admin role on first login
//       if (!snap.exists()) {
//         await set(userRef, {
//           role: "admin",
//           email: user.email,
//           createdAt: Date.now(),
//         });
//       }

//       navigate("/dashboard", { replace: true });
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   /* ================= LOGIN ================= */
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setInfo("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const user = userCredential.user;

//       // ❌ Block shop / other users
//       if (!ADMIN_EMAILS.includes(user.email)) {
//         await signOut(auth);
//         setError("Access denied. Admin only.");
//         return;
//       }

//       const userRef = ref(rtdb, `users/${user.uid}`);
//       const snap = await get(userRef);

//       // ✅ Create admin node if missing
//       if (!snap.exists()) {
//         await set(userRef, {
//           role: "admin",
//           email: user.email,
//           createdAt: Date.now(),
//         });
//       }

//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError("Invalid admin email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= FORGOT PASSWORD ================= */
//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError("Please enter your admin email first");
//       return;
//     }

//     if (!ADMIN_EMAILS.includes(email)) {
//       setError("Password reset allowed only for admin email");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setInfo("");

//       await sendPasswordResetEmail(auth, email);

//       setInfo(
//         "Password reset link sent. Please check your email (Inbox / Spam)."
//       );
//     } catch (err) {
//       setError("Failed to send password reset email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

//         {/* TITLE */}
//         <h1 className="text-3xl font-serif text-center text-gold mb-8">
//           MK ADMIN
//         </h1>

//         {/* EMAIL */}
//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-3 rounded-xl bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-3 rounded-xl bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         {/* ERROR MESSAGE */}
//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center">
//             {error}
//           </p>
//         )}

//         {/* INFO MESSAGE */}
//         {info && (
//           <p className="text-green-400 text-sm mb-3 text-center">
//             {info}
//           </p>
//         )}

//         {/* LOGIN BUTTON */}
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-gold text-black py-3 rounded-xl font-semibold tracking-wide disabled:opacity-60 active:scale-95 transition"
//         >
//           {loading ? "Logging in..." : "LOGIN"}
//         </button>

//         {/* FORGOT PASSWORD */}
//         <button
//           onClick={handleForgotPassword}
//           disabled={loading}
//           className="w-full text-center text-sm mt-4 text-[var(--color-gold)]"
//         >
//           Forgot Password?
//         </button>

//         {/* FOOTER */}
//         <p className="text-center text-xs mt-4 text-gray-500">
//           Admin access only
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, rtdb } from "../firebase";

/* ================= ADMIN EMAIL WHITELIST ================= */
const ADMIN_EMAILS = [
  "mkmenswearblr@gmail.com", // ✅ your real admin email
  // "admin@mkmenswear.com"  // optional backup
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  /* ================= AUTO LOGIN / REFRESH SAFE ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      // ❌ Block non-admin emails
      if (!ADMIN_EMAILS.includes(user.email)) {
        await signOut(auth);
        return;
      }

      const userRef = ref(rtdb, `users/${user.uid}`);
      const snap = await get(userRef);

      // ✅ AUTO-RECREATE ADMIN IF DELETED
      if (!snap.exists()) {
        await set(userRef, {
          role: "admin",
          email: user.email,
          createdAt: Date.now(),
        });
      }

      // ✅ FINAL SAFETY CHECK
      const roleSnap = await get(userRef);
      if (roleSnap.val()?.role !== "admin") {
        await signOut(auth);
        return;
      }

      navigate("/dashboard", { replace: true });
    });

    return () => unsubscribe();
  }, [navigate]);

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      setError("Access denied. Admin only.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const userRef = ref(rtdb, `users/${user.uid}`);
      const snap = await get(userRef);

      // ✅ CREATE ADMIN NODE IF MISSING
      if (!snap.exists()) {
        await set(userRef, {
          role: "admin",
          email: user.email,
          createdAt: Date.now(),
        });
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid admin email or password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your admin email first");
      return;
    }

    if (!ADMIN_EMAILS.includes(email)) {
      setError("Password reset allowed only for admin email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setInfo("");

      await sendPasswordResetEmail(auth, email);

      setInfo(
        "Password reset link sent. Please check your email (Inbox / Spam)."
      );
    } catch (err) {
      setError("Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

        {/* TITLE */}
        <h1 className="text-3xl font-serif text-center text-gold mb-8">
          MK ADMIN
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
        />

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* INFO */}
        {info && (
          <p className="text-green-400 text-sm mb-3 text-center">
            {info}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gold text-black py-3 rounded-xl font-semibold tracking-wide disabled:opacity-60 active:scale-95 transition"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {/* FORGOT PASSWORD */}
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full text-center text-sm mt-4 text-[var(--color-gold)]"
        >
          Forgot Password?
        </button>

        <p className="text-center text-xs mt-4 text-gray-500">
          Admin access only
        </p>
      </div>
    </div>
  );
}
