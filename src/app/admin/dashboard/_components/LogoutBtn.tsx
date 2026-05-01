"use client";

import { LogOut } from "lucide-react";
import { handleSignOut } from "../../actions/handleSignOut";
import toast from "react-hot-toast";

export function LogoutBtn() {
  const handleLogout = async () => {
    const res = await handleSignOut();

    if (!res.success) {
      console.error('Logout failed:', res.message);
      toast.error(res.message);
      return;
    }
  }
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 px-3 py-1.5 text-sm text-rose-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}
