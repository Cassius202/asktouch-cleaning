'use client'

import { useState, useEffect } from 'react'
import { assets } from '@/constants/assets'
import { Home, Briefcase, Info, Mail, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { MobileNavigation } from './MobileMenu'
import Image from 'next/image'

export const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  {
    label: 'Services',
    href: '/services',
    icon: Briefcase,
    dropDown: [
      { label: 'Residential & Office Cleaning', href: '/services/residential-and-office-cleaning' },
      { label: 'Pest Control & Fumigation', href: '/services/pest-control-and-fumigation' },
      { label: 'Healthy & Pest-Free Spaces', href: '/services/healthy-and-pest-free-spaces' }
    ]
  },
  {
    label: 'About',
    href: '/about',
    icon: Info
  }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [shouldShow, setShouldShow] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Headroom effect
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShouldShow(false) // Scrolling down
      } else {
        setShouldShow(true) // Scrolling up
      }

      // Blur/background effect
      setIsScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShow ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-3">
        <div
          className={`flex items-center justify-between gap-4 px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-zinc-900/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/20'
              : 'bg-zinc-900/40 backdrop-blur-md border-white/5'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image unoptimized src={assets.logoGrayscale} alt="logo" width={32} height={32} className="invert h-7 md:h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-1">
            <Navigation />
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95 text-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
            <MobileNavigation onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <menu className="flex items-center justify-center gap-1">
      {navLinks.map((link) => (
        <li key={link.label} className="relative list-none">
          {link.dropDown ? (
            <div
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
              className="relative"
            >
              <button className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all font-medium text-sm">
                {link.label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-2 w-64 py-2 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                  {link.dropDown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
              className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all font-medium text-sm"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </menu>
  )
}

export default Header