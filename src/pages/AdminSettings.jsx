import { useState } from "react";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";

export default function AdminSettings() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= REAUTH ================= */
  const reAuth = async () => {
    if (!user?.email) throw new Error("No user found");

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await reauthenticateWithCredential(user, credential);
  };

  /* ================= UPDATE EMAIL ================= */
  const handleUpdateEmail = async () => {
    if (!currentPassword || !newEmail) {
      setError("Current password and new email required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await reAuth();
      await updateEmail(user, newEmail);

      setMessage("✅ Email updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE PASSWORD ================= */
  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError("Current password and new password required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await reAuth();
      await updatePassword(user, newPassword);

      setMessage("✅ Password updated successfully");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col">
      <AppHeader title="Admin Settings" back onBack={() => navigate(-1)} />

      <div className="flex-1 p-4 space-y-6 pb-24">

        {/* CURRENT INFO */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="font-semibold">{user?.email}</p>
        </div>

        {/* CURRENT PASSWORD */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <p className="text-sm font-semibold mb-3">Security Check</p>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
        </div>

        {/* CHANGE EMAIL */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <p className="text-sm font-semibold mb-3">
            Change Email (Username)
          </p>

          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />

          <button
            onClick={handleUpdateEmail}
            disabled={loading}
            className="w-full bg-[var(--color-gold)] text-black py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            Update Email
          </button>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-[var(--color-panel)] p-4 rounded-xl border border-white/10">
          <p className="text-sm font-semibold mb-3">
            Change Password
          </p>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />

          <button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full bg-white/5 border border-white/10 py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            Update Password
          </button>
        </div>

        {/* MESSAGE */}
        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
