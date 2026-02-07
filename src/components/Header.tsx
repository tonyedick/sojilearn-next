'use client';

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import imglogo from '../assets/img/logo-dark.png';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import '../components/ExternalCSS/main.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = usePathname()

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Study in UK', href: '/study-in-uk' },
    { name: 'Study in Canada', href: '/study-in-canada' },
    { name: 'Study in USA', href: '/study-in-usa' },
    { name: 'Study in Germany', href: '/study-in-germany' },
    { name: 'Study in Malta', href: '/study-in-malta' },
    { name: 'Visit our Blog', href: '/blog' }
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
      className={`text-dark tw-font-medium tw-bg-white tw-sticky tw-top-0 tw-z-[9999] ${
        scrolled ? 'tw-shadow-md' : ''
      }`}
    >
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-items-center tw-justify-between tw-h-16">
          {/* Logo */}
          <Link href="/" className="tw-flex tw-items-center tw-space-x-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image src={imglogo} alt="Sojilearn logo" className="tw-h-8 tw-w-auto" width={140} height={40} />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="tw-hidden md:tw-flex tw-items-center tw-space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`tw-px-2 tw-py-2 tw-text-md tw-font-semibold tw-transition-all tw-duration-200 tw-whitespace-nowrap ${
                  isActive(item.href)
                    ? 'active tw-font-semibold'
                    : 'tw-text-gray-600 hover:theme-bg'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-0.5 theme-bg"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Apply Button */}
          <div className="tw-hidden md:tw-flex">
            {/* <Link
              to="/apply"
              className="tw-inline-flex tw-items-center tw-justify-center tw-px-6 tw-py-2.5 tw-border-2 tw-border-gray-200 tw-text-base tw-font-medium tw-rounded-xl theme-bg tw-text-white hover:theme-bg/100 tw-transition-colors"
            > */}
            <Link
              href="/apply"
              onClick={(e) => {
                if (isActive("/apply")) e.preventDefault(); 
              }}
              className={`tw-inline-flex tw-items-center tw-justify-center tw-px-6 tw-py-2.5 tw-border-2 tw-border-gray-200 tw-text-base tw-font-medium tw-rounded-xl tw-transition-colors ${
                isActive("/apply")
                  ? "tw-bg-gray-200 tw-text-gray-500 tw-cursor-not-allowed"
                  : "theme-bg tw-text-white hover:tw-bg-primary/100"
              }`}
              aria-disabled={isActive("/apply")}
            >
              Apply
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:tw-hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="tw-p-2 tw-rounded-md tw-text-muted-foreground hover:tw-text-foreground tw-transition-colors"
            >
            <span className="tw-sr-only">Open main menu</span>
              {isMenuOpen ? (
                <div className="tw-px-2 tw-py-2 tw-border-4 tw-border-blue-200 tw-rounded-xl">
                  <X className="tw-w-6 tw-h-6" />
                </div>
              ) : (
                <div className="tw-px-2 tw-py-2 tw-border-4 tw-border-blue-200 tw-rounded-xl">
                  <Menu className="tw-w-6 tw-h-6" />
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
              className="md:tw-hidden"
            >
              <div className="tw-px-2 tw-pt-2 tw-pb-3 tw-space-y-1 sm:tw-px-3 tw-bg-card tw-rounded-lg tw-mt-2 tw-border tw-border-border">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-transition-colors ${
                      isActive(item.href)
                        ? "theme-cl theme-bg-light"
                        : "tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-transition-colors ${
                      isActive('/contact')
                        ? "theme-cl theme-bg-light"
                        : "tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted"
                    }`}
                  >
                    Contact Us
                  </Link>
                <div className="tw-pt-3 tw-flex tw-flex-col tw-gap-2">
                  <Link
                    href="/apply"
                    onClick={(e) => {
                      if (isActive("/apply")) e.preventDefault(); 
                    }}
                    aria-disabled={isActive("/apply")}
                    className={`tw-w-full tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-3 tw-border-2 tw-border-gray-200 tw-text-base tw-font-medium tw-rounded-xl tw-transition-colors ${
                      isActive("/apply")
                        ? "tw-bg-gray-200 tw-text-gray-500 tw-cursor-not-allowed"
                        : "theme-bg tw-text-white hover:tw-bg-primary/100"
                    }`}
                  >
                    Apply
                  </Link>
                  <Link
                    href="/blog"
                    className="tw-w-full tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-3 tw-border-2 tw-border-gray-200 tw-text-base tw-font-medium tw-rounded-xl tw-text-gray-700 tw-hover:bg-primary/5 tw-transition-colors"
                  >
                    Visit our Blog
                  </Link>
                </div>

                {/* Footer Links on Mobile */}
                <div className="tw-border-t tw-border-border tw-pt-3 tw-grid tw-grid-cols-3 tw-gap-2">
                  <Link
                    href='/privacy-policy'
                    className={`tw-block tw-text-center tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-transition-colors ${
                      isActive('/privacy-policy')
                        ? 'theme-cl theme-bg-light'
                        : 'tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted'
                    }`}
                  >
                    Privacy
                  </Link>
                  <Link href="/terms-of-use" 
                     className={`tw-block tw-text-center tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-transition-colors ${
                      isActive('/terms-of-use')
                        ? 'theme-cl theme-bg-light'
                        : 'tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted'
                    }`}
                  >
                    Terms of Use
                  </Link>
                  <Link href="/disclaimer" 
                    className={`tw-block tw-text-center tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium tw-transition-colors ${
                      isActive('/disclaimer')
                        ? 'theme-cl theme-bg-light'
                        : 'tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-muted'
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
