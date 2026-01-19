// import { useNavigate } from "react-router-dom";
// import CreateShopModal from "../components/CreateShopModal";
// import { useState } from "react";

// const shops = [
//   {
//     id: "1",
//     name: "MK Fashion - Bangalore",
//     contacts: ["+91 98765 43210", "+91 91234 56789"],
//   },
//   {
//     id: "2",
//     name: "MK Fashion - Citywalk Mumbai",
//     contacts: ["+91 98734 53710", "+91 91234 56789"],
//   },
//   {
//     id: "3",
//     name: "MK Fowntown - Angeles",
//     contacts: ["+91 98765 43210", "+91 91234 56789"],
//   },
//   {
//     id: "4",
//     name: "Miami York - York New York",
//     contacts: ["+91 98765 43210", "+91 91234 56789"],
//   },
// ];

// export default function ShopList() {
//     const [openModal, setOpenModal] = useState(false);

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
//       {/* Header - Responsive with consistent spacing */}
//       <header className="sticky top-0 z-10 bg-[var(--color-dark)] border-b border-white/10 backdrop-blur-sm bg-opacity-95">
//         <div className="px-4 py-4 sm:px-6 md:px-8">
//           <p className="text-xs sm:text-sm tracking-widest text-gray-400 font-medium">
//             MK FASHION ADMIN
//           </p>
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">
//             ALL SHOPS LIST PAGE
//           </h2>
//         </div>

//         {/* Optional: Search/Filter for larger screens */}
//         <div className="hidden sm:block px-4 pb-4 sm:px-6 md:px-8">
//           <div className="max-w-md">
//             <input
//               type="text"
//               placeholder="Search shops..."
//               className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
//             />
//           </div>
//         </div>
//       </header>

//       {/* Main Content - Responsive layout */}
//       <main className="flex-1 overflow-y-auto">
//         <div className="px-4 py-6 sm:px-6 md:px-8">
//           {/* Stats Bar - Visible on larger screens */}
//           <div className="hidden sm:flex items-center justify-between mb-6 p-4 bg-[var(--color-panel)] rounded-xl border border-white/10">
//             <div className="flex items-center gap-6">
//               <div>
//                 <p className="text-sm text-gray-400">Total Shops</p>
//                 <p className="text-xl font-bold">{shops.length}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Active</p>
//                 <p className="text-xl font-bold">{shops.length}</p>
//               </div>
//             </div>
//             <button className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"   onClick={() => setOpenModal(true)}
// >
//               + Add New Shop
//             </button>
//           </div>

//           {/* Shop Cards Grid - Responsive columns */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//             {shops.map((shop) => (
//               <div
//                 key={shop.id}
//                 className="bg-[var(--color-panel)] rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 cursor-pointer"
//                 onClick={() => navigate(`/shops/${shop.id}`)}
//               >
//                 {/* Shop Header with ID */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-xs text-gray-400">Active</span>
//                     </div>
//                     <h3 className="text-base md:text-lg font-semibold truncate">
//                       {shop.name}
//                     </h3>
//                   </div>
//                   <span className="text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)] px-2 py-1 rounded-full ml-2 flex-shrink-0">
//                     #{shop.id}
//                   </span>
//                 </div>

//                 {/* Contacts Section */}
//                 <div className="mb-5">
//                   <p className="text-xs text-gray-400 mb-2">CONTACTS</p>
//                   <div className="space-y-2">
//                     {shop.contacts.map((phone, i) => {
//                       const isInternational = phone.startsWith('+1');
//                       return (
//                         <div
//                           key={i}
//                           className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigator.clipboard.writeText(phone);
//                           }}
//                         >
//                           <span className="text-[var(--color-gold)] text-base">
//                             {isInternational ? "🌐" : "📞"}
//                           </span>
//                           <span className="text-sm font-medium truncate">{phone}</span>
//                           <span className="ml-auto text-xs text-gray-400">Tap to copy</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate(`/shops/${shop.id}`);
//                   }}
//                   className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/90 text-black py-3 rounded-lg font-semibold transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
//                 >
//                   <span>VIEW SHOP</span>
//                   <span className="text-lg">→</span>
//                 </button>

//                 {/* Additional Info - Desktop only */}
//                 <div className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
//                   <span>Last order: 2h ago</span>
//                   <span className="flex items-center gap-1">
//                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                     Online
//                   </span>
//                 </div>
//               </div>
//             ))}

//             {/* Add New Shop Card - Desktop only */}
//             <div className="hidden lg:block"   onClick={() => setOpenModal(true)}
// >
//               <div className="bg-[var(--color-panel)] rounded-2xl p-5 border-2 border-dashed border-white/10 hover:border-[var(--color-gold)]/50 transition-colors h-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer">
//                 <div className="text-4xl mb-3">+</div>
//                 <p className="text-lg font-semibold">Add New Shop</p>
//                 <p className="text-sm text-gray-400 mt-2 text-center">
//                   Expand your network
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Empty State */}
//           {shops.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-6">🏪</div>
//               <h3 className="text-2xl font-semibold mb-3">No shops available</h3>
//               <p className="text-gray-400 mb-8">Add your first shop to get started</p>
//               <button className="bg-[var(--color-gold)] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold)]/90 transition-colors">
//                 + Create First Shop
//               </button>
//             </div>
//           )}

//           {/* Load More - Desktop only */}
//           {shops.length > 0 && (
//             <div className="hidden md:flex justify-center mt-8">
//               <button className="border border-white/20 hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors">
//                 Load More Shops
//               </button>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Mobile Bottom Navigation */}
//       <nav className="sticky bottom-0 bg-[var(--color-panel)] border-t border-white/10 sm:hidden">
//         <div className="flex items-center justify-around p-2">
//           <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
//             <span className="text-xl">🏠</span>
//             <span className="text-xs mt-1">Home</span>
//           </button>
//           <button className="flex flex-col items-center p-3 text-[var(--color-gold)]">
//             <span className="text-xl">🏪</span>
//             <span className="text-xs mt-1">Shops</span>
//           </button>
//           <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
//             <span className="text-xl">📊</span>
//             <span className="text-xs mt-1">Stats</span>
//           </button>
//           <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
//             <span className="text-xl">⚙️</span>
//             <span className="text-xs mt-1">More</span>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Floating Action Button */}
//       <button className="fixed bottom-20 right-4 sm:hidden bg-[var(--color-gold)] text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 z-20"   onClick={() => setOpenModal(true)}
// >
//         +
//       </button>

//       {/* Responsive Padding Helper */}
//       <div className="h-4 sm:h-6 md:h-8"></div>
//       <CreateShopModal
//   open={openModal}
//   onClose={() => setOpenModal(false)}
//   onSubmit={(data) => {
//     console.log("New shop data:", data);
//     // 🔥 Later: Save to Firestore
//   }}
// />

//     </div>
//   );
// }

// import { useNavigate } from "react-router-dom";
// import CreateShopModal from "../components/CreateShopModal";
// import { useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { ref, get, set, child } from "firebase/database";
// import { auth, rtdb, secondaryAuth } from "../firebase";

// export default function ShopList() {
//   const [openModal, setOpenModal] = useState(false);
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);

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
//         }));

//         setShops(shopsData);
//       } else {
//         setShops([]);
//       }
//     } catch (error) {
//       console.error("Error fetching shops:", error);
//       setShops([]);
//     } finally {
//       setLoading(false);
//     }
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
//         shop.password
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
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

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
      
//         <div className="px-4 py-4 sm:px-6 md:px-8">
//           <p className="text-xs sm:text-sm tracking-widest text-gray-400 font-medium">
//             MK FASHION ADMIN
//           </p>
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">
//             ALL SHOPS
//           </h2>
//         </div>
//    <div className="flex items-center gap-3 mb-4 mx-3">
//         <button onClick={() => navigate(-1)}>←</button>
//         <h2 className="text-lg">Home</h2>
//       </div>
//         <div className="hidden sm:block px-4 pb-4 sm:px-6 md:px-8">
//           <div className="max-w-md">
//             <input
//               type="text"
//               placeholder="Search shops..."
//               className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
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
//                 <p className="text-sm text-gray-400">Active</p>
//                 <p className="text-xl font-bold">{shops.length}</p>
//               </div>
//             </div>
//             <button
//               className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
//               onClick={() => setOpenModal(true)}
//             >
//               + Add New Shop
//             </button>
//           </div>

//           {/* Shop Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//             {shops.map((shop) => (
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
//                         key={i}
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
//                         </span>
//                         <span className="ml-auto text-xs text-gray-400">
//                           Tap to copy
//                         </span>
//                       </div>
//                     ))}
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
//           </div>
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
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, get, set, child } from "firebase/database";
import { auth, rtdb, secondaryAuth } from "../firebase";

export default function ShopList() {
  const [openModal, setOpenModal] = useState(false);
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH SHOPS (RTDB) ================= */
  const fetchShops = async () => {
    try {
      const snapshot = await get(child(ref(rtdb), "shops"));

      if (snapshot.exists()) {
        const data = snapshot.val();

        const shopsData = Object.keys(data).map((uid) => ({
          id: uid, // UID
          name: data[uid].place,
          contacts: data[uid].phone ? [data[uid].phone] : [],
          email: data[uid].email || "",
        }));

        setShops(shopsData);
        setFilteredShops(shopsData); // Initialize filtered shops
      } else {
        setShops([]);
        setFilteredShops([]);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
      setShops([]);
      setFilteredShops([]);
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
    
    const filtered = shops.filter(shop => {
      // Search in shop name (place)
      const shopName = shop.name?.toLowerCase() || "";
      
      // Search in contacts (phone numbers)
      const hasMatchingContact = shop.contacts.some(contact => 
        contact.toLowerCase().includes(searchTerm)
      );
      
      // Search in email
      const shopEmail = shop.email?.toLowerCase() || "";
      
      return (
        shopName.includes(searchTerm) ||
        hasMatchingContact ||
        shopEmail.includes(searchTerm)
      );
    });

    setFilteredShops(filtered);
  };

  /* ================= CREATE SHOP (RTDB) ================= */
  const handleCreateShop = async (shop) => {
    try {
      const email =
        "shop_" +
        shop.place.toLowerCase().replace(/\s+/g, "_") +
        "@mkfashion.com";

      // ✅ Create shop auth user
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        shop.password
      );

      const uid = userCredential.user.uid;

      // ✅ Save shop in Realtime Database
      await set(ref(rtdb, "shops/" + uid), {
        place: shop.place,
        phone: shop.phone || "",
        email,
        role: "shop",
        createdAt: Date.now(),
      });

      alert("Shop created successfully ✅");
      setOpenModal(false);
      fetchShops();
    } catch (error) {
      alert(error.message);
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

  /* ================= UPDATE FILTERED SHOPS WHEN SHOPS CHANGE ================= */
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
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading shops...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--color-dark)] border-b border-white/10 backdrop-blur-sm bg-opacity-95">
        <div className="px-4 py-4 sm:px-6 md:px-8">
          <p className="text-xs sm:text-sm tracking-widest text-gray-400 font-medium">
            MK FASHION ADMIN
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1">
            ALL SHOPS
          </h2>
        </div>
        <div className="flex items-center gap-3 mb-4 mx-3">
          <button onClick={() => navigate(-1)}>←</button>
          <h2 className="text-lg">Home</h2>
        </div>
        
        {/* Search Bar - Now visible on all screens */}
        <div className="px-4 pb-4 sm:px-6 md:px-8">
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search shops by name, phone, or email..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {/* Search results info */}
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-400">
                Found {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="hidden sm:flex items-center justify-between mb-6 p-4 bg-[var(--color-panel)] rounded-xl border border-white/10">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-400">Total Shops</p>
                <p className="text-xl font-bold">{shops.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Showing</p>
                <p className="text-xl font-bold">{filteredShops.length}</p>
              </div>
              {searchQuery && (
                <div>
                  <p className="text-sm text-gray-400">Search Results</p>
                  <p className="text-xl font-bold text-[var(--color-gold)]">
                    "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
            <button
              className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
              onClick={() => setOpenModal(true)}
            >
              + Add New Shop
            </button>
          </div>

          {/* Mobile Stats */}
          <div className="sm:hidden flex items-center justify-between mb-6 p-4 bg-[var(--color-panel)] rounded-xl border border-white/10">
            <div>
              <p className="text-sm text-gray-400">Total Shops</p>
              <p className="text-xl font-bold">{shops.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Showing</p>
              <p className="text-xl font-bold">{filteredShops.length}</p>
            </div>
            <button
              className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold)]/80 transition-colors"
              onClick={() => setOpenModal(true)}
            >
              + Add Shop
            </button>
          </div>

          {/* No Results Message */}
          {filteredShops.length === 0 && shops.length > 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No shops found</h3>
              <p className="text-gray-400">
                No shops match "{searchQuery}". Try a different search term.
              </p>
              <button
                className="mt-4 text-[var(--color-gold)] hover:text-[var(--color-gold)]/80"
                onClick={() => {
                  setSearchQuery("");
                  setFilteredShops(shops);
                }}
              >
                Clear search
              </button>
            </div>
          )}

          {/* Shop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-[var(--color-panel)] rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 cursor-pointer"
                onClick={() => navigate(`/shops/${shop.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400">Active</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold truncate">
                      {shop.name}
                      {/* Highlight search term in shop name */}
                      {searchQuery && shop.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                        <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
                          Match
                        </span>
                      )}
                    </h3>
                  </div>
                  <span className="text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)] px-2 py-1 rounded-full ml-2 flex-shrink-0">
                    #{shop.id.slice(0, 5)}
                  </span>
                </div>

                <div className="mb-5">
                  {/* CONTACTS Section */}
                  <p className="text-xs text-gray-400 mb-2">CONTACTS</p>
                  <div className="space-y-2">
                    {/* Phone Contacts */}
                    {shop.contacts.map((phone, i) => (
                      <div
                        key={`phone-${i}`}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(phone);
                        }}
                      >
                        <span className="text-[var(--color-gold)] text-base">
                          📞
                        </span>
                        <span className="text-sm font-medium truncate">
                          {phone}
                          {/* Highlight search term in phone */}
                          {searchQuery && phone.toLowerCase().includes(searchQuery.toLowerCase()) && (
                            <span className="ml-1 text-xs bg-blue-500/20 text-blue-400 px-1 rounded">
                              match
                            </span>
                          )}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">
                          Tap to copy
                        </span>
                      </div>
                    ))}

                    {/* Email Contact */}
                    {shop.email && (
                      <div
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(shop.email);
                        }}
                      >
                        <span className="text-[var(--color-gold)] text-base">
                          ✉️
                        </span>
                        <span className="text-sm font-medium truncate">
                          {shop.email}
                          {/* Highlight search term in email */}
                          {searchQuery && shop.email.toLowerCase().includes(searchQuery.toLowerCase()) && (
                            <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-1 rounded">
                              match
                            </span>
                          )}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">
                          Tap to copy
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/shops/${shop.id}`);
                  }}
                  className="w-full bg-[var(--color-gold)] text-black py-3 rounded-lg font-semibold transition-colors"
                >
                  VIEW SHOP →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Button */}
      <button
        className="fixed bottom-5 right-4 sm:hidden bg-[var(--color-gold)] text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-20"
        onClick={() => setOpenModal(true)}
      >
        +
      </button>

      {/* Create Shop Modal */}
      <CreateShopModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateShop}
      />
    </div>
  );
}