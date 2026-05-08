import { assets } from "@/constants/assets";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-zinc-200 px-6 md:px-8 py-5">
      <div className="flex items-center justify-between">
        
        {/* Left Content */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-500 tracking-wide uppercase">
            Dashboard
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">
            Hello, Mr. Ask 👋
          </h2>

          <p className="text-sm md:text-base text-zinc-500">
            See your analytics that matter
          </p>
        </div>

        {/* Right Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-semibold text-zinc-900">
              Admin
            </p>

            <p className="text-xs text-zinc-500">
              Welcome back
            </p>
          </div>

          <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-zinc-200 shadow-sm">
            <Image
              src={assets.owner}
              alt="Owner image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}