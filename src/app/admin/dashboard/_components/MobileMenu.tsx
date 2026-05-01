// _components/MobileMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutBtn } from './LogoutBtn';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/admin/dashboard', label: 'Overview' },
    { href: '/admin/dashboard/completed-clients', label: 'Completed clients' },
    { href: '/admin/dashboard/review-requests', label: 'Review requests' },
    { href: '/admin/dashboard/add-client', label: 'Add Completed Client' },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-14 left-0 right-0 bottom-0 bg-gray-900 z-50 flex flex-col animate-in slide-in-from-top duration-300">
            <div className="flex-1 py-6">
              <div className="space-y-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-emerald-900 text-emerald-300'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Logout section at bottom */}
            <div className="border-t border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-sm font-medium text-emerald-300">
                    {/* You might want to pass initials as prop or get from context */}
                  </div>
                  <div className="text-white text-sm">
                    <LogoutBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}