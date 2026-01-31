// import { Navigate } from "react-router-dom";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, rtdb } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // ❌ Not logged in
      if (!user) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      try {
        // 🔐 Check admin role in RTDB
        const userRef = ref(rtdb, `users/${user.uid}`);
        const snap = await get(userRef);

        // ❌ No admin record OR role is not admin
        if (!snap.exists() || snap.val()?.role !== "admin") {
          await signOut(auth); // force logout
          setAllowed(false);
        } else {
          setAllowed(true);
        }
      } catch (error) {
        await signOut(auth); // fail-safe
        setAllowed(false);
      } finally {
        setChecking(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ⏳ While checking */
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Checking access...
      </div>
    );
  }

  /* 🚫 Block access */
  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  /* ✅ Admin allowed */
  return children;
}
