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



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { rtdb } from "../firebase";
import AppHeader from "../components/AppHeader";

export default function AdminShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [allReports, setAllReports] = useState([]); // Store all reports
  const [reports, setReports] = useState([]); // Only current month reports
  const [openingBalance, setOpeningBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    cash: 0,
    market: 0,
    card: 0,
    expense: 0
  });

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
        setShop(shopSnap.val());

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

  const monthlySales = totals.cash + totals.card + totals.expense;

  const monthlyBalance =
    openingBalance + totals.cash + totals.card - totals.market;

  /* ================= SAVE OPENING BALANCE (ADMIN) ================= */
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
      
      // Update in Firebase
      await set(
        ref(rtdb, `dailyAccounts/${shopId}/${month}/${date}`),
        {
          cash: Number(editData.cash),
          market: Number(editData.market),
          card: Number(editData.card),
          expense: Number(editData.expense)
        }
      );

      // Update all reports
      const updatedAllReports = allReports.map(report => 
        report.id === reportId 
          ? { ...report, ...editData }
          : report
      );
      
      // Update current month reports
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
            <p className="text-xs font-medium opacity-90">Current Balance</p>
            <p className="text-2xl font-bold mt-2 tracking-tight">
              ₹{monthlyBalance.toLocaleString()}
            </p>
            <p className="text-[10px] opacity-75 mt-1">Updated in real-time</p>
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
              {/* Simple Table Container - No limits, just scroll */}
              <div className="border border-white/10 rounded-xl overflow-hidden h-[60vh]">
                <div className="h-full overflow-y-auto overflow-x-auto hide-scrollbar">
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
                          
                          {/* CASH Column */}
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
                          
                          {/* MARKET Column */}
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
                          
                          {/* CARD Column */}
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
                          
                          {/* EXPENSE Column */}
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
                          
                          {/* DAILY TOTAL Column */}
                          <td className="p-3 text-right font-semibold bg-white/5">
                            {editingId === report.id ? (
                              <span className="text-[var(--color-gold)]">
                                ₹{(editData.cash + editData.card).toLocaleString()}
                              </span>
                            ) : (
                              `₹${(report.cash + report.card).toLocaleString()}`
                            )}
                          </td>
                          
                          {/* ACTION Column */}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    {/* STICKY FOOTER */}
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

              {/* Simple scroll hint */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  Swipe left/right to see all columns • Click "Edit" to modify records
                </p>
              </div>
            </>
          )}
        </div>

        {/* 🔹 MONTHLY SUMMARY - AT THE VERY BOTTOM */}
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
    </div>
  );
}