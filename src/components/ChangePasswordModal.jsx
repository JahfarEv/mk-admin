// // components/ChangePasswordModal.jsx
// import { useState } from "react";

// export default function ChangePasswordModal({ open, onClose, onSubmit, shop }) {
//   const [form, setForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!open) return null;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(""); // Clear error on change
//   };

//   const handleSubmit = async () => {
//     // Validation
//     if (!form.currentPassword) {
//       setError("Current password is required");
//       return;
//     }
//     if (!form.newPassword) {
//       setError("New password is required");
//       return;
//     }
//     if (form.newPassword.length < 6) {
//       setError("New password must be at least 6 characters");
//       return;
//     }
//     if (form.newPassword !== form.confirmPassword) {
//       setError("New passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       await onSubmit(form);
//       onClose();
//       setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (err) {
//       setError(err.message || "Failed to change password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
//       <div className="w-full max-w-sm bg-[var(--color-panel)] text-white rounded-2xl p-5 border border-white/10 shadow-xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h3 className="text-lg font-semibold">Change Shop Password</h3>
//             <p className="text-xs text-gray-400">
//               {shop?.place || "Shop"} • Update login credentials
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-xl text-gray-400 hover:text-white"
//             disabled={loading}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
//             <p className="text-sm text-red-400">{error}</p>
//           </div>
//         )}

//         {/* Current Password */}
//         <div className="mb-3">
//           <label className="text-sm text-gray-300">Current Password</label>
//           <input
//             type="password"
//             name="currentPassword"
//             placeholder="Enter current password"
//             value={form.currentPassword}
//             onChange={handleChange}
//             disabled={loading}
//             className="mt-1 w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-[var(--color-gold)] disabled:opacity-50"
//           />
//         </div>

//         {/* New Password */}
//         <div className="mb-3">
//           <label className="text-sm text-gray-300">New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             placeholder="Enter new password"
//             value={form.newPassword}
//             onChange={handleChange}
//             disabled={loading}
//             className="mt-1 w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-[var(--color-gold)] disabled:opacity-50"
//           />
//         </div>

//         {/* Confirm New Password */}
//         <div className="mb-5">
//           <label className="text-sm text-gray-300">Confirm New Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm new password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             disabled={loading}
//             className="mt-1 w-full px-3 py-2 rounded-lg bg-transparent border border-white/20 focus:outline-none focus:border-[var(--color-gold)] disabled:opacity-50"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Password must be at least 6 characters long
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="flex-1 py-2 rounded-lg border border-white/30 text-gray-300 hover:bg-white/10 disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="flex-1 py-2 rounded-lg bg-[var(--color-gold)] text-black font-semibold disabled:opacity-50 flex items-center justify-center"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
//                 Updating...
//               </>
//             ) : (
//               "UPDATE PASSWORD"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";

export default function ChangePasswordModal({ open, onClose, onSubmit, shop }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (newPassword.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ newPassword });
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (err) {
      alert(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[var(--color-panel)] text-white rounded-xl p-5 border border-white/10">

        <h3 className="text-lg font-semibold mb-1">
          Change Shop Password
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Shop: {shop?.place}
        </p>

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-3 bg-transparent border border-white/20 p-2 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 bg-transparent border border-white/20 p-2 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/30 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="flex-1 bg-[var(--color-gold)] text-black py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
