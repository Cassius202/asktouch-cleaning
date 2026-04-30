'use client'

import { useState, useEffect, useRef } from 'react'
import { assets } from '@/constants/assets'
import { Mail, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { MobileNavigation } from './MobileMenu'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { navLinks } from '@/constants/consts'
import { BackButton } from './BackButton'
const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [shouldShow, setShouldShow] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShouldShow(false)
      } else {
        setShouldShow(true)
      }

      setIsScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (pathname === '/book') return <BackButton />

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShow ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-3">
        <div
          className={`flex items-center justify-between gap-4 px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border transition-all duration-300 ${
            isScrolled || !isHomePage
              ? 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-lg'
              : 'bg-white/30 backdrop-blur-md border-white/20'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image unoptimized src={assets.logoGrayscale} alt="logo" width={32} height={32} className={`h-7 md:h-8 w-auto ${isHomePage && !isScrolled ? 'brightness-0 invert' : ''}`} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block flex-1">
            <Navigation isHomePage={isHomePage} isScrolled={isScrolled} />
          </nav>

          {/* Contact Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95 text-sm ${
                isHomePage && !isScrolled
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-lg transition-colors ${
              isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl">
            <MobileNavigation onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}

const Navigation = ({ isHomePage, isScrolled }: { isHomePage: boolean; isScrolled: boolean }) => {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLLIElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Text color based on background
  const textColor = isHomePage && !isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
  const dropdownBg = isHomePage && !isScrolled ? 'bg-zinc-900/95 backdrop-blur-xl border-white/10' : 'bg-white/95 backdrop-blur-xl border-gray-200'
  const dropdownText = isHomePage && !isScrolled ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const handleItemClick = (href: string) => {
    router.push(href)
    setOpenDropdown(null)
  }

  return (
    <menu className="flex items-center justify-center gap-1">
      {navLinks.map((link) => (
        <li key={link.label} className="relative list-none" ref={link.dropDown ? dropdownRef : null}>
          {link.dropDown ? (
            <div className="relative">
              <button
                onClick={() => toggleDropdown(link.label)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all font-medium text-sm ${textColor} ${
                  openDropdown === link.label ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                {link.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === link.label && (
                <div className={`absolute top-full left-0 mt-2 w-64 py-2 rounded-xl border shadow-2xl ${dropdownBg}`}>
                  {link.dropDown.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleItemClick(item.href)}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${dropdownText}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={link.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all font-medium text-sm ${textColor} hover:bg-white/5`}
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