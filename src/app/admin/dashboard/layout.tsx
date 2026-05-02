import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NavLink } from "./_components/NavLink";
import { LogoutBtn } from "./_components/LogoutBtn";
import { MobileMenu } from "./_components/MobileMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) redirect("/admin/login");

  const email = data.claims.email as string;
  const initials = email?.slice(0, 1).toUpperCase() ?? "A";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation - hidden on mobile */}
      <nav className="bg-gray-900 h-14 hidden md:flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <span className="text-white text-sm font-medium tracking-tight">
            Asktouch
          </span>
          <div className="flex items-center gap-1">
            <NavLink href="/admin/dashboard">Overview</NavLink>
            <NavLink href="/admin/dashboard/completed-clients">
              Completed clients
            </NavLink>
            <NavLink href="/admin/dashboard/professional-mail">
              Professional Mail
            </NavLink>
            <NavLink href="/admin/dashboard/add-client">
              Add Completed Client
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-medium text-emerald-300">
            {initials}
          </div>
          <LogoutBtn />
        </div>
      </nav>

      {/* Mobile Navigation - visible only on mobile */}
      <div className="md:hidden">
        <div className="bg-gray-900 h-14 flex items-center justify-between px-4">
          <span className="text-white text-sm font-medium tracking-tight">
            Asktouch
          </span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-medium text-emerald-300">
              {initials}
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>

      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}