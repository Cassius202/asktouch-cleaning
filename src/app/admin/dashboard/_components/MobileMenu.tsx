'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutBtn } from './LogoutBtn';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/admin/dashboard', label: 'Overview' },
    { href: '/admin/dashboard/completed-clients', label: 'Completed clients' },
    { href: '/admin/dashboard/review-requests', label: 'Review requests' },
    { href: '/admin/dashboard/professional-mail', label: 'Professional Mail' },
    { href: '/admin/dashboard/add-client', label: 'Add Completed Client' },
    { href: '/admin/dashboard/create-blog', label: 'Create Blog' },
    { href: '/admin/dashboard/blogs', label: 'Blog List' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors z-50 relative"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 flex flex-col transition-transform duration-300"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-800">
          <span className="text-white font-medium">Asktouch</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block w-full px-3 py-2 rounded-md text-sm transition-all ${
                  active
                    ? 'bg-emerald-800/40 text-white border-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 p-4">
          <LogoutBtn />
        </div>
      </div>
    </>
  );
}