'use client';

import { useEffect, useState, useRef } from "react"
import { navLinks } from "@/constants/consts";
import { ChevronDown, Mail } from "lucide-react";
import Link from "next/link";

export const MobileNavigation = ({ onClose }: { onClose: () => void }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLMenuElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Close dropdown when clicking outside (regardless of menu)
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (openDropdown && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [onClose, openDropdown]);

  return (
    <menu ref={menuRef} className="space-y-1">
      {navLinks.map((link) => (
        <li key={link.label} className="list-none">
          {link.dropDown ? (
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                className="w-full flex items-center justify-between gap-3 text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-white/5 transition-all font-medium"
              >
                <span className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === link.label ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === link.label && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/10 pl-4">
                  {link.dropDown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 text-gray-600 hover:text-black px-4 py-3 rounded-lg hover:bg-white/5 transition-all font-medium"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          )}
        </li>
      ))}

      {/* Mobile Contact Button */}
      <li className="list-none pt-2 border-t border-white/10">
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-3 rounded-lg transition-all w-full"
        >
          <Mail className="w-5 h-5" />
          <span>Contact Us</span>
        </Link>
      </li>
    </menu>
  )
}