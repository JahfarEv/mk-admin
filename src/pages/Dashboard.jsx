// import { useNavigate } from "react-router-dom";
// import CreateShopModal from "../components/CreateShopModal";
// import { useState } from "react";
// import { signOut } from "firebase/auth";
// // import { auth } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
// import { auth, db, secondaryAuth } from "../firebase";


// export default function Dashboard() {
//   const [openModal, setOpenModal] = useState(false);
// const [openMenu, setOpenMenu] = useState(false);
// const navigate = useNavigate();

// const handleLogout = async () => {
//   await signOut(auth);
//   navigate("/", { replace: true });
// };
// // const handleCreateShop = async (shop) => {
// //   try {
// //     // Generate email from shop place
// //     const email =
// //       "shop_" +
// //       shop.place.toLowerCase().replace(/\s+/g, "_") +
// //       "@mkfashion.com";

// //     // Create Firebase Auth user
// //     const userCredential = await createUserWithEmailAndPassword(
// //       auth,
// //       email,
// //       shop.password
// //     );

// //     // Save shop data to Firestore
// //     await addDoc(collection(db, "shops"), {
// //       uid: userCredential.user.uid,
// //       place: shop.place,
// //       phone: shop.phone,
// //       email,
// //       role: "shop",
// //       createdAt: serverTimestamp(),
// //     });

// //     alert("Shop created successfully ✅");

// //   } catch (error) {
// //     alert(error.message);
// //   }
// // };

// const handleCreateShop = async (shop) => {
//   try {
//     const email =
//       "shop_" +
//       shop.place.toLowerCase().replace(/\s+/g, "_") +
//       "@mkfashion.com";

//     // ✅ Create shop user WITHOUT logging out admin
//     const userCredential = await createUserWithEmailAndPassword(
//       secondaryAuth,
//       email,
//       shop.password
//     );

//     await setDoc(doc(db, "shops", userCredential.user.uid), {
//       place: shop.place,
//       phone: shop.phone,
//       email,
//       role: "shop",
//       createdAt: serverTimestamp(),
//     });

//     alert("Shop created successfully ✅");
//     setOpenModal(false);
//     fetchShops();

//   } catch (error) {
//     alert(error.message);
//   }
// };



//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 relative">
//   <h2 className="text-sm tracking-widest text-gray-300">
//     MK FASHION ADMIN
//   </h2>

//   <div className="relative">
//     <span
//       className="text-xl cursor-pointer select-none"
//       onClick={() => setOpenMenu(!openMenu)}
//     >
//       ⋯
//     </span>

//     {openMenu && (
//       <div className="absolute right-0 mt-2 w-32 bg-black border border-gold/40 rounded-lg shadow-lg z-50">
//         <button
//           onClick={handleLogout}
//           className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gold hover:text-black rounded-lg"
//         >
//           Logout
//         </button>
//       </div>
//     )}
//   </div>
// </div>


//       {/* CENTER CONTENT */}
//       <div className="flex-1 flex flex-col justify-center items-center px-4">
//         {/* Cards */}
//         <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
//           {/* Create Shop */}
//           <div
//             className="bg-[var(--color-gold)] text-black rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg"
//             onClick={() => setOpenModal(true)}
//           >
//             <span className="text-3xl mb-2">+</span>
//             <p className="font-semibold text-center">CREATE NEW SHOP</p>
//           </div>

//           {/* Shops */}
//           <div
//             onClick={() => navigate("/shops")}
//             className="bg-[var(--color-panel)] rounded-2xl p-6 flex flex-col items-center justify-center border border-[var(--color-gold)]/30
//              cursor-pointer hover:bg-white/5 active:scale-95 transition-all"
//           >
//             <span className="text-3xl mb-2">👜</span>
//             <p className="font-semibold">SHOPS</p>
//           </div>
//         </div>

//         {/* Footer Text */}
//         <p className="text-gray-400 mt-10">Welcome, Admin!</p>
//       </div>
//      <CreateShopModal
//   open={openModal}
//   onClose={() => setOpenModal(false)}
//   onSubmit={handleCreateShop}
// />
// cod
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";
// import CreateShopModal from "../components/CreateShopModal";
// import { useState } from "react";
// import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db, secondaryAuth } from "../firebase";

// export default function Dashboard() {
//   const [openModal, setOpenModal] = useState(false);
//   const [openMenu, setOpenMenu] = useState(false);

//   const navigate = useNavigate();

//   /* ================= LOGOUT ================= */
//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/", { replace: true });
//   };

//   /* ================= CREATE SHOP ================= */
//  const handleCreateShop = async (shop) => {
//   try {
//     console.log("SHOP DATA RECEIVED 👉", shop);

//     const email =
//       "shop_" +
//       shop.place.toLowerCase().replace(/\s+/g, "_") +
//       "@mkfashion.com";

//     // ✅ 1️⃣ CREATE SHOP USER WITH SECONDARY AUTH
//     const userCredential = await createUserWithEmailAndPassword(
//       secondaryAuth,   // ✅ CORRECT
//       email,
//       shop.password
//     );

//     const uid = userCredential.user.uid;
//     console.log("NEW SHOP UID 👉", uid);

//     // ✅ 2️⃣ SAVE SHOP DATA IN FIRESTORE
//     await setDoc(doc(db, "shops", uid), {
//       shopName: shop.shopName,
//       email,
//       phone: shop.phone,
//       place: shop.place,
//       role: "shop",
//       status: "active",
//       createdAt: serverTimestamp(),
//     });

