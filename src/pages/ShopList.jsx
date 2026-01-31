// import { useNavigate } from "react-router-dom";
// import CreateShopModal from "../components/CreateShopModal";
// import { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { ref, get, set, child } from "firebase/database";
// import { auth, rtdb, secondaryAuth } from "../firebase";
// import AppHeader from "../components/AppHeader";
// import { deleteUser } from "firebase/auth";
// import { remove } from "firebase/database";

// export default function ShopList() {
//   const [openModal, setOpenModal] = useState(false);
//   const [shops, setShops] = useState([]);
//   const [filteredShops, setFilteredShops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   /* ================= FETCH SHOPS (RTDB) ================= */
//   const fetchShops = async () => {
//     try {
//       const snapshot = await get(child(ref(rtdb), "shops"));

//       if (snapshot.exists()) {
//         const data = snapshot.val();

//         const shopsData = Object.keys(data).map((uid) => ({
//           id: uid, // UID
//           name: data[uid].place,
//           contacts: data[uid].phone ? [data[uid].phone] : [],
//           email: data[uid].email || "",
//         }));

//         setShops(shopsData);
//         setFilteredShops(shopsData); // Initialize filtered shops
//       } else {
//         setShops([]);
//         setFilteredShops([]);
//       }
//     } catch (error) {
//       console.error("Error fetching shops:", error);
//       setShops([]);
//       setFilteredShops([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= SEARCH SHOPS ================= */
//   const handleSearch = (query) => {
//     setSearchQuery(query);

//     if (!query.trim()) {
//       setFilteredShops(shops);
//       return;
//     }

//     const searchTerm = query.toLowerCase().trim();

//     const filtered = shops.filter((shop) => {
//       // Search in shop name (place)
//       const shopName = shop.name?.toLowerCase() || "";

//       // Search in contacts (phone numbers)
//       const hasMatchingContact = shop.contacts.some((contact) =>
//         contact.toLowerCase().includes(searchTerm),
//       );

//       // Search in email
//       const shopEmail = shop.email?.toLowerCase() || "";

//       return (
//         shopName.includes(searchTerm) ||
//         hasMatchingContact ||
//         shopEmail.includes(searchTerm)
//       );
//     });

//     setFilteredShops(filtered);
//   };

//   /* ================= CREATE SHOP (RTDB) ================= */
//   const handleCreateShop = async (shop) => {
//     try {
//       const email =
//         "shop_" +
//         shop.place.toLowerCase().replace(/\s+/g, "_") +
//         "@mkfashion.com";

//       // ✅ Create shop auth user
//       const userCredential = await createUserWithEmailAndPassword(
//         secondaryAuth,
//         email,
//         shop.password,
//       );

//       const uid = userCredential.user.uid;

//       // ✅ Save shop in Realtime Database
//       await set(ref(rtdb, "shops/" + uid), {
//         place: shop.place,
//         phone: shop.phone || "",
//         email,
//         role: "shop",
//         createdAt: Date.now(),
//       });

//       alert("Shop created successfully ✅");
//       setOpenModal(false);
//       fetchShops();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   /* ================= AUTH-AWARE LOAD ================= */
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchShops();
//       } else {
//         setShops([]);
//         setFilteredShops([]);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

// /* ================= DELETE SHOP (PERMANENT) ================= */
// const handleDeleteShop = async (shopId, shopEmail) => {
//   const confirmDelete = window.confirm(
//     "Are you sure?\nThis shop will be deleted permanently!"
//   );

//   if (!confirmDelete) return;

//   try {
//     // 🔹 Sign in as shop user (required to delete auth user)
//     const shopUserCredential =
//       secondaryAuth.currentUser &&
//       secondaryAuth.currentUser.email === shopEmail
//         ? { user: secondaryAuth.currentUser }
//         : null;

//     if (!shopUserCredential) {
//       console.warn("Shop auth user not currently signed in.");
//     }

//     // 🔹 Remove shop data from RTDB
//     await remove(ref(rtdb, `shops/${shopId}`));

//     // 🔹 Delete auth user if available
//     if (secondaryAuth.currentUser) {
//       await deleteUser(secondaryAuth.currentUser);
//     }

//     alert("Shop deleted permanently ❌");

