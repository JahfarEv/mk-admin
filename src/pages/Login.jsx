// export default function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

//         <h1 className="text-3xl font-serif text-center text-gold mb-8">
//           MK FASHION
//         </h1>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         <button className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide">
//           LOGIN
//         </button>

//         <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
//           Forgot Password?
//         </p>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError("Please enter email and password");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Login successful ✅");
//     } catch (err) {
//       setError("Invalid email or password");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black px-4">
//       <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

//         <h1 className="text-3xl font-serif text-center text-gold mb-8">
//           MK FASHION
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
//         />

//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center">
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "LOGIN"}
//         </button>

//         <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
//           Forgot Password?
//         </p>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
        console.log(user);
        
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm bg-panel text-white rounded-3xl p-6 shadow-xl">

        <h1 className="text-3xl font-serif text-center text-gold mb-8">
          MK FASHION
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-transparent border border-gold/40 focus:outline-none focus:border-gold"
        />

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gold text-black py-3 rounded-lg font-semibold tracking-wide disabled:opacity-60"
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-400 cursor-pointer">
          Forgot Password?
        </p>

      </div>
    </div>
  );
}