//     console.log("✅ SHOP DATA SAVED IN FIRESTORE");

//     // ✅ 3️⃣ LOGOUT SHOP USER FROM SECONDARY AUTH
//     await signOut(secondaryAuth);

//   } catch (error) {
//     console.error("❌ CREATE SHOP ERROR:", error);
//   }
// };

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">

//       {/* ================= HEADER ================= */}
//       <div className="flex justify-between items-center p-4 relative">
//         <h2 className="text-sm tracking-widest text-gray-300">
//           MK FASHION ADMIN
//         </h2>

//         <div className="relative">
//           <span
//             className="text-xl cursor-pointer select-none"
//             onClick={() => setOpenMenu(!openMenu)}
//           >
//             ⋯
//           </span>

//           {openMenu && (
//             <div className="absolute right-0 mt-2 w-32 bg-black border border-gold/40 rounded-lg shadow-lg z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gold hover:text-black rounded-lg"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= CENTER CONTENT ================= */}
//       <div className="flex-1 flex flex-col justify-center items-center px-4">

//         <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
//           {/* CREATE SHOP */}
//           <div
//             className="bg-[var(--color-gold)] text-black rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg cursor-pointer active:scale-95"
//             onClick={() => setOpenModal(true)}
//           >
//             <span className="text-3xl mb-2">+</span>
//             <p className="font-semibold text-center">
//               CREATE NEW SHOP
//             </p>
//           </div>

//           {/* SHOPS */}
//           <div
//             onClick={() => navigate("/shops")}
//             className="bg-[var(--color-panel)] rounded-2xl p-6 flex flex-col items-center justify-center border border-[var(--color-gold)]/30
//             cursor-pointer hover:bg-white/5 active:scale-95 transition-all"
//           >
//             <span className="text-3xl mb-2">👜</span>
//             <p className="font-semibold">SHOPS</p>
//           </div>
//         </div>

//         <p className="text-gray-400 mt-10">Welcome, Admin!</p>
//       </div>

//       {/* ================= CREATE SHOP MODAL ================= */}
//       <CreateShopModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSubmit={handleCreateShop}
//       />
//     </div>
//   );
// }




import { useNavigate } from "react-router-dom";
import CreateShopModal from "../components/CreateShopModal";
import { useState } from "react";
import { signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, rtdb, secondaryAuth } from "../firebase";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  /* ================= CREATE SHOP ================= */
  const handleCreateShop = async (shop) => {
    try {
      if (!shop?.place || !shop?.password) {
        alert("Place and password are required");
        return;
      }

      setLoading(true);
      console.log("🟡 SHOP DATA:", shop);

      const email =
      
        shop.place.toLowerCase().replace(/\s+/g, "_") +
        "@mkmenswear.com";

      // 1️⃣ Create shop auth account
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        shop.password
      );

      const uid = userCredential.user.uid;
      console.log("🟢 SHOP UID:", uid);

      // 2️⃣ Save shop in Realtime Database (FREE)
      await set(ref(rtdb, "shops/" + uid), {
        shopName: shop.shopName || "",
        email,
        phone: shop.phone || "",
        place: shop.place || "",
        role: "shop",
        status: "active",
        createdAt: Date.now(),
      });

      console.log("✅ SHOP SAVED IN REALTIME DATABASE");

      // 3️⃣ Logout secondary auth
      await signOut(secondaryAuth);

      alert("🎉 Shop created successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("❌ CREATE SHOP ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center p-4 relative">
        <h2 className="text-sm tracking-widest text-amber-300">
          MK MENS WEAR ADMIN
        </h2>

        <div className="relative">
          <span
            className="text-xl cursor-pointer select-none text-amber-300"
            onClick={() => setOpenMenu(!openMenu)}
          >
            ⋯
          </span>

        {openMenu && (
  <div className="absolute right-0 mt-2 w-36 bg-black border border-gold/40 rounded-lg shadow-lg z-50 overflow-hidden">

    {/* SETTINGS */}
    <button
      onClick={() => {
        setOpenMenu(false);
        navigate("/settings");
      }}
      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
    >
      ⚙️ Settings
    </button>

    <div className="h-px bg-white/10" />

    {/* LOGOUT */}
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gold hover:text-black"
    >
      🚪 Logout
    </button>
  </div>
)}

        </div>
      </div>

      {/* ================= CENTER CONTENT ================= */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {/* CREATE SHOP */}
          <button
            disabled={loading}
            onClick={() => setOpenModal(true)}
            className="bg-[var(--color-gold)] text-black rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg active:scale-95 disabled:opacity-50"
          >
            <span className="text-3xl mb-2">+</span>
            <p className="font-semibold text-center">
              CREATE NEW SHOP
            </p>
          </button>

          {/* SHOPS */}
          <button
            onClick={() => navigate("/shops")}
            className="bg-[var(--color-panel)] rounded-2xl p-6 flex flex-col items-center justify-center border border-[var(--color-gold)]/30
            hover:bg-white/5 active:scale-95 transition-all"
          >
            <span className="text-3xl mb-2">👜</span>
            <p className="font-semibold">SHOPS</p>
          </button>
        </div>

        <p className="text-gray-400 mt-10">Welcome, Admin!</p>
      </div>

      {/* ================= CREATE SHOP MODAL ================= */}
      <CreateShopModal
        open={openModal}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateShop}
      />
    </div>
  );
}
