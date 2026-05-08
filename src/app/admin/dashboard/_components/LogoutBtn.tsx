"use client";

import { LogOut } from "lucide-react";
import { handleSignOut } from "../../actions/handleSignOut";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export function LogoutBtn() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    const handleLogout = async () => {
    const res = await handleSignOut();

    if (!res.success) {
      console.error("Logout failed:", res.message);
      toast.error(res.message);
      return;
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md transition-all
                 text-gray-400 hover:text-red-400 hover:bg-gray-800"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}