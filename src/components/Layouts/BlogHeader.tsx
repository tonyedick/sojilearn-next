'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../assets/img/logo-dark.png";
import "../ExternalCSS/main.css";

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchParams = useSearchParams();

  const categories = [
  { name: "All Posts", slug: "all" },
  { name: "Study Abroad", slug: "Study Abroad" },
  { name: "Scholarships", slug: "Scholarships" },
  { name: "Success Stories", slug: "Success Stories" },
  { name: "Visa and Immigration", slug: "Visa and Immigration" },
  { name: "Scholarships and Grants", slug: "Scholarships and Grants" },
  { name: "SOP", slug: "SOP" },
];

  const currentCategory = searchParams?.get("category") || "all";
  const isActive = (slug: string) => currentCategory === slug;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`text-dark font-medium bg-white text-gray-900 sticky top-0 z-9 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/blog" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src={logo}
                alt="Sojilearn Blog Logo"
                className="h-8 w-auto"
                width={140} height={60}
              /> 
            </motion.div>
          </Link>

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center space-x-6">
            {categories.map((category) => {
              const href =
                category.slug === "all"
                  ? "/blog"
                  : `/blog?category=${encodeURIComponent(category.slug)}`;
              return (
                <Link
                  key={category.slug}
                  href={href}
                  className={`relative px-2 py-2 text-md font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive(category.slug)
                      ? "active font-semibold"
                      : "text-gray-600 hover:theme-bg"
                  }`}
                >
                  {category.name}
                  {isActive(category.slug) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 theme-bg"
                      layoutId="activeCategory"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-muted-foreground hover:theme-bg transition-colors"
            >
              <span className="sr-only">Toggle menu</span>
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 mb-2 border border-border">
                <div className="flex flex-col gap-1">
                {categories.map((category) => {
                  const href =
                    category.slug === "all"
                      ? "/blog"
                      : `/blog?category=${encodeURIComponent(category.slug)}`;
                  return (
                    <Link
                      key={category.slug}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(category.slug)
                          ? "theme-cl theme-bg-light"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}