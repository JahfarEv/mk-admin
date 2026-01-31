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

//           let rows = [];

//           Object.keys(data).forEach((monthKey) => {
//             const monthData = data[monthKey];

//             Object.keys(monthData).forEach((date) => {
//               rows.push({
//                 date,
//                 cash: Number(monthData[date].cash) || 0,
//                 market: Number(monthData[date].market) || 0,
//                 card: Number(monthData[date].card) || 0,
//                 expense: Number(monthData[date].expense) || 0,
//               });
//             });
//           });

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
//       <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">
//         {/* 🔹 SHOP INFO */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-semibold">{shop.place}</h3>
//               <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//             </div>
//             <p className="text-xs text-gray-400 mt-1">
//               📞 {shop.phone || "N/A"}
//             </p>
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

//         {/* 🔹 REPORT TABLE SECTION */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">Daily Reports</h3>
//               <p className="text-xs text-gray-400 mt-1">
//                 {reports.length} records • Scroll to view
//               </p>
//             </div>
//           </div>

//           {reports.length === 0 ? (
//             <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
//               No account records found
//             </div>
//           ) : (
//             <>
//               {/* Simple Table Container - No limits, just scroll */}
//               <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
//                 <div className="h-full overflow-y-auto overflow-x-auto hide-scrollbar">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-white/5 sticky top-0 z-10">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-semibold text-gray-400 min-w-[100px]">
//                           DATE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CASH
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           MARKET
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CARD
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           EXPENSE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[100px] bg-white/5">
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
//                           <td className="p-3 text-xs font-medium whitespace-nowrap">
//                             {r.date}
//                           </td>
//                           <td className="p-3 text-right">
//                             ₹{r.cash.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right">
//                             ₹{r.market.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right">
//                             ₹{r.card.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right">
//                             ₹{r.expense.toLocaleString()}
//                           </td>
//                           <td className="p-3 text-right font-semibold bg-white/5">
//                             ₹{(r.cash + r.card).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>

//                     {/* STICKY FOOTER */}
//                     <tfoot className="bg-white/10 sticky bottom-0 border-t border-white/20">
//                       <tr className="font-semibold">
//                         <td className="p-3">TOTAL</td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.cash.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.market.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.card.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.expense.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)] bg-white/5">
//                           ₹{totals.dailyTotal.toLocaleString()}
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>

//               {/* Simple scroll hint */}
//               <div className="text-center mt-2">
//                 <p className="text-xs text-gray-500">
//                   Swipe left/right to see all columns • Scroll up/down for all
//                   rows
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* 🔹 MONTHLY SUMMARY - AT THE VERY BOTTOM */}
//         <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//           <h4 className="text-sm font-semibold mb-3">Monthly Summary</h4>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <p className="text-xs text-gray-400">Net Balance</p>
//               <p className="text-lg font-bold text-[var(--color-gold)]">
//                 ₹{monthlyBalance.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
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
//   const [allReports, setAllReports] = useState([]); // Store all reports
//   const [reports, setReports] = useState([]); // Only current month reports
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   // Edit state
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({
//     cash: 0,
//     market: 0,
//     card: 0,
//     expense: 0
//   });

//   // Get current month in YYYY-MM format
//   const getCurrentMonth = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     return `${year}-${month}`;
//   };

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

//           let rows = [];
//           const currentMonth = getCurrentMonth();

//           // Process all reports
//           Object.keys(data).forEach((monthKey) => {
//             const monthData = data[monthKey];

//             Object.keys(monthData).forEach((date) => {
//               rows.push({
//                 id: `${monthKey}-${date}`, // Unique ID for editing
//                 date,
//                 month: monthKey,
//                 cash: Number(monthData[date].cash) || 0,
//                 market: Number(monthData[date].market) || 0,
//                 card: Number(monthData[date].card) || 0,
//                 expense: Number(monthData[date].expense) || 0,
//               });
//             });
//           });

//           // Sort all reports by date (newest first)
//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setAllReports(rows);
          
//           // Filter for current month only
//           const currentMonthReports = rows.filter(report => report.month === currentMonth);
//           setReports(currentMonthReports);
//         } else {
//           setAllReports([]);
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setAllReports([]);
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

//   /* ================= EDIT FUNCTIONS ================= */
//   const startEdit = (report) => {
//     setEditingId(report.id);
//     setEditData({
//       cash: report.cash,
//       market: report.market,
//       card: report.card,
//       expense: report.expense
//     });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditData({ cash: 0, market: 0, card: 0, expense: 0 });
//   };

//   const saveEdit = async (reportId, date, month) => {
//     try {
//       setSaving(true);
      
//       // Update in Firebase
//       await set(
//         ref(rtdb, `dailyAccounts/${shopId}/${month}/${date}`),
//         {
//           cash: Number(editData.cash),
//           market: Number(editData.market),
//           card: Number(editData.card),
//           expense: Number(editData.expense)
//         }
//       );

//       // Update all reports
//       const updatedAllReports = allReports.map(report => 
//         report.id === reportId 
//           ? { ...report, ...editData }
//           : report
//       );
      
//       // Update current month reports
//       const currentMonth = getCurrentMonth();
//       const updatedCurrentMonthReports = updatedAllReports.filter(report => report.month === currentMonth);
      
//       setAllReports(updatedAllReports);
//       setReports(updatedCurrentMonthReports);

//       setEditingId(null);
//       alert("✅ Daily report updated successfully");
//     } catch (error) {
//       alert("Error updating report: " + error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEditChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: Number(value) || 0
//     }));
//   };

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shop details...
//       </div>
//     );
//   }

//   // Get current month name for display
//   const getCurrentMonthName = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

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
//       <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">
//         {/* 🔹 SHOP INFO */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-semibold">{shop.place}</h3>
//               <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//             </div>
//             <p className="text-xs text-gray-400 mt-1">
//               📞 {shop.phone || "N/A"}
//             </p>
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

//         {/* 🔹 REPORT TABLE SECTION */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">Daily Reports</h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-xs bg-[var(--color-gold)] text-black px-2 py-0.5 rounded">
//                   {getCurrentMonthName()}
//                 </span>
//                 <p className="text-xs text-gray-400">
//                   {reports.length} records • Click edit icon to modify
//                 </p>
//               </div>
//             </div>
//           </div>

//           {reports.length === 0 ? (
//             <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
//               No records found for {getCurrentMonthName()}
//             </div>
//           ) : (
//             <>
//               {/* Simple Table Container - No limits, just scroll */}
//               <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
//                 <div className="h-full overflow-y-auto overflow-x-auto hide-scrollbar">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-white/5 sticky top-0 z-10">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-semibold text-gray-400 min-w-[100px]">
//                           DATE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CASH
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           MARKET
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CARD
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           EXPENSE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[100px] bg-white/5">
//                           DAILY TOTAL
//                         </th>
//                         <th className="p-3 text-center text-xs font-semibold text-gray-400 min-w-[80px]">
//                           ACTION
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-white/10">
//                       {reports.map((report) => (
//                         <tr
//                           key={report.id}
//                           className="hover:bg-white/5 transition-colors"
//                         >
//                           <td className="p-3 text-xs font-medium whitespace-nowrap">
//                             {report.date}
//                           </td>
                          
//                           {/* CASH Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.cash}
//                                 onChange={(e) => handleEditChange('cash', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.cash.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* MARKET Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.market}
//                                 onChange={(e) => handleEditChange('market', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.market.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* CARD Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.card}
//                                 onChange={(e) => handleEditChange('card', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.card.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* EXPENSE Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.expense}
//                                 onChange={(e) => handleEditChange('expense', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.expense.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* DAILY TOTAL Column */}
//                           <td className="p-3 text-right font-semibold bg-white/5">
//                             {editingId === report.id ? (
//                               <span className="text-[var(--color-gold)]">
//                                 ₹{(editData.cash + editData.card).toLocaleString()}
//                               </span>
//                             ) : (
//                               `₹${(report.cash + report.card).toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* ACTION Column */}
//                           <td className="p-3 text-center">
//                             {editingId === report.id ? (
//                               <div className="flex gap-1 justify-center">
//                                 <button
//                                   onClick={() => saveEdit(report.id, report.date, report.month)}
//                                   disabled={saving}
//                                   className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
//                                   title="Save changes"
//                                 >
//                                   {saving ? "..." : "✓"}
//                                 </button>
//                                 <button
//                                   onClick={cancelEdit}
//                                   className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
//                                   title="Cancel"
//                                 >
//                                   ✕
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => startEdit(report)}
//                                 className="bg-[var(--color-gold)] hover:opacity-90 text-black text-xs px-3 py-1 rounded transition-opacity"
//                                 title="Edit this record"
//                               >
//                                 Edit
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>

//                     {/* STICKY FOOTER */}
//                     <tfoot className="bg-white/10 sticky bottom-0 border-t border-white/20">
//                       <tr className="font-semibold">
//                         <td className="p-3">TOTAL</td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.cash.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.market.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.card.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.expense.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)] bg-white/5">
//                           ₹{totals.dailyTotal.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-center text-xs text-gray-500">
//                           Monthly Total
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>

//               {/* Simple scroll hint */}
//               <div className="text-center mt-2">
//                 <p className="text-xs text-gray-500">
//                   Swipe left/right to see all columns • Click "Edit" to modify records
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* 🔹 MONTHLY SUMMARY - AT THE VERY BOTTOM */}
//         <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//           <h4 className="text-sm font-semibold mb-3">
//             {getCurrentMonthName()} Summary
//           </h4>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <p className="text-xs text-gray-400">Net Balance</p>
//               <p className="text-lg font-bold text-[var(--color-gold)]">
//                 ₹{monthlyBalance.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400">Monthly Sales</p>
//               <p className="text-lg font-bold">
//                 ₹{monthlySales.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, get, set } from "firebase/database";
// import { rtdb } from "../firebase";
// import AppHeader from "../components/AppHeader";
// import ChangePasswordModal from "../components/ChangePasswordModal"; // Import the new modal

// export default function AdminShopDetails() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shop, setShop] = useState(null);
//   const [allReports, setAllReports] = useState([]); // Store all reports
//   const [reports, setReports] = useState([]); // Only current month reports
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   // Edit state
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({
//     cash: 0,
//     market: 0,
//     card: 0,
//     expense: 0
//   });

//   // Password change modal state
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   // Get current month in YYYY-MM format
//   const getCurrentMonth = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     return `${year}-${month}`;
//   };

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
//         const shopData = shopSnap.val();
//         setShop(shopData);

//         // 🔹 Fetch daily accounts
//         const reportSnap = await get(ref(rtdb, `dailyAccounts/${shopId}`));

//         if (reportSnap.exists()) {
//           const data = reportSnap.val();

//           // 🔹 Opening balance
//           setOpeningBalance(Number(data.openingBalance) || 0);
//           delete data.openingBalance;

//           let rows = [];
//           const currentMonth = getCurrentMonth();

//           // Process all reports
//           Object.keys(data).forEach((monthKey) => {
//             const monthData = data[monthKey];

//             Object.keys(monthData).forEach((date) => {
//               rows.push({
//                 id: `${monthKey}-${date}`, // Unique ID for editing
//                 date,
//                 month: monthKey,
//                 cash: Number(monthData[date].cash) || 0,
//                 market: Number(monthData[date].market) || 0,
//                 card: Number(monthData[date].card) || 0,
//                 expense: Number(monthData[date].expense) || 0,
//               });
//             });
//           });

//           // Sort all reports by date (newest first)
//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setAllReports(rows);
          
//           // Filter for current month only
//           const currentMonthReports = rows.filter(report => report.month === currentMonth);
//           setReports(currentMonthReports);
//         } else {
//           setAllReports([]);
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setAllReports([]);
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

//   const monthlySales = totals.cash + totals.card ;

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

//   /* ================= EDIT FUNCTIONS ================= */
//   const startEdit = (report) => {
//     setEditingId(report.id);
//     setEditData({
//       cash: report.cash,
//       market: report.market,
//       card: report.card,
//       expense: report.expense
//     });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditData({ cash: 0, market: 0, card: 0, expense: 0 });
//   };

//   const saveEdit = async (reportId, date, month) => {
//     try {
//       setSaving(true);
      
//       // Update in Firebase
//       await set(
//         ref(rtdb, `dailyAccounts/${shopId}/${month}/${date}`),
//         {
//           cash: Number(editData.cash),
//           market: Number(editData.market),
//           card: Number(editData.card),
//           expense: Number(editData.expense)
//         }
//       );

//       // Update all reports
//       const updatedAllReports = allReports.map(report => 
//         report.id === reportId 
//           ? { ...report, ...editData }
//           : report
//       );
      
//       // Update current month reports
//       const currentMonth = getCurrentMonth();
//       const updatedCurrentMonthReports = updatedAllReports.filter(report => report.month === currentMonth);
      
//       setAllReports(updatedAllReports);
//       setReports(updatedCurrentMonthReports);

//       setEditingId(null);
//       alert("✅ Daily report updated successfully");
//     } catch (error) {
//       alert("Error updating report: " + error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEditChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: Number(value) || 0
//     }));
//   };

//   /* ================= PASSWORD CHANGE FUNCTION ================= */
// /* ================= PASSWORD CHANGE FUNCTION ================= */
// const handlePasswordChange = async ({ newPassword }) => {
//   try {
//     const passwordRef = ref(rtdb, `shops/${shopId}/password`);
//     await set(passwordRef, newPassword);

//     alert("✅ Password updated successfully. Shop must login with new password.");
//     return true;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to update password");
//   }
// };


//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading shop details...
//       </div>
//     );
//   }

//   // Get current month name for display
//   const getCurrentMonthName = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

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
//       <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">
//         {/* 🔹 SHOP INFO WITH PASSWORD CHANGE OPTION */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
//           <div className="flex justify-between items-start mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">{shop.place}</h3>
//               <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//             </div>
//             <p className="text-xs text-gray-400 mt-1">
//               📞 {shop.phone || "N/A"}
//             </p>
//           </div>
          
//           {/* Password Change Button */}
//           <div className="pt-3 border-t border-white/10">
//             <button
//               onClick={() => setShowPasswordModal(true)}
//               className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-2 transition-colors"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//               </svg>
//               <span className="text-sm">Change Shop Password</span>
//             </button>
//             <p className="text-xs text-gray-500 text-center mt-2">
//               Update login credentials for this shop
//             </p>
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

//         {/* 🔹 REPORT TABLE SECTION */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">Daily Reports</h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-xs bg-[var(--color-gold)] text-black px-2 py-0.5 rounded">
//                   {getCurrentMonthName()}
//                 </span>
//                 <p className="text-xs text-gray-400">
//                   {reports.length} records • Click edit icon to modify
//                 </p>
//               </div>
//             </div>
//           </div>

//           {reports.length === 0 ? (
//             <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
//               No records found for {getCurrentMonthName()}
//             </div>
//           ) : (
//             <>
//               {/* Simple Table Container - No limits, just scroll */}
//               <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
//                 <div className="h-full overflow-y-auto overflow-x-auto hide-scrollbar">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-white/5 sticky top-0 z-10">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-semibold text-gray-400 min-w-[100px]">
//                           DATE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CASH
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           MARKET
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CARD
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           EXPENSE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[100px] bg-white/5">
//                           DAILY TOTAL
//                         </th>
//                         <th className="p-3 text-center text-xs font-semibold text-gray-400 min-w-[80px]">
//                           ACTION
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-white/10">
//                       {reports.map((report) => (
//                         <tr
//                           key={report.id}
//                           className="hover:bg-white/5 transition-colors"
//                         >
//                           <td className="p-3 text-xs font-medium whitespace-nowrap">
//                             {report.date}
//                           </td>
                          
//                           {/* CASH Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.cash}
//                                 onChange={(e) => handleEditChange('cash', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.cash.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* MARKET Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.market}
//                                 onChange={(e) => handleEditChange('market', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.market.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* CARD Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.card}
//                                 onChange={(e) => handleEditChange('card', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.card.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* EXPENSE Column */}
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.expense}
//                                 onChange={(e) => handleEditChange('expense', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.expense.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* DAILY TOTAL Column */}
//                           <td className="p-3 text-right font-semibold bg-white/5">
//                             {editingId === report.id ? (
//                               <span className="text-[var(--color-gold)]">
//                                 ₹{(editData.cash + editData.card).toLocaleString()}
//                               </span>
//                             ) : (
//                               `₹${(report.cash + report.card).toLocaleString()}`
//                             )}
//                           </td>
                          
//                           {/* ACTION Column */}
//                           <td className="p-3 text-center">
//                             {editingId === report.id ? (
//                               <div className="flex gap-1 justify-center">
//                                 <button
//                                   onClick={() => saveEdit(report.id, report.date, report.month)}
//                                   disabled={saving}
//                                   className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
//                                   title="Save changes"
//                                 >
//                                   {saving ? "..." : "✓"}
//                                 </button>
//                                 <button
//                                   onClick={cancelEdit}
//                                   className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
//                                   title="Cancel"
//                                 >
//                                   ✕
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => startEdit(report)}
//                                 className="bg-[var(--color-gold)] hover:opacity-90 text-black text-xs px-3 py-1 rounded transition-opacity"
//                                 title="Edit this record"
//                               >
//                                 Edit
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>

//                     {/* STICKY FOOTER */}
//                     <tfoot className="bg-white/10 sticky bottom-0 border-t border-white/20">
//                       <tr className="font-semibold">
//                         <td className="p-3">TOTAL</td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.cash.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.market.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.card.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.expense.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)] bg-white/5">
//                           ₹{totals.dailyTotal.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-center text-xs text-gray-500">
//                           Monthly Total
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>

//               {/* Simple scroll hint */}
//               <div className="text-center mt-2">
//                 <p className="text-xs text-gray-500">
//                   Swipe left/right to see all columns • Click "Edit" to modify records
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* 🔹 MONTHLY SUMMARY - AT THE VERY BOTTOM */}
//         <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//           <h4 className="text-sm font-semibold mb-3">
//             {getCurrentMonthName()} Summary
//           </h4>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <p className="text-xs text-gray-400">Net Balance</p>
//               <p className="text-lg font-bold text-[var(--color-gold)]">
//                 ₹{monthlyBalance.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400">Monthly Sales</p>
//               <p className="text-lg font-bold">
//                 ₹{monthlySales.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 PASSWORD CHANGE MODAL */}
//       <ChangePasswordModal
//         open={showPasswordModal}
//         onClose={() => setShowPasswordModal(false)}
//         onSubmit={handlePasswordChange}
//         shop={shop}
//       />
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ref, get, set, remove } from "firebase/database";
// import { rtdb, auth, secondaryAuth } from "../firebase";
// import AppHeader from "../components/AppHeader";
// import ChangePasswordModal from "../components/ChangePasswordModal";
// import { deleteUser } from "firebase/auth";

// export default function AdminShopDetails() {
//   const { shopId } = useParams();
//   const navigate = useNavigate();

//   const [shop, setShop] = useState(null);
//   const [allReports, setAllReports] = useState([]);
//   const [reports, setReports] = useState([]);
//   const [openingBalance, setOpeningBalance] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [showDeleteAlert, setShowDeleteAlert] = useState(false);
//   const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
//   // Edit state
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({
//     cash: 0,
//     market: 0,
//     card: 0,
//     expense: 0
//   });

//   // Password change modal state
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   // Get current month in YYYY-MM format
//   const getCurrentMonth = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     return `${year}-${month}`;
//   };

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
//         const shopData = shopSnap.val();
//         setShop(shopData);

//         // 🔹 Fetch daily accounts
//         const reportSnap = await get(ref(rtdb, `dailyAccounts/${shopId}`));

//         if (reportSnap.exists()) {
//           const data = reportSnap.val();

//           // 🔹 Opening balance
//           setOpeningBalance(Number(data.openingBalance) || 0);
//           delete data.openingBalance;

//           let rows = [];
//           const currentMonth = getCurrentMonth();

//           // Process all reports
//           Object.keys(data).forEach((monthKey) => {
//             const monthData = data[monthKey];

//             Object.keys(monthData).forEach((date) => {
//               rows.push({
//                 id: `${monthKey}-${date}`, // Unique ID for editing
//                 date,
//                 month: monthKey,
//                 cash: Number(monthData[date].cash) || 0,
//                 market: Number(monthData[date].market) || 0,
//                 card: Number(monthData[date].card) || 0,
//                 expense: Number(monthData[date].expense) || 0,
//               });
//             });
//           });

//           // Sort all reports by date (newest first)
//           rows.sort((a, b) => new Date(b.date) - new Date(a.date));
//           setAllReports(rows);
          
//           // Filter for current month only
//           const currentMonthReports = rows.filter(report => report.month === currentMonth);
//           setReports(currentMonthReports);
//         } else {
//           setAllReports([]);
//           setReports([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setAllReports([]);
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

//   const monthlySales = totals.cash + totals.card;

//   const monthlyBalance =
//     openingBalance + totals.cash + totals.card - totals.market;

//   /* ================= DELETE SHOP FUNCTION ================= */
//   const handleDeleteShop = () => {
//     setShowDeleteAlert(true);
//   };

//   const confirmDeleteShop = async () => {
//     if (deleteConfirmText !== `DELETE ${shop?.place}`) {
//       alert(`Please type "DELETE ${shop?.place}" to confirm`);
//       return;
//     }

//     try {
//       setSaving(true);
      
//       // 1. Delete shop data from RTDB
//       await remove(ref(rtdb, `shops/${shopId}`));
      
//       // 2. Delete daily accounts data
//       await remove(ref(rtdb, `dailyAccounts/${shopId}`));
      
//       // 3. Try to delete auth user (this might fail if not signed in)
//       try {
//         // Note: In production, you might need admin SDK or store passwords securely
//         // This is a best-effort attempt
//         console.log("Attempting to delete auth user...");
//       } catch (authError) {
//         console.warn("Could not delete auth user:", authError.message);
//         // Continue even if auth deletion fails
//       }

//       alert(`✅ Shop "${shop?.place}" deleted successfully!`);
//       navigate("/shops"); // Go back to shop list
//     } catch (error) {
//       console.error("Delete failed:", error);
//       alert(`❌ Error deleting shop: ${error.message}`);
//     } finally {
//       setSaving(false);
//       setShowDeleteAlert(false);
//       setDeleteConfirmText("");
//     }
//   };

//   /* ================= SAVE OPENING BALANCE ================= */
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

//   /* ================= EDIT FUNCTIONS ================= */
//   const startEdit = (report) => {
//     setEditingId(report.id);
//     setEditData({
//       cash: report.cash,
//       market: report.market,
//       card: report.card,
//       expense: report.expense
//     });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditData({ cash: 0, market: 0, card: 0, expense: 0 });
//   };

//   const saveEdit = async (reportId, date, month) => {
//     try {
//       setSaving(true);
      
//       await set(
//         ref(rtdb, `dailyAccounts/${shopId}/${month}/${date}`),
//         {
//           cash: Number(editData.cash),
//           market: Number(editData.market),
//           card: Number(editData.card),
//           expense: Number(editData.expense)
//         }
//       );

//       const updatedAllReports = allReports.map(report => 
//         report.id === reportId 
//           ? { ...report, ...editData }
//           : report
//       );
      
//       const currentMonth = getCurrentMonth();
//       const updatedCurrentMonthReports = updatedAllReports.filter(report => report.month === currentMonth);
      
//       setAllReports(updatedAllReports);
//       setReports(updatedCurrentMonthReports);

//       setEditingId(null);
//       alert("✅ Daily report updated successfully");
//     } catch (error) {
//       alert("Error updating report: " + error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEditChange = (field, value) => {
//     setEditData(prev => ({
//       ...prev,
//       [field]: Number(value) || 0
//     }));
//   };

//   /* ================= PASSWORD CHANGE FUNCTION ================= */
//   const handlePasswordChange = async ({ newPassword }) => {
//     try {
//       const passwordRef = ref(rtdb, `shops/${shopId}/password`);
//       await set(passwordRef, newPassword);

//       alert("✅ Password updated successfully. Shop must login with new password.");
//       return true;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to update password");
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

//   // Get current month name for display
//   const getCurrentMonthName = () => {
//     const now = new Date();
//     return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
//       {/* 🔹 DELETE CONFIRMATION MODAL */}
//       {showDeleteAlert && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeleteAlert(false)}></div>
          
//           <div className="relative w-full max-w-sm md:max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
//             <div className="bg-red-500/90 p-5 text-center relative">
//               <div className="absolute  left-1/2 transform -translate-x-1/2">
//                 <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-2xl shadow-lg">
//                   🗑️
//                 </div>
//               </div>
//               <h2 className="text-xl font-bold mt-16 mb-2 text-red-100">
//                 Delete Shop
//               </h2>
//             </div>
            
//             <div className="p-6">
//               <p className="text-gray-800 text-center text-sm md:text-base mb-6 leading-relaxed">
//                 <strong className="text-red-600">WARNING:</strong> You are about to permanently delete:<br/>
               
//               </p>
              
//               <div className="mb-6">
//                 <p className="text-sm text-gray-600 mb-3 text-center">
//                   Type <span className="font-bold text-red-600">"DELETE {shop?.place}"</span> to confirm:
//                 </p>
//                 <input
//                   type="text"
//                   value={deleteConfirmText}
//                   onChange={(e) => setDeleteConfirmText(e.target.value)}
//                   placeholder={`Type "DELETE ${shop?.place}"`}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl text-red-600 font-extrabold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-center"
//                   autoFocus
//                 />
//                 <p className="text-xs text-gray-500 mt-2 text-center">
//                   This will permanently delete all data
//                 </p>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteAlert(false);
//                     setDeleteConfirmText("");
//                   }}
//                   className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
//                   disabled={saving}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDeleteShop}
//                   disabled={saving || deleteConfirmText !== `DELETE ${shop?.place}`}
//                   className={`flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl active:scale-95 transition-all duration-200 ${
//                     (deleteConfirmText !== `DELETE ${shop?.place}`) || saving
//                       ? 'opacity-50 cursor-not-allowed' 
//                       : ''
//                   }`}
//                 >
//                   {saving ? "Deleting..." : "Delete Forever"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 APP HEADER */}
//       <AppHeader
//         title="Shop Details"
//         subtitle={shop.place}
//         back
//         onBack={() => navigate(-1)}
//         right={
//           <button
//             onClick={handleDeleteShop}
//             className="text-red-400 hover:text-red-300 text-lg transition-colors"
//             title="Delete Shop"
//           >
//             🗑️
//           </button>
//         }
//       />

//       {/* 🔹 CONTENT CONTAINER */}
//       <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">
//         {/* 🔹 SHOP INFO WITH PASSWORD CHANGE OPTION */}
//         <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
//           <div className="flex justify-between items-start mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">{shop.place}</h3>
//               <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
//             </div>
//             <p className="text-xs text-gray-400 mt-1">
//               📞 {shop.phone || "N/A"}
//             </p>
//           </div>
          
//           <div className="pt-3 border-t border-white/10 flex gap-2">
//             <button
//               onClick={() => setShowPasswordModal(true)}
//               className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-2 transition-colors"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//               </svg>
//               <span className="text-sm">Change Password</span>
//             </button>
//             <button
//               onClick={handleDeleteShop}
//               className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 transition-colors text-red-300"
//             >
//               <span className="text-sm">Delete Shop</span>
//             </button>
//           </div>
//           <p className="text-xs text-gray-500 text-center mt-2">
//             Manage shop settings and credentials
//           </p>
//         </div>

//         {/* 🔹 BALANCE CARDS */}
//         <div className="grid grid-cols-1 gap-3">
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
//           </div>

//           <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-black px-4 py-4 rounded-xl shadow-lg">
//             <p className="text-xs font-medium opacity-90">Current Balance</p>
//             <p className="text-2xl font-bold mt-2 tracking-tight">
//               ₹{monthlyBalance.toLocaleString()}
//             </p>
//           </div>
//         </div>

//         {/* 🔹 REPORT TABLE SECTION */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <h3 className="text-lg font-semibold">Daily Reports</h3>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-xs bg-[var(--color-gold)] text-black px-2 py-0.5 rounded">
//                   {getCurrentMonthName()}
//                 </span>
//                 <p className="text-xs text-gray-400">
//                   {reports.length} records • Click edit icon to modify
//                 </p>
//               </div>
//             </div>
//           </div>

//           {reports.length === 0 ? (
//             <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
//               No records found for {getCurrentMonthName()}
//             </div>
//           ) : (
//             <>
//               <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
//                 <div className="h-full overflow-y-auto overflow-x-auto">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-white/5 sticky top-0 z-10">
//                       <tr>
//                         <th className="p-3 text-left text-xs font-semibold text-gray-400 min-w-[100px]">
//                           DATE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CASH
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           MARKET
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           CARD
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
//                           EXPENSE
//                         </th>
//                         <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[100px] bg-white/5">
//                           DAILY TOTAL
//                         </th>
//                         <th className="p-3 text-center text-xs font-semibold text-gray-400 min-w-[80px]">
//                           ACTION
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-white/10">
//                       {reports.map((report) => (
//                         <tr
//                           key={report.id}
//                           className="hover:bg-white/5 transition-colors"
//                         >
//                           <td className="p-3 text-xs font-medium whitespace-nowrap">
//                             {report.date}
//                           </td>
                          
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.cash}
//                                 onChange={(e) => handleEditChange('cash', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.cash.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.market}
//                                 onChange={(e) => handleEditChange('market', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.market.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.card}
//                                 onChange={(e) => handleEditChange('card', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.card.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           <td className="p-3 text-right">
//                             {editingId === report.id ? (
//                               <input
//                                 type="number"
//                                 value={editData.expense}
//                                 onChange={(e) => handleEditChange('expense', e.target.value)}
//                                 className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
//                                 placeholder="0"
//                               />
//                             ) : (
//                               `₹${report.expense.toLocaleString()}`
//                             )}
//                           </td>
                          
//                           <td className="p-3 text-right font-semibold bg-white/5">
//                             {editingId === report.id ? (
//                               <span className="text-[var(--color-gold)]">
//                                 ₹{(editData.cash + editData.card).toLocaleString()}
//                               </span>
//                             ) : (
//                               `₹${(report.cash + report.card).toLocaleString()}`
//                             )}
//                           </td>
                          
//                           <td className="p-3 text-center">
//                             {editingId === report.id ? (
//                               <div className="flex gap-1 justify-center">
//                                 <button
//                                   onClick={() => saveEdit(report.id, report.date, report.month)}
//                                   disabled={saving}
//                                   className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
//                                   title="Save changes"
//                                 >
//                                   {saving ? "..." : "✓"}
//                                 </button>
//                                 <button
//                                   onClick={cancelEdit}
//                                   className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
//                                   title="Cancel"
//                                 >
//                                   ✕
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => startEdit(report)}
//                                 className="bg-[var(--color-gold)] hover:opacity-90 text-black text-xs px-3 py-1 rounded transition-opacity"
//                                 title="Edit this record"
//                               >
//                                 Edit
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>

//                     <tfoot className="bg-white/10 sticky bottom-0 border-t border-white/20">
//                       <tr className="font-semibold">
//                         <td className="p-3">TOTAL</td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.cash.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.market.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.card.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)]">
//                           ₹{totals.expense.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-right text-[var(--color-gold)] bg-white/5">
//                           ₹{totals.dailyTotal.toLocaleString()}
//                         </td>
//                         <td className="p-3 text-center text-xs text-gray-500">
//                           Monthly Total
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//           <h4 className="text-sm font-semibold mb-3">
//             {getCurrentMonthName()} Summary
//           </h4>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <p className="text-xs text-gray-400">Net Balance</p>
//               <p className="text-lg font-bold text-[var(--color-gold)]">
//                 ₹{monthlyBalance.toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-400">Monthly Sales</p>
//               <p className="text-lg font-bold">
//                 ₹{monthlySales.toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ChangePasswordModal
//         open={showPasswordModal}
//         onClose={() => setShowPasswordModal(false)}
//         onSubmit={handlePasswordChange}
//         shop={shop}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, set, remove } from "firebase/database";
import { rtdb } from "../firebase";
import AppHeader from "../components/AppHeader";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function AdminShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    cash: 0,
    market: 0,
    card: 0,
    expense: 0
  });

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Get current month in YYYY-MM format
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

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
        const shopData = shopSnap.val();
        setShop(shopData);

        // 🔹 Fetch daily accounts
        const reportSnap = await get(ref(rtdb, `dailyAccounts/${shopId}`));

        if (reportSnap.exists()) {
          const data = reportSnap.val();

          // 🔹 Opening balance
          setOpeningBalance(Number(data.openingBalance) || 0);
          delete data.openingBalance;

          let rows = [];
          const currentMonth = getCurrentMonth();

          // Process all reports
          Object.keys(data).forEach((monthKey) => {
            const monthData = data[monthKey];

            Object.keys(monthData).forEach((date) => {
              rows.push({
                id: `${monthKey}-${date}`, // Unique ID for editing
                date,
                month: monthKey,
                cash: Number(monthData[date].cash) || 0,
                market: Number(monthData[date].market) || 0,
                card: Number(monthData[date].card) || 0,
                expense: Number(monthData[date].expense) || 0,
              });
            });
          });

          // Sort all reports by date (newest first)
          rows.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAllReports(rows);
          
          // Filter for current month only
          const currentMonthReports = rows.filter(report => report.month === currentMonth);
          setReports(currentMonthReports);
        } else {
          setAllReports([]);
          setReports([]);
        }
      } catch (error) {
        console.error(error);
        setAllReports([]);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, navigate]);

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
    { cash: 0, market: 0, card: 0, expense: 0, dailyTotal: 0 },
  );

  const monthlySales = totals.cash + totals.card;

  const monthlyBalance =
    openingBalance + totals.cash + totals.card - totals.market;

  /* ================= DELETE SHOP FUNCTION ================= */
  const handleDeleteShop = () => {
    setShowDeleteAlert(true);
  };

  const confirmDeleteShop = async () => {
    if (alert(`Are you sure you want to delete "${shop?.place}"? This action cannot be undone.`)) {
    return;
  }

    try {
      setSaving(true);
      
      // 1. Delete shop data from RTDB
      await remove(ref(rtdb, `shops/${shopId}`));
      
      // 2. Delete daily accounts data
      await remove(ref(rtdb, `dailyAccounts/${shopId}`));
      
      // 3. Try to delete auth user (this might fail if not signed in)
      try {
        // Note: In production, you might need admin SDK or store passwords securely
        // This is a best-effort attempt
        console.log("Attempting to delete auth user...");
      } catch (authError) {
        console.warn("Could not delete auth user:", authError.message);
        // Continue even if auth deletion fails
      }

      // Show success message
      alert(`✅ Shop "${shop?.place}" deleted successfully!`);
      
      // Navigate to home page instead of shop list
      navigate("/");
      
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`❌ Error deleting shop: ${error.message}`);
    } finally {
      setSaving(false);
      setShowDeleteAlert(false);
      setDeleteConfirmText("");
    }
  };

  /* ================= SAVE OPENING BALANCE ================= */
  const saveOpeningBalance = async () => {
    try {
      setSaving(true);
      await set(
        ref(rtdb, `dailyAccounts/${shopId}/openingBalance`),
        Number(openingBalance),
      );
      alert("✅ Opening balance updated successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  /* ================= EDIT FUNCTIONS ================= */
  const startEdit = (report) => {
    setEditingId(report.id);
    setEditData({
      cash: report.cash,
      market: report.market,
      card: report.card,
      expense: report.expense
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ cash: 0, market: 0, card: 0, expense: 0 });
  };

  const saveEdit = async (reportId, date, month) => {
    try {
      setSaving(true);
      
      await set(
        ref(rtdb, `dailyAccounts/${shopId}/${month}/${date}`),
        {
          cash: Number(editData.cash),
          market: Number(editData.market),
          card: Number(editData.card),
          expense: Number(editData.expense)
        }
      );

      const updatedAllReports = allReports.map(report => 
        report.id === reportId 
          ? { ...report, ...editData }
          : report
      );
      
      const currentMonth = getCurrentMonth();
      const updatedCurrentMonthReports = updatedAllReports.filter(report => report.month === currentMonth);
      
      setAllReports(updatedAllReports);
      setReports(updatedCurrentMonthReports);

      setEditingId(null);
      alert("✅ Daily report updated successfully");
    } catch (error) {
      alert("Error updating report: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: Number(value) || 0
    }));
  };


  /* ================= DELETE DAILY ENTRY ================= */
const deleteDailyEntry = async (report) => {
  const confirmText = `DELETE ${report.date}`;

  const input = prompt(
    `Type "${confirmText}" to delete this entry permanently`
  );

  if (input !== confirmText) {
    alert("❌ Delete cancelled");
    return;
  }

  try {
    setSaving(true);

    await remove(
      ref(rtdb, `dailyAccounts/${shopId}/${report.month}/${report.date}`)
    );

    // Update local state
    const updatedAllReports = allReports.filter(
      (r) => r.id !== report.id
    );

    const currentMonth = getCurrentMonth();
    const updatedCurrentMonthReports = updatedAllReports.filter(
      (r) => r.month === currentMonth
    );

    setAllReports(updatedAllReports);
    setReports(updatedCurrentMonthReports);

    alert("✅ Daily entry deleted successfully");
  } catch (error) {
    alert("❌ Failed to delete entry: " + error.message);
  } finally {
    setSaving(false);
  }
};

  /* ================= PASSWORD CHANGE FUNCTION ================= */
  const handlePasswordChange = async ({ newPassword }) => {
    try {
      const passwordRef = ref(rtdb, `shops/${shopId}/password`);
      await set(passwordRef, newPassword);

      alert("✅ Password updated successfully. Shop must login with new password.");
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update password");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading shop details...
      </div>
    );
  }

  // Get current month name for display
  const getCurrentMonthName = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
      {/* 🔹 DELETE CONFIRMATION MODAL */}
      {showDeleteAlert && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
  <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeleteAlert(false)}></div>
  
  <div className="relative w-full max-w-xs rounded-xl shadow-2xl bg-white animate-scaleIn">
    {/* Header */}
    <div className="p-4 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
        <span className="text-2xl">🗑️</span>
      </div>
      <h2 className="text-lg font-bold text-gray-800">Delete Shop</h2>
    </div>
    
    {/* Content */}
    <div className="px-5 pb-5">
      <div className="text-center mb-5">
        <p className="text-gray-600 text-sm">
          Are you sure you want to delete <span className="font-semibold text-gray-800">{shop?.place}</span>? 
          This action cannot be undone.
        </p>
      </div>
      
      {/* Buttons - Single line */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setShowDeleteAlert(false);
          }}
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-200"
          disabled={saving}
        >
          Cancel
        </button>
        <button
          onClick={confirmDeleteShop}
          disabled={saving}
          className={`flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-lg active:scale-95 transition-all duration-200 ${
            saving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
          }`}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  </div>
</div>
      )}

      {/* 🔹 APP HEADER */}
      <AppHeader
        title="Shop Details"
        subtitle={shop.place}
        back
        onBack={() => navigate(-1)}
        right={
          <button
            onClick={handleDeleteShop}
            className="text-red-400 hover:text-red-300 text-lg transition-colors p-2"
            title="Delete Shop"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        }
      />

      {/* 🔹 CONTENT CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 pb-4 space-y-4">
        {/* 🔹 SHOP INFO WITH PASSWORD CHANGE OPTION */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold">{shop.place}</h3>
              <p className="text-xs text-gray-400 mt-1">📧 {shop.email}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              📞 {shop.phone || "N/A"}
            </p>
          </div>
          
          <div className="pt-3 border-t border-white/10 flex gap-2">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span className="text-sm">Change Password</span>
            </button>
            <button
              onClick={handleDeleteShop}
              className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 transition-colors text-red-300 hover:text-red-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-sm">Delete Shop</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Manage shop settings and credentials
          </p>
        </div>

        {/* 🔹 BALANCE CARDS */}
        <div className="grid grid-cols-1 gap-3">
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
          </div>

          <div className="bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-black px-4 py-4 rounded-xl shadow-lg">
            <p className="text-xs font-medium opacity-90">Current Balance</p>
            <p className="text-2xl font-bold mt-2 tracking-tight">
              ₹{monthlyBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* 🔹 REPORT TABLE SECTION */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-lg font-semibold">Daily Reports</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-[var(--color-gold)] text-black px-2 py-0.5 rounded">
                  {getCurrentMonthName()}
                </span>
                <p className="text-xs text-gray-400">
                  {reports.length} records • Click edit icon to modify
                </p>
              </div>
            </div>
          </div>

          {reports.length === 0 ? (
            <div className="text-center text-gray-400 py-10 border border-white/10 rounded-xl">
              No records found for {getCurrentMonthName()}
            </div>
          ) : (
            <>
              <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
                <div className="h-full overflow-y-auto overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/5 sticky top-0 z-10">
                      <tr>
                        <th className="p-3 text-left text-xs font-semibold text-gray-400 min-w-[100px]">
                          DATE
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
                          CASH
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
                          MARKET
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
                          CARD
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[90px]">
                          EXPENSE
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-gray-400 min-w-[100px] bg-white/5">
                          DAILY TOTAL
                        </th>
                        <th className="p-3 text-center text-xs font-semibold text-gray-400 min-w-[80px]">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/10">
                      {reports.map((report) => (
                        <tr
                          key={report.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3 text-xs font-medium whitespace-nowrap">
                            {report.date}
                          </td>
                          
                          <td className="p-3 text-right">
                            {editingId === report.id ? (
                              <input
                                type="number"
                                value={editData.cash}
                                onChange={(e) => handleEditChange('cash', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                                placeholder="0"
                              />
                            ) : (
                              `₹${report.cash.toLocaleString()}`
                            )}
                          </td>
                          
                          <td className="p-3 text-right">
                            {editingId === report.id ? (
                              <input
                                type="number"
                                value={editData.market}
                                onChange={(e) => handleEditChange('market', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                                placeholder="0"
                              />
                            ) : (
                              `₹${report.market.toLocaleString()}`
                            )}
                          </td>
                          
                          <td className="p-3 text-right">
                            {editingId === report.id ? (
                              <input
                                type="number"
                                value={editData.card}
                                onChange={(e) => handleEditChange('card', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                                placeholder="0"
                              />
                            ) : (
                              `₹${report.card.toLocaleString()}`
                            )}
                          </td>
                          
                          <td className="p-3 text-right">
                            {editingId === report.id ? (
                              <input
                                type="number"
                                value={editData.expense}
                                onChange={(e) => handleEditChange('expense', e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                                placeholder="0"
                              />
                            ) : (
                              `₹${report.expense.toLocaleString()}`
                            )}
                          </td>
                          
                          <td className="p-3 text-right font-semibold bg-white/5">
                            {editingId === report.id ? (
                              <span className="text-[var(--color-gold)]">
                                ₹{(editData.cash + editData.card).toLocaleString()}
                              </span>
                            ) : (
                              `₹${(report.cash + report.card).toLocaleString()}`
                            )}
                          </td>
{/*                           
                          <td className="p-3 text-center">
                            {editingId === report.id ? (
                              <div className="flex gap-1 justify-center">
                                <button
                                  onClick={() => saveEdit(report.id, report.date, report.month)}
                                  disabled={saving}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
                                  title="Save changes"
                                >
                                  {saving ? "..." : "✓"}
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                                  title="Cancel"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEdit(report)}
                                className="bg-[var(--color-gold)] hover:opacity-90 text-black text-xs px-3 py-1 rounded transition-opacity"
                                title="Edit this record"
                              >
                                Edit
                              </button>
                            )}
                          </td> */}
                          <td className="p-3 text-center">
  {editingId === report.id ? (
    <div className="flex gap-1 justify-center">
      <button
        onClick={() => saveEdit(report.id, report.date, report.month)}
        disabled={saving}
        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded disabled:opacity-50"
        title="Save"
      >
        ✓
      </button>
      <button
        onClick={cancelEdit}
        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
        title="Cancel"
      >
        ✕
      </button>
    </div>
  ) : (
    <div className="flex gap-1 justify-center">
      <button
        onClick={() => startEdit(report)}
        className="bg-[var(--color-gold)] text-black text-xs px-3 py-1 rounded"
        title="Edit"
      >
        Edit
      </button>
      <button
        onClick={() => deleteDailyEntry(report)}
        disabled={saving}
        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
        title="Delete"
      >
        Delete
      </button>
    </div>
  )}
</td>

                        </tr>
                      ))}
                    </tbody>

                    <tfoot className="bg-white/10 sticky bottom-0 border-t border-white/20">
                      <tr className="font-semibold">
                        <td className="p-3">TOTAL</td>
                        <td className="p-3 text-right text-[var(--color-gold)]">
                          ₹{totals.cash.toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-[var(--color-gold)]">
                          ₹{totals.market.toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-[var(--color-gold)]">
                          ₹{totals.card.toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-[var(--color-gold)]">
                          ₹{totals.expense.toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-[var(--color-gold)] bg-white/5">
                          ₹{totals.dailyTotal.toLocaleString()}
                        </td>
                        <td className="p-3 text-center text-xs text-gray-500">
                          Monthly Total
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h4 className="text-sm font-semibold mb-3">
            {getCurrentMonthName()} Summary
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400">Net Balance</p>
              <p className="text-lg font-bold text-[var(--color-gold)]">
                ₹{monthlyBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Monthly Sales</p>
              <p className="text-lg font-bold">
                ₹{monthlySales.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordChange}
        shop={shop}
      />
    </div>
  );
}