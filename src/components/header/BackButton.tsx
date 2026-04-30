"use client";

import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  
  return (
    <div className="bg-green-500/20 backdrop-blur-sm rounded-full fixed top-0 left-8 z-150 transition-all duration-300 translate-y-6 btn p-2.5 hover:scale-105 cursor-pointer aspect-square"
    onClick={() => router.back()}
    >
        <ArrowLeft className="shrink-0 text-zinc-950" />
    </div>
  );
};
