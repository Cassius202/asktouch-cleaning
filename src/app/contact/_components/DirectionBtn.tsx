"use client";

import { Navigation } from "lucide-react";

export const DirectionButton = () => {
  return (
    <button
      onClick={() =>
        window.open(
          "https://www.google.com/maps/dir/?api=1&destination=7.435849999999998,3.888326699999994",
          "_blank",
        )
      }
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm active:scale-[0.98]"
    >
      Get directions
      <Navigation className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600" />
    </button>
  );
};