//     fetchShops();
//   } catch (error) {
//     console.error("Delete failed:", error);
//     alert(error.message);
//   }
// };

//   /* ================= UPDATE FILTERED SHOPS WHEN SHOPS CHANGE ================= */
//   useEffect(() => {
//     if (searchQuery) {
//       handleSearch(searchQuery);
//     } else {
//       setFilteredShops(shops);
//     }
//   }, [shops]);

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shops...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-[var(--color-dark)] border-b border-white/10 backdrop-blur-sm bg-opacity-95">
//         {/* <div className="px-4 py-4 sm:px-6 md:px-8">
//           <p className="text-xs sm:text-sm tracking-widest text-gray-400 font-medium">
//             MK FASHION ADMIN
//           </p>
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">
//             ALL SHOPS
//           </h2>
//         </div> */}

//         <AppHeader
//           title="Shops"
//           back
//           onBack={() => navigate(-1)}
//           right={
//             <button
//               className="text-[var(--color-gold)] text-lg"
//               onClick={() => setOpenModal(true)}
//             >
//               +
//             </button>
//           }
//         />

//         {/* Search Bar - Now visible on all screens */}
//         <div className="px-4 pb-4 sm:px-6 md:px-8">
//           {/* <div className="max-w-md">
//             <input
//               type="text"
//               placeholder="Search shops by name, phone, or email..."
//               className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
//               value={searchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             {searchQuery && (
//               <div className="mt-2 text-sm text-gray-400">
//                 Found {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} matching "{searchQuery}"
//               </div>
//             )}
//           </div> */}

//           <div className="p-4">
//             <input
//               type="text"
//               placeholder="Search shops"
//               className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
//               value={searchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="px-4 py-6 sm:px-6 md:px-8">
//           {/* Stats */}
//           <div className="hidden sm:flex items-center justify-between mb-6 p-4 bg-[var(--color-panel)] rounded-xl border border-white/10">
//             <div className="flex items-center gap-6">
//               <div>
//                 <p className="text-sm text-gray-400">Total Shops</p>
//                 <p className="text-xl font-bold">{shops.length}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Showing</p>
//                 <p className="text-xl font-bold">{filteredShops.length}</p>
//               </div>
//               {searchQuery && (
//                 <div>
//                   <p className="text-sm text-gray-400">Search Results</p>
//                   <p className="text-xl font-bold text-[var(--color-gold)]">
//                     "{searchQuery}"
//                   </p>
//                 </div>
//               )}
//             </div>
//             <button
//               className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
//               onClick={() => setOpenModal(true)}
//             >
//               + Add New Shop
//             </button>
//           </div>

//           {/* Mobile Stats */}
//           <div className="sm:hidden flex items-center justify-between mb-6 p-4 bg-[var(--color-panel)] rounded-xl border border-white/10">
//             <div>
//               <p className="text-sm text-gray-400">Total Shops</p>
//               <p className="text-xl font-bold">{shops.length}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-400">Showing</p>
//               <p className="text-xl font-bold">{filteredShops.length}</p>
//             </div>
//             <button
//               className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
//               onClick={() => setOpenModal(true)}
//             >
//               + Add Shop
//             </button>
//           </div>

//           {/* No Results Message */}
//           {filteredShops.length === 0 && shops.length > 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-4xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold mb-2">No shops found</h3>
//               <p className="text-gray-400">
//                 No shops match "{searchQuery}". Try a different search term.
//               </p>
//               <button
//                 className="mt-4 text-[var(--color-gold)] hover:text-[var(--color-gold)]/80"
//                 onClick={() => {
//                   setSearchQuery("");
//                   setFilteredShops(shops);
//                 }}
//               >
//                 Clear search
//               </button>
//             </div>
//           )}

//           {/* Shop Grid */}
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"> */}
//           <div className="space-y-3">
//             {filteredShops.map((shop) => (
//               <div
//   key={shop.id}
//   onClick={() => navigate(`/shops/${shop.id}`)}
//   onContextMenu={(e) => {
//     e.preventDefault();
//     handleDeleteShop(shop.id, shop.email);
//   }}
//   className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10
//    active:scale-95 transition-transform"
// >

//                 <div className="flex items-center justify-between">
//                   {/* LEFT SIDE */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-base font-semibold truncate">
//                       {shop.name}
//                     </h3>

