import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { rtdb } from "../firebase";

export default function AdminShopDetails() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [reports, setReports] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SHOP + REPORTS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Shop Info
        const shopSnap = await get(ref(rtdb, `shops/${shopId}`));
        if (!shopSnap.exists()) {
          alert("Shop not found");
          navigate(-1);
          return;
        }
        setShop(shopSnap.val());

        // 2️⃣ Reports
        const reportSnap = await get(ref(rtdb, `dailyAccounts/${shopId}`));

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

  /* ================= TOTALS ================= */
  const totals = reports.reduce(
    (acc, r) => {
      acc.cash += r.cash;
      acc.market += r.market;
      acc.card += r.card;
      acc.expense += r.expense;
      return acc;
    },
    { cash: 0, market: 0, card: 0, expense: 0 },
  );

  /* ================= MONTHLY SALES ================= */
  const monthlySales = totals.cash + totals.card + totals.expense;

  /* ================= MONTHLY BALANCE ================= */
  const monthlyBalance =
    openingBalance + totals.cash + totals.card - totals.market;

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading shop details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)}>←</button>
        <h2 className="text-lg">Shop Details</h2>
      </div>

      {/* Shop Info */}
      <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10 mb-4">
        <h3 className="text-xl font-semibold">{shop.place}</h3>
        <p className="text-gray-400 text-sm">📧 {shop.email}</p>
        <p className="text-gray-400 text-sm">📞 {shop.phone || "N/A"}</p>
      </div>

      {/* 🔹 SUMMARY */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-400">Opening Balance</p>
          <p className="text-lg font-semibold">₹{openingBalance}</p>
        </div>

        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-400">Monthly Sales</p>
          <p className="text-lg font-semibold">₹{monthlySales}</p>
        </div>

        <div className="bg-[var(--color-gold)] text-black p-3 rounded-lg text-center">
          <p className="text-xs">Monthly Balance</p>
          <p className="text-lg font-bold">₹{monthlyBalance}</p>
        </div>
      </div>

      {/* Reports Table */}
      {reports.length === 0 ? (
        <div className="text-center text-gray-400">
          No account records found
        </div>
      ) : (
        <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
          <thead className="bg-white/5">
            <tr>
              <th className="p-2 text-left">DATE</th>
              <th className="p-2 text-right">CASH</th>
              <th className="p-2 text-right">MARKET</th>
              <th className="p-2 text-right">CARD</th>
              <th className="p-2 text-right">EXPENSE</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-2">{r.date}</td>
                <td className="p-2 text-right">₹{r.cash}</td>
                <td className="p-2 text-right">₹{r.market}</td>
                <td className="p-2 text-right">₹{r.card}</td>
                <td className="p-2 text-right">₹{r.expense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
