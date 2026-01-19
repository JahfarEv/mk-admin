import { useState } from "react";

export default function CreateShopModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    place: "",
    phone: "",
    password: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    setForm({ place: "", phone: "", password: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="w-full max-w-sm bg-[var(--color-panel)] text-white rounded-2xl p-5 border border-white/10 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Create New Shop</h3>
            <p className="text-xs text-gray-400">
              Add a new shop location and login details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Shop Place */}
        <div className="mb-3">
          <label className="text-sm text-gray-300">Shop Place</label>
          <input
            name="place"
            placeholder="e.g. Bangalore, Citywalk Mumbai"
            value={form.place}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-[var(--color-gold)]"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-3">
          <label className="text-sm text-gray-300">Contact Number</label>
          <div className="mt-1 flex items-center gap-2 border border-[var(--color-gold)]/50 rounded-lg px-3 py-2">
            <span className="text-[var(--color-gold)]">📞</span>
            <input
              name="phone"
              placeholder="+91 9XXXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="text-sm text-gray-300">Create Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-[var(--color-gold)]"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-white/30 text-gray-300 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-lg bg-[var(--color-gold)] text-black font-semibold"
          >
            CREATE SHOP
          </button>
        </div>

      </div>
    </div>
  );
}