//                     {shop.email && (
//                       <p className="text-xs text-gray-400 truncate mt-1">
//                         {shop.email}
//                       </p>
//                     )}

//                     {shop.contacts[0] && (
//                       <p className="text-xs text-gray-400 mt-1">
//                         📞 {shop.contacts[0]}
//                       </p>
//                     )}
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="flex flex-col items-end ml-3">
//                     <span className="text-xs text-gray-400 mb-1">
//                       #{shop.id.slice(0, 5)}
//                     </span>
//                     <span className="text-[var(--color-gold)] text-lg">›</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* <div className="space-y-4">

//             {filteredShops.map((shop) => (
//               <div
//                 key={shop.id}
//                 className="bg-[var(--color-panel)] rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 cursor-pointer"
//                 onClick={() => navigate(`/shops/${shop.id}`)}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-xs text-gray-400">Active</span>
//                     </div>
//                     <h3 className="text-base md:text-lg font-semibold truncate">
//                       {shop.name}
//                       {searchQuery && shop.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
//                         <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
//                           Match
//                         </span>
//                       )}
//                     </h3>
//                   </div>
//                   <span className="text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)] px-2 py-1 rounded-full ml-2 flex-shrink-0">
//                     #{shop.id.slice(0, 5)}
//                   </span>
//                 </div>

//                 <div className="mb-5">
//                   <p className="text-xs text-gray-400 mb-2">CONTACTS</p>
//                   <div className="space-y-2">
//                     {shop.contacts.map((phone, i) => (
//                       <div
//                         key={`phone-${i}`}
//                         className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigator.clipboard.writeText(phone);
//                         }}
//                       >
//                         <span className="text-[var(--color-gold)] text-base">
//                           📞
//                         </span>
//                         <span className="text-sm font-medium truncate">
//                           {phone}
//                           {searchQuery && phone.toLowerCase().includes(searchQuery.toLowerCase()) && (
//                             <span className="ml-1 text-xs bg-blue-500/20 text-blue-400 px-1 rounded">
//                               match
//                             </span>
//                           )}
//                         </span>
//                         <span className="ml-auto text-xs text-gray-400">
//                           Tap to copy
//                         </span>
//                       </div>
//                     ))}

//                     {shop.email && (
//                       <div
//                         className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           navigator.clipboard.writeText(shop.email);
//                         }}
//                       >
//                         <span className="text-[var(--color-gold)] text-base">
//                           ✉️
//                         </span>
//                         <span className="text-sm font-medium truncate">
//                           {shop.email}
//                           {searchQuery && shop.email.toLowerCase().includes(searchQuery.toLowerCase()) && (
//                             <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-1 rounded">
//                               match
//                             </span>
//                           )}
//                         </span>
//                         <span className="ml-auto text-xs text-gray-400">
//                           Tap to copy
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/shops/${shop.id}`);
//                   }}
//                   className="w-full bg-[var(--color-gold)] text-black py-3 rounded-lg font-semibold transition-colors"
//                 >
//                   VIEW SHOP →
//                 </button>
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </main>

//       {/* Floating Button */}
//       <button
//         className="fixed bottom-5 right-4 sm:hidden bg-[var(--color-gold)] text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-20"
//         onClick={() => setOpenModal(true)}
//       >
//         +
//       </button>

//       {/* Create Shop Modal */}
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
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, get, set, child } from "firebase/database";
import { auth, rtdb, secondaryAuth } from "../firebase";
import AppHeader from "../components/AppHeader";

export default function ShopList() {
  const [openModal, setOpenModal] = useState(false);
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
    title: "",
    confirmText: "OK",
    cancelText: "Cancel",
    onConfirm: null,
    onCancel: null,
  });

  const navigate = useNavigate();

  // Sweet Alert Component
  const SweetAlert = () => {
    if (!alert.show) return null;

    const alertConfig = {
      success: {
        bgColor: "bg-green-500/90",
        icon: "✅",
        titleColor: "text-green-100",
        buttonBg: "bg-green-600 hover:bg-green-700",
        iconBg: "bg-green-100",
      },
      error: {
        bgColor: "bg-red-500/90",
        icon: "❌",
        titleColor: "text-red-100",
        buttonBg: "bg-red-600 hover:bg-red-700",
        iconBg: "bg-red-100",
      },
      warning: {
        bgColor: "bg-yellow-500/90",
        icon: "⚠️",
        titleColor: "text-yellow-100",
        buttonBg: "bg-yellow-600 hover:bg-yellow-700",
        iconBg: "bg-yellow-100",
      },
      info: {
        bgColor: "bg-blue-500/90",
        icon: "ℹ️",
        titleColor: "text-blue-100",
        buttonBg: "bg-blue-600 hover:bg-blue-700",
        iconBg: "bg-blue-100",
      },
    };

    const config = alertConfig[alert.type] || alertConfig.info;

    const handleConfirm = () => {
      if (alert.onConfirm) alert.onConfirm();
      setAlert({ ...alert, show: false });
    };

    const handleCancel = () => {
      if (alert.onCancel) alert.onCancel();
      setAlert({ ...alert, show: false });
    };

    const handleClose = () => {
      setAlert({ ...alert, show: false });
      if (alert.onCancel) alert.onCancel();
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
        <div
          className="absolute inset-0 bg-black/60"
          onClick={handleClose}
        ></div>

        <div
          className={`relative w-full max-w-sm md:max-w-md rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 animate-scaleIn`}
        >
          <div className={`${config.bgColor} p-5 text-center relative`}>
            <div className="absolute  left-1/2 transform -translate-x-1/2">
              <div
                className={`w-16 h-16 rounded-full ${config.iconBg} flex items-center justify-center text-2xl shadow-lg`}
              >
                {config.icon}
              </div>
            </div>
            <h2 className={`text-xl font-bold mt-16 mb-2 ${config.titleColor}`}>
              {alert.title}
            </h2>
          </div>

          <div className="bg-white p-6">
            <p className="text-gray-800 text-center text-sm md:text-base mb-6 leading-relaxed">
              {alert.message}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {alert.onCancel && (
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
                >
                  {alert.cancelText}
                </button>
              )}
              <button
                onClick={handleConfirm}
                className={`flex-1 px-4 py-3 ${config.buttonBg} text-white font-semibold rounded-xl active:scale-95 transition-all duration-200`}
              >
                {alert.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show sweet alert function
  const showSweetAlert = (title, message, type = "info", options = {}) => {
    const {
      confirmText = "OK",
      cancelText = "Cancel",
      onConfirm = null,
      onCancel = null,
    } = options;

    setAlert({
      show: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
    });
  };

  // Toast notification
  const showToast = (message, type = "info") => {
    const toast = document.createElement("div");
    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };

    toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl text-white font-medium shadow-lg animate-slideDown`;
    toast.style.backgroundColor = colors[type] || colors.info;

    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">${type === "success" ? "✅" : type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️"}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("animate-slideUp");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  /* ================= FETCH SHOPS ================= */
  const fetchShops = async () => {
    try {
      const snapshot = await get(child(ref(rtdb), "shops"));

      if (snapshot.exists()) {
        const data = snapshot.val();

        const shopsData = Object.keys(data).map((uid) => ({
          id: uid,
          name: data[uid].place,
          contacts: data[uid].phone ? [data[uid].phone] : [],
          email: data[uid].email || "",
        }));

        setShops(shopsData);
        setFilteredShops(shopsData);
      } else {
        setShops([]);
        setFilteredShops([]);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
      setShops([]);
      setFilteredShops([]);
      showToast("Failed to load shops", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEARCH SHOPS ================= */
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredShops(shops);
      return;
    }

    const searchTerm = query.toLowerCase().trim();

    const filtered = shops.filter((shop) => {
      const shopName = shop.name?.toLowerCase() || "";
      const hasMatchingContact = shop.contacts.some((contact) =>
        contact.toLowerCase().includes(searchTerm),
      );
      const shopEmail = shop.email?.toLowerCase() || "";

      return (
        shopName.includes(searchTerm) ||
        hasMatchingContact ||
        shopEmail.includes(searchTerm)
      );
    });

    setFilteredShops(filtered);
  };

  /* ================= CREATE SHOP ================= */
  const handleCreateShop = async (shop) => {
    try {
      const email =
        shop.place.toLowerCase().replace(/\s+/g, "_") +
        "@mkmenswear.com";

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        shop.password,
      );

      const uid = userCredential.user.uid;

      await set(ref(rtdb, "shops/" + uid), {
        place: shop.place,
        phone: shop.phone || "",
        email,
        role: "shop",
        createdAt: Date.now(),
      });

      showToast(`Shop "${shop.place}" created successfully!`, "success");
      setOpenModal(false);
      fetchShops();
    } catch (error) {
      showSweetAlert("Error Creating Shop", error.message, "error", {
        confirmText: "Try Again",
        onConfirm: () => setOpenModal(true),
      });
    }
  };

  /* ================= AUTH-AWARE LOAD ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchShops();
      } else {
        setShops([]);
        setFilteredShops([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ================= UPDATE FILTERED SHOPS ================= */
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setFilteredShops(shops);
    }
  }, [shops]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[var(--color-gold)]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-[var(--color-gold)] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
      <SweetAlert />

      <header className="sticky top-0 z-10 bg-[var(--color-dark)] border-b border-white/10 backdrop-blur-sm bg-opacity-95">
        <AppHeader
          title="Shops"
          back
          onBack={() => navigate(-1)}
          right={
            <button
              className="text-[var(--color-gold)] text-lg hover:scale-110 transition-transform active:scale-95"
              onClick={() => setOpenModal(true)}
            >
              +
            </button>
          }
        />

        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search shops by name, phone, or email..."
              className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-transparent transition-all placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredShops(shops);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 md:px-8">
          <div className="mb-6 p-4 bg-gradient-to-r from-[var(--color-panel)] to-[var(--color-panel)]/80 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-sm text-gray-400 mb-1">Total Shops</p>
                <p className="text-2xl font-bold">{shops.length}</p>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="text-center flex-1">
                <p className="text-sm text-gray-400 mb-1">Showing</p>
                <p className="text-2xl font-bold">{filteredShops.length}</p>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="text-center flex-1">
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-4 py-2 bg-[var(--color-gold)] text-black font-semibold rounded-lg hover:bg-[var(--color-gold)]/90 active:scale-95 transition-all"
                >
                  + New
                </button>
              </div>
            </div>
            {searchQuery && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">Search results for:</p>
                <p className="text-[var(--color-gold)] font-medium truncate">
                  "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {filteredShops.length === 0 && shops.length > 0 && (
            <div className="text-center py-12 px-4">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">No shops found</h3>
              <p className="text-gray-400 mb-6">
                No shops match "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilteredShops(shops);
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors active:scale-95"
              >
                Clear Search
              </button>
            </div>
          )}

          {shops.length === 0 && !loading && (
            <div className="text-center py-12 px-4">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">No shops yet</h3>
              <p className="text-gray-400 mb-6">
                Start by adding your first shop
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="px-6 py-3 bg-[var(--color-gold)] text-black font-semibold rounded-xl hover:bg-[var(--color-gold)]/90 active:scale-95 transition-all"
              >
                + Create First Shop
              </button>
            </div>
          )}

          <div className="space-y-3">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/shops/${shop.id}`)}
                className="bg-gradient-to-r from-[var(--color-panel)] to-[var(--color-panel)]/80 p-4 rounded-2xl border border-white/10 hover:border-[var(--color-gold)]/30 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <h3 className="text-base font-semibold truncate">
                        {shop.name}
                      </h3>
                    </div>

                    <div className="space-y-1">
                      {shop.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">📧</span>
                          <p className="text-xs text-gray-400 truncate">
                            {shop.email}
                          </p>
                        </div>
                      )}

                   
                    </div>
                  </div>

                  <div className="flex flex-col items-end ml-3">
                    {/* <span className="text-xs text-gray-400 mb-2 px-2 py-1 bg-white/5 rounded-lg">
                      ID: {shop.id.slice(0, 5)}
                    </span> */}

                       {shop.contacts[0] && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">📞</span>
                          <p className="text-xs text-gray-400">
                            {shop.contacts[0]}
                          </p>
                        </div>
                      )}
                    <span className="text-[var(--color-gold)] text-xl group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <button
        className="fixed bottom-5 right-4 sm:hidden bg-[var(--color-gold)] text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-20"
        onClick={() => setOpenModal(true)}
      >
        +
      </button>

      <CreateShopModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateShop}
      />
    </div>
  );
}