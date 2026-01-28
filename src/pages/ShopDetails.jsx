// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, get } from "firebase/database";
// import { rtdb } from "../firebase";
// import AppHeader from "../components/AppHeader";

// export default function AdminShopDetails() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shop, setShop] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH SHOP + REPORTS ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 1️⃣ Fetch shop info
//         const shopSnap = await get(ref(rtdb, `shops/${shopId}`));
//         if (!shopSnap.exists()) {
//           alert("Shop not found");
//           navigate(-1);
//           return;
//         }
//         setShop(shopSnap.val());

//         // 2️⃣ Fetch daily accounts
//         const reportSnap = await get(
//           ref(rtdb, `dailyAccounts/${shopId}`)
//         );

//         if (reportSnap.exists()) {
//           const data = reportSnap.val();

//           // Opening balance
//           setOpeningBalance(Number(data.openingBalance) || 0);
//           delete data.openingBalance;

//           // Daily rows
//           const rows = Object.keys(data).map((date) => ({
//             date,
//             cash: Number(data[date].cash) || 0,
//             market: Number(data[date].market) || 0,
//             card: Number(data[date].card) || 0,
//             expense: Number(data[date].expense) || 0,
//           }));

//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setReports(rows);
//         } else {
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setReports([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [shopId, navigate]);

//   /* ================= TOTALS ================= */
//   const totals = reports.reduce(
//     (acc, r) => {
//       acc.cash += r.cash;
//       acc.market += r.market;
//       acc.card += r.card;
//       acc.expense += r.expense;
//       return acc;
//     },
//     { cash: 0, market: 0, card: 0, expense: 0 }
//   );

//   const monthlySales =
//     totals.cash + totals.card + totals.expense;

//   const monthlyBalance =
//     openingBalance + totals.cash + totals.card - totals.market;

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shop details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">

//       {/* ✅ APP HEADER */}
//       <AppHeader
//         title="Shop Details"
//         back
//         onBack={() => navigate(-1)}
//       />

//       {/* ✅ CONTENT */}
//       <div className="flex-1 overflow-y-auto p-4 pb-24">

//         {/* SHOP INFO */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10 mb-4">
//           <h3 className="text-lg font-semibold">{shop.place}</h3>
//           <p className="text-xs text-gray-400 mt-1">
//             📧 {shop.email}
//           </p>
//           <p className="text-xs text-gray-400 mt-1">
//             📞 {shop.phone || "N/A"}
//           </p>
//         </div>

//         {/* SUMMARY */}
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           <div className="bg-white/5 p-3 rounded-lg text-center">
//             <p className="text-xs text-gray-400">Opening</p>
//             <p className="text-base font-semibold">
//               ₹{openingBalance}
//             </p>
//           </div>

//           <div className="bg-white/5 p-3 rounded-lg text-center">
//             <p className="text-xs text-gray-400">Sales</p>
//             <p className="text-base font-semibold">
//               ₹{monthlySales}
//             </p>
//           </div>

//           <div className="bg-[var(--color-gold)] text-black p-3 rounded-lg text-center">
//             <p className="text-xs">Balance</p>
//             <p className="text-base font-bold">
//               ₹{monthlyBalance}
//             </p>
//           </div>
//         </div>

//         {/* REPORTS */}
//         {reports.length === 0 ? (
//           <div className="text-center text-gray-400 mt-10">
//             No account records found
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-white/10 rounded-xl overflow-hidden">
//               <thead className="bg-white/5">
//                 <tr>
//                   <th className="p-2 text-left">DATE</th>
//                   <th className="p-2 text-right">CASH</th>
//                   <th className="p-2 text-right">MARKET</th>
//                   <th className="p-2 text-right">CARD</th>
//                   <th className="p-2 text-right">EXPENSE</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reports.map((r, i) => (
//                   <tr
//                     key={i}
//                     className="border-t border-white/10"
//                   >
//                     <td className="p-2">{r.date}</td>
//                     <td className="p-2 text-right">₹{r.cash}</td>
//                     <td className="p-2 text-right">₹{r.market}</td>
//                     <td className="p-2 text-right">₹{r.card}</td>
//                     <td className="p-2 text-right">₹{r.expense}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, get, set } from "firebase/database";
// import { rtdb } from "../firebase";
// import AppHeader from "../components/AppHeader";

// export default function AdminShopDetails() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shop, setShop] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* ================= FETCH SHOP + REPORTS ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 🔹 Fetch shop info
//         const shopSnap = await get(ref(rtdb, `shops/${shopId}`));
//         if (!shopSnap.exists()) {
//           alert("Shop not found");
//           navigate(-1);
//           return;
//         }
//         setShop(shopSnap.val());

//         // 🔹 Fetch daily accounts
//         const reportSnap = await get(
//           ref(rtdb, `dailyAccounts/${shopId}`)
//         );

//         if (reportSnap.exists()) {
//           const data = reportSnap.val();

//           // 🔹 Opening balance
//           setOpeningBalance(Number(data.openingBalance) || 0);
//           delete data.openingBalance;

//           // 🔹 Daily rows
//           const rows = Object.keys(data).map((date) => ({
//             date,
//             cash: Number(data[date].cash) || 0,
//             market: Number(data[date].market) || 0,
//             card: Number(data[date].card) || 0,
//             expense: Number(data[date].expense) || 0,
//           }));

//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setReports(rows);
//         } else {
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setReports([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [shopId, navigate]);

//   /* ================= TOTALS ================= */
//   const totals = reports.reduce(
//     (acc, r) => {
//       acc.cash += r.cash;
//       acc.market += r.market;
//       acc.card += r.card;
//       acc.expense += r.expense;
//       acc.dailyTotal += r.cash + r.card;
//       return acc;
//     },
//     { cash: 0, market: 0, card: 0, expense: 0, dailyTotal: 0 }
//   );

//   const monthlySales =
//     totals.cash + totals.card + totals.expense;

//   const monthlyBalance =
//     openingBalance + totals.cash + totals.card - totals.market;

//   /* ================= SAVE OPENING BALANCE (ADMIN) ================= */
//   const saveOpeningBalance = async () => {
//     try {
//       setSaving(true);
//       await set(
//         ref(rtdb, `dailyAccounts/${shopId}/openingBalance`),
//         Number(openingBalance)
//       );
//       alert("✅ Opening balance updated successfully");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shop details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">

//       {/* 🔹 APP HEADER */}
//       <AppHeader
//         title="Shops"
//         back
//         onBack={() => navigate(-1)}
//       />

//       {/* 🔹 CONTENT */}
//       <div className="flex-1 overflow-y-auto p-4 pb-24">

//         {/* 🔹 SHOP INFO */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10 mb-4">
//           <h3 className="text-lg font-semibold">{shop.place}</h3>
//           <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//           <p className="text-xs text-gray-400 mt-1">
//             📞 {shop.phone || "N/A"}
//           </p>
//         </div>

//        <div className="grid grid-cols-1 gap-3 mb-4 p-2">

//   {/* OPENING BALANCE SECTION */}
//   <div className="bg-white/5 px-3 py-3 rounded-xl border border-white/10">
//     <p className="text-xs text-gray-400 mb-2 font-medium">
//       Opening Balance
//     </p>

//     <div className="flex items-center gap-2">
//       <div className="relative flex-1">
//         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//           ₹
//         </span>
//         <input
//           type="number"
//           value={openingBalance}
//           onChange={(e) => setOpeningBalance(Number(e.target.value))}
//           className="w-full bg-white/10 border border-white/20 rounded-lg text-base px-3 pl-8 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
//           placeholder="0.00"
//         />
//       </div>

//       <button
//         onClick={saveOpeningBalance}
//         disabled={saving}
//         className="bg-[var(--color-gold)] text-black text-sm font-medium px-4 py-3 rounded-lg disabled:opacity-50 active:scale-95 transition-transform min-w-[70px]"
//       >
//         {saving ? "Saving..." : "Save"}
//       </button>
//     </div>

//     <p className="text-[10px] text-gray-500 mt-2 text-center">
//       Admins can edit this value
//     </p>
//   </div>

//   {/* CURRENT BALANCE SECTION */}
//   <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-black px-4 py-4 rounded-xl shadow-lg">
//     <p className="text-xs font-medium opacity-90">
//       Current Balance
//     </p>
//     <p className="text-2xl font-bold mt-2 tracking-tight">
//       ₹{monthlyBalance.toLocaleString()}
//     </p>
//     <p className="text-[10px] opacity-75 mt-1">
//       Updated in real-time
//     </p>
//   </div>

// </div>

//         {/* 🔹 REPORT TABLE */}
//         {reports.length === 0 ? (
//           <div className="text-center text-gray-400 mt-10">
//             No account records found
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-white/10 rounded-xl overflow-hidden">
//               <thead className="bg-white/5">
//                 <tr>
//                   <th className="p-2 text-left">DATE</th>
//                   <th className="p-2 text-right">CASH</th>
//                   <th className="p-2 text-right">MARKET</th>
//                   <th className="p-2 text-right">CARD</th>
//                   <th className="p-2 text-right">EXPENSE</th>
//                   <th className="p-2 text-right">DAILY TOTAL</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {reports.map((r, i) => (
//                   <tr
//                     key={i}
//                     className="border-t border-white/10"
//                   >
//                     <td className="p-2">{r.date}</td>
//                     <td className="p-2 text-right">₹{r.cash}</td>
//                     <td className="p-2 text-right">₹{r.market}</td>
//                     <td className="p-2 text-right">₹{r.card}</td>
//                     <td className="p-2 text-right">₹{r.expense}</td>
//                     <td className="p-2 text-right font-semibold">
//                       ₹{r.cash + r.card}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//               <tfoot className="bg-white/10 font-semibold">
//                 <tr>
//                   <td className="p-2">TOTAL</td>
//                   <td className="p-2 text-right">₹{totals.cash}</td>
//                   <td className="p-2 text-right">₹{totals.market}</td>
//                   <td className="p-2 text-right">₹{totals.card}</td>
//                   <td className="p-2 text-right">₹{totals.expense}</td>
//                   <td className="p-2 text-right">₹{totals.dailyTotal}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, get, set } from "firebase/database";
// import { rtdb } from "../firebase";
// import AppHeader from "../components/AppHeader";

// export default function AdminShopDetails() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shop, setShop] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   /* ================= FETCH SHOP + REPORTS ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // 🔹 Fetch shop info
//         const shopSnap = await get(ref(rtdb, `shops/${shopId}`));
//         if (!shopSnap.exists()) {
//           alert("Shop not found");
//           navigate(-1);
//           return;
//         }
//         setShop(shopSnap.val());

//         // 🔹 Fetch daily accounts
//         const reportSnap = await get(ref(rtdb, `dailyAccounts/${shopId}`));

//         if (reportSnap.exists()) {
//           const data = reportSnap.val();

//           // 🔹 Opening balance
//           setOpeningBalance(Number(data.openingBalance) || 0);
//           delete data.openingBalance;

//           // 🔹 Daily rows
//           const rows = Object.keys(data).map((date) => ({
//             date,
//             cash: Number(data[date].cash) || 0,
//             market: Number(data[date].market) || 0,
//             card: Number(data[date].card) || 0,
//             expense: Number(data[date].expense) || 0,
//           }));

//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setReports(rows);
//         } else {
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setReports([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [shopId, navigate]);

//   /* ================= TOTALS ================= */
//   const totals = reports.reduce(
//     (acc, r) => {
//       acc.cash += r.cash;
//       acc.market += r.market;
//       acc.card += r.card;
//       acc.expense += r.expense;
//       acc.dailyTotal += r.cash + r.card;
//       return acc;
//     },
//     { cash: 0, market: 0, card: 0, expense: 0, dailyTotal: 0 },
//   );

//   const monthlySales = totals.cash + totals.card + totals.expense;

//   const monthlyBalance =
//     openingBalance + totals.cash + totals.card - totals.market;

//   /* ================= SAVE OPENING BALANCE (ADMIN) ================= */
//   const saveOpeningBalance = async () => {
//     try {
//       setSaving(true);
//       await set(
//         ref(rtdb, `dailyAccounts/${shopId}/openingBalance`),
//         Number(openingBalance),
//       );
//       alert("✅ Opening balance updated successfully");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shop details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
//       {/* 🔹 APP HEADER */}
//       <AppHeader
//         title="Shop Details"
//         subtitle={shop.place}
//         back
//         onBack={() => navigate(-1)}
//       />

//       {/* 🔹 CONTENT CONTAINER WITH VERTICAL SCROLL */}
//       <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
//         {/* 🔹 SHOP INFO */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-semibold">{shop.place}</h3>
//               <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//               <p className="text-xs text-gray-400 mt-1">
//                 📞 {shop.phone || "N/A"}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-xs text-gray-400">Shop ID</p>
//               <p className="text-sm font-mono">{shopId}</p>
//             </div>
//           </div>
//         </div>

//         {/* 🔹 BALANCE CARDS */}
//         <div className="grid grid-cols-1 gap-3">
//           {/* OPENING BALANCE SECTION */}
//           <div className="bg-white/5 px-3 py-3 rounded-xl border border-white/10">
//             <p className="text-xs text-gray-400 mb-2 font-medium">
//               Opening Balance
//             </p>

//             <div className="flex items-center gap-2">
//               <div className="relative flex-1">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//                   ₹
//                 </span>
//                 <input
//                   type="number"
//                   value={openingBalance}
//                   onChange={(e) => setOpeningBalance(Number(e.target.value))}
//                   className="w-full bg-white/10 border border-white/20 rounded-lg text-base px-3 pl-8 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
//                   placeholder="0.00"
//                 />
//               </div>

//               <button
//                 onClick={saveOpeningBalance}
//                 disabled={saving}
//                 className="bg-[var(--color-gold)] text-black text-sm font-medium px-4 py-3 rounded-lg disabled:opacity-50 active:scale-95 transition-transform min-w-[70px]"
//               >
//                 {saving ? "Saving..." : "Save"}
//               </button>
//             </div>

//             <p className="text-[10px] text-gray-500 mt-2 text-center">
//               Admins can edit this value
//             </p>
//           </div>

//           {/* CURRENT BALANCE SECTION */}
//           <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-black px-4 py-4 rounded-xl shadow-lg">
//             <p className="text-xs font-medium opacity-90">Current Balance</p>
//             <p className="text-2xl font-bold mt-2 tracking-tight">
//               ₹{monthlyBalance.toLocaleString()}
//             </p>
//             <p className="text-[10px] opacity-75 mt-1">Updated in real-time</p>
//           </div>
//         </div>

//         {/* 🔹 QUICK STATS */}
//         {/* <div className="grid grid-cols-2 gap-2">
//           <div className="bg-white/5 p-3 rounded-lg">
//             <p className="text-xs text-gray-400">Total Cash</p>
//             <p className="text-base font-semibold mt-1">₹{totals.cash.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/5 p-3 rounded-lg">
//             <p className="text-xs text-gray-400">Total Card</p>
//             <p className="text-base font-semibold mt-1">₹{totals.card.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/5 p-3 rounded-lg">
//             <p className="text-xs text-gray-400">Total Market</p>
//             <p className="text-base font-semibold mt-1">₹{totals.market.toLocaleString()}</p>
//           </div>
//           <div className="bg-white/5 p-3 rounded-lg">
//             <p className="text-xs text-gray-400">Total Expense</p>
//             <p className="text-base font-semibold mt-1">₹{totals.expense.toLocaleString()}</p>
//           </div>
//         </div> */}

//         {/* 🔹 REPORT TABLE SECTION */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">Daily Reports</h3>
//             <p className="text-xs text-gray-400">
//               {reports.length} day{reports.length !== 1 ? "s" : ""}
//             </p>
//           </div>

//           {reports.length === 0 ? (
//             <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
//               No account records found
//             </div>
//           ) : (
//             <>
//               {/* Scrollable Table Container - Fixed Height for Vertical Scroll */}
//               <div className="relative border border-white/10 rounded-xl overflow-hidden">
//                 {/* Double Scroll Indicator */}
//                 {/* <div className="absolute top-2 right-2 z-30">
//                   <div className="flex items-center gap-1">
//                     <div className="text-[10px] text-gray-500 bg-black/70 px-2 py-1 rounded-full">
//                       ←→ Scroll
//                     </div>
//                     <div className="text-[10px] text-gray-500 bg-black/70 px-2 py-1 rounded-full">
//                       ↑↓ Scroll
//                     </div>
//                   </div>
//                 </div> */}

//                 {/* Table Container with BOTH Horizontal and Vertical Scroll */}
//                 <div
//                   className="overflow-auto"
//                   style={{
//                     maxHeight: "600px", // Fixed height for vertical scrolling
//                     WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
//                   }}
//                 >
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-white/5 sticky top-0 z-10">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-semibold text-gray-400 whitespace-nowrap sticky left-0 bg-[var(--color-dark)] z-20 border-r border-white/10 min-w-[100px]">
//                           DATE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
//                           CASH
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
//                           MARKET
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
//                           CARD
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
//                           EXPENSE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[100px] bg-white/5">
//                           DAILY TOTAL
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-white/10">
//                       {reports.map((r, i) => (
//                         <tr
//                           key={i}
//                           className="hover:bg-white/5 transition-colors"
//                         >
//                           <td className="p-3 text-xs font-medium whitespace-nowrap sticky left-0 bg-[var(--color-panel)] z-10 border-r border-white/10">
//                             {r.date}
//                           </td>
//                           <td className="p-3 text-right whitespace-nowrap">
//                             ₹{r.cash.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right whitespace-nowrap">
//                             ₹{r.market.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right whitespace-nowrap">
//                             ₹{r.card.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right whitespace-nowrap">
//                             ₹{r.expense.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right font-semibold whitespace-nowrap bg-white/5">
//                             ₹{(r.cash + r.card).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>

//                     <tfoot className="bg-white/10 sticky bottom-0">
//                       <tr>
//                         <td className="p-3 text-sm font-semibold whitespace-nowrap sticky left-0 bg-[var(--color-dark)] z-10 border-r border-white/10">
//                           TOTAL
//                         </td>
//                         <td className="p-3 text-right text-sm font-semibold whitespace-nowrap">
//                           ₹{totals.cash.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-sm font-semibold whitespace-nowrap">
//                           ₹{totals.market.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-sm font-semibold whitespace-nowrap">
//                           ₹{totals.card.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-sm font-semibold whitespace-nowrap">
//                           ₹{totals.expense.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-sm font-semibold whitespace-nowrap bg-[var(--color-gold)]/20">
//                           ₹{totals.dailyTotal.toLocaleString()}
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>

//               {/* Mobile Instructions */}
//             </>
//           )}
//         </div>

//         {/* 🔹 SUMMARY CARD */}
//         {/* 🔹 MONTHLY SUMMARY - STICKY BOTTOM */}
//         <div className="sticky bottom-0 z-50 bg-[var(--color-dark)] border-t border-white/10 pt-3 pb-3 mt-6">
//           <div className="bg-gradient-to-r from-[var(--color-panel)] to-[var(--color-dark)] p-4 rounded-xl">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-xs text-gray-400">Monthly Summary</p>
//                 <p className="text-sm">
//                   Total Sales: ₹{monthlySales.toLocaleString()}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-xs text-gray-400">Net Balance</p>
//                 <p className="text-lg font-bold text-[var(--color-gold)]">
//                   ₹{monthlyBalance.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { rtdb } from "../firebase";
import AppHeader from "../components/AppHeader";

export default function AdminShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [reports, setReports] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ================= FETCH SHOP + REPORTS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Fetch shop info
        const shopSnap = await get(ref(rtdb, `shops/${shopId}`));
        if (!shopSnap.exists()) {
          alert("Shop not found");
          navigate(-1);
          return;
        }
        setShop(shopSnap.val());

        // 🔹 Fetch daily accounts
        const reportSnap = await get(
          ref(rtdb, `dailyAccounts/${shopId}`)
        );

        if (reportSnap.exists()) {
          const data = reportSnap.val();

          // 🔹 Opening balance
          setOpeningBalance(Number(data.openingBalance) || 0);
          delete data.openingBalance;

          // 🔹 Daily rows
          const rows = Object.keys(data).map((date) => ({
            date,
            cash: Number(data[date].cash) || 0,
            market: Number(data[date].market) || 0,
            card: Number(data[date].card) || 0,
            expense: Number(data[date].expense) || 0,
          }));

          rows.sort((a, b) => new Date(b.date) - new Date(a.date));
          setReports(rows);
        } else {
          setReports([]);
        }
      } catch (error) {
        console.error(error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, navigate]);

  /* ================= PAGINATION CALCULATIONS ================= */
  const totalPages = Math.ceil(reports.length / rowsPerPage);
  
  // Get current page reports
  const indexOfLastReport = currentPage * rowsPerPage;
  const indexOfFirstReport = indexOfLastReport - rowsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of visible pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at the beginning
      if (currentPage <= 2) {
        endPage = 4;
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  /* ================= TOTALS ================= */
  const totals = reports.reduce(
    (acc, r) => {
      acc.cash += r.cash;
      acc.market += r.market;
      acc.card += r.card;
      acc.expense += r.expense;
      acc.dailyTotal += r.cash + r.card;
      return acc;
    },
    { cash: 0, market: 0, card: 0, expense: 0, dailyTotal: 0 }
  );

  const monthlySales =
    totals.cash + totals.card + totals.expense;

  const monthlyBalance =
    openingBalance + totals.cash + totals.card - totals.market;

  /* ================= SAVE OPENING BALANCE (ADMIN) ================= */
  const saveOpeningBalance = async () => {
    try {
      setSaving(true);
      await set(
        ref(rtdb, `dailyAccounts/${shopId}/openingBalance`),
        Number(openingBalance)
      );
      alert("✅ Opening balance updated successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  /* ================= PAGINATION HANDLERS ================= */
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading shop details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">

      {/* 🔹 APP HEADER */}
      <AppHeader
        title="Shop Details"
        subtitle={shop.place}
        back
        onBack={() => navigate(-1)}
      />

      {/* 🔹 CONTENT CONTAINER WITH VERTICAL SCROLL */}
      <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">

        {/* 🔹 SHOP INFO */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{shop.place}</h3>
              <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
              
            </div>
           <p className="text-xs text-gray-400 mt-1">
                📞 {shop.phone || "N/A"}
              </p>
          </div>
        </div>

        {/* 🔹 BALANCE CARDS */}
        <div className="grid grid-cols-1 gap-3">
          {/* OPENING BALANCE SECTION */}
          <div className="bg-white/5 px-3 py-3 rounded-xl border border-white/10">
            <p className="text-xs text-gray-400 mb-2 font-medium">
              Opening Balance
            </p>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg text-base px-3 pl-8 py-3 text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              
              <button
                onClick={saveOpeningBalance}
                disabled={saving}
                className="bg-[var(--color-gold)] text-black text-sm font-medium px-4 py-3 rounded-lg disabled:opacity-50 active:scale-95 transition-transform min-w-[70px]"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
            
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              Admins can edit this value
            </p>
          </div>

          {/* CURRENT BALANCE SECTION */}
          <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-black px-4 py-4 rounded-xl shadow-lg">
            <p className="text-xs font-medium opacity-90">
              Current Balance
            </p>
            <p className="text-2xl font-bold mt-2 tracking-tight">
              ₹{monthlyBalance.toLocaleString()}
            </p>
            <p className="text-[10px] opacity-75 mt-1">
              Updated in real-time
            </p>
          </div>
        </div>

        {/* 🔹 REPORT TABLE SECTION */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-lg font-semibold">Daily Reports</h3>
            
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
              No account records found
            </div>
          ) : (
            <>
              {/* Scrollable Table Container */}
              <div className="relative border border-white/10 rounded-xl overflow-hidden">
                {/* Scroll Indicator */}
                {/* <div className="absolute top-2 right-2 z-30">
                  <div className="text-[10px] text-gray-500 bg-black/70 px-2 py-1 rounded-full">
                    ←→ Scroll
                  </div>
                </div> */}

                {/* Table Container with Horizontal Scroll */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="p-3 text-left text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[100px]">
                          DATE
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
                          CASH
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
                          MARKET
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
                          CARD
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[90px]">
                          EXPENSE
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[100px] bg-white/5">
                          DAILY TOTAL
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/10">
                      {currentReports.map((r, i) => (
                        <tr 
                          key={i} 
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3 text-xs font-medium whitespace-nowrap">
                            {r.date}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            ₹{r.cash.toLocaleString()}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            ₹{r.market.toLocaleString()}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            ₹{r.card.toLocaleString()}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            ₹{r.expense.toLocaleString()}
                          </td>
                          <td className="p-3 text-right font-semibold whitespace-nowrap bg-white/5">
                            ₹{(r.cash + r.card).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 🔹 PAGINATION CONTROLS */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                {/* Pagination buttons */}
                <div className="flex items-center gap-1">
                  {/* First page button */}
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-xs rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 disabled:hover:bg-white/10"
                    title="First Page"
                  >
                    ««
                  </button>

                  {/* Previous page button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-xs rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 disabled:hover:bg-white/10"
                    title="Previous Page"
                  >
                    «
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((pageNumber, index) => (
                    pageNumber === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1 text-xs text-gray-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`px-3 py-1 text-xs rounded ${
                          currentPage === pageNumber
                            ? 'bg-[var(--color-gold)] text-black font-semibold'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  ))}

                  {/* Next page button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-xs rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 disabled:hover:bg-white/10"
                    title="Next Page"
                  >
                    »
                  </button>

                  {/* Last page button */}
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-xs rounded bg-white/10 disabled:opacity-30 hover:bg-white/20 disabled:hover:bg-white/10"
                    title="Last Page"
                  >
                    »»
                  </button>
                </div>

                {/* Page navigation input */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                      }
                    }}
                    className="w-16 bg-white/10 border border-white/20 rounded text-xs px-2 py-1 text-center"
                  />
                  <span className="text-xs text-gray-400">/ {totalPages}</span>
                </div>
              </div>

              {/* Mobile scroll hint */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  Swipe left/right to see all columns
                </p>
              </div>
            </>
          )}
        </div>

        {/* 🔹 MONTHLY SUMMARY - AT THE VERY BOTTOM */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h4 className="text-sm font-semibold mb-3">Monthly Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            {/* <div>
              <p className="text-xs text-gray-400">Total Sales</p>
              <p className="text-lg font-bold">₹{monthlySales.toLocaleString()}</p>
            </div> */}
            <div>
              <p className="text-xs text-gray-400">Net Balance</p>
              <p className="text-lg font-bold text-[var(--color-gold)]">
                ₹{monthlyBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}