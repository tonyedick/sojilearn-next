'use client';

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import imglogo from '../assets/img/logo-dark.png';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = usePathname()

  const navItems = [
    { name: 'Study in UK', href: '/study-in-uk' },
    { name: 'Study in Canada', href: '/study-in-canada' },
    { name: 'Study in USA', href: '/study-in-usa' },
    { name: 'Study in Germany', href: '/study-in-germany' },
    { name: 'Study in Malta', href: '/study-in-malta' },
    { name: 'Blog', href: '/blog' }
  ]

  const isActive = (path: string) => location === path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`text-dark font-medium bg-white sticky top-0 z-9999 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image src={imglogo} alt="Sojilearn logo" className="h-8 w-auto" width={140} height={60} />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-2 text-md text-base transition-all duration-200 whitespace-nowrap ${
                  isActive(item.href)
                    ? 'active text-emerald-950'
                    : 'text-gray-700 font-semibold hover:theme-bg'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 theme-bg"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Apply Button */}
          <div className="hidden md:flex">
            <Link
              href="/apply"
              onClick={(e) => { if (isActive("/apply")) e.preventDefault(); }}
              className={`btn-apply inline-flex items-center justify-center px-6 py-2.5 border-2 border-gray-200 text-base font-medium rounded-xl transition-colors ${
                isActive("/apply")
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "theme-bg text-white"
              }`}
              aria-disabled={isActive("/apply")}
            >
              Apply
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:theme-bg transition-colors"
            >
            <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <div className="px-2 py-2 border-4 border-blue-200 rounded-xl">
                  <X className="w-6 h-6" />
                </div>
              ) : (
                <div className="px-2 py-2 border-4 border-blue-200 rounded-xl">
                  <Menu className="w-6 h-6" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 mb-2 border border-border">
                <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "theme-cl theme-bg-light"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/about')
                        ? "theme-cl theme-bg-light"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/contact')
                        ? "theme-cl theme-bg-light"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="pt-3 flex flex-col gap-2">
                  <Link
                    href="/apply"
                    onClick={(e) => {
                      if (isActive("/apply")) e.preventDefault(); 
                    }}
                    aria-disabled={isActive("/apply")}
                    className={`btn-apply w-full inline-flex text-center justify-center px-4 py-3 border-2 border-gray-200 text-base font-medium rounded-xl transition-colors ${
                      isActive("/apply")
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "theme-bg text-white hover:bg-primary/100"
                    }`}
                  >
                    Apply
                  </Link>
                </div>

                {/* Footer Links on Mobile */}
                <div className="border-t border-border pt-3 grid grid-cols-3 gap-2">
                  <Link
                    href='/privacy-policy'
                    className={`block text-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/privacy-policy')
                        ? 'theme-cl theme-bg-light'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    Privacy
                  </Link>
                  <Link href="/terms-of-use" 
                     className={`block text-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/terms-of-use')
                        ? 'theme-cl theme-bg-light'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    Terms of Use
                  </Link>
                  <Link href="/disclaimer" 
                    className={`block text-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/disclaimer')
                        ? 'theme-cl theme-bg-light'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    Disclaimer
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Header
