"use client";

import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { siteData } from "@/content/index";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      // External link - navigate to page
      window.location.href = href;
    } else {
      // Internal link - scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-transparent w-full fixed  left-0 z-50 px-6 sm:px-7 lg:px-10 ${
        isScrolled
          ? "top-0 sm:top-0 lg:top-0 transition-all duration-300"
          : "top-4 sm:top-6 lg:top-10 transition-all duration-300"
      }
        }`}
    >
      <div
        className={`layout bg-white shadow-lg border border-gray-200 w-full sm:w-1/2 flex items-center justify-between rounded-full transition-all duration-300 overflow-hidden ${
          isScrolled
            ? "h-10 xs:h-12 sm:h-14 md:h-16 shadow-lg"
            : "h-12 xs:h-14 sm:h-16 md:h-20"
        }`}
      >
        {/* Logo */}
        <Link href="/home">
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className={`cursor-pointer transition-all duration-300 ${
              isScrolled
                ? "w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                : "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full w-2/3 justify-center gap-20 lg:gap-20 lg:mx-8 text-lg font-inter font-medium">
          {siteData.navigation.links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors uppercase tracking-tight duration-300 hover:text-[#FF8C00] text-xs md:text-xs lg:text-sm ${
                isScrolled ? "text-gray-700" : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart & Favorites Icons - Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 lg:gap-2 xl:gap-3">
          {/* Favorites Icon */}
          <Link
            href="/favorites"
            className="relative flex items-center justify-center p-1 lg:p-1.5 xl:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Favorites"
          >
            <Heart
              className={`w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${
                favorites.length > 0
                  ? "text-red-500 fill-current"
                  : "text-gray-600"
              }`}
            />
            {/* Favorites count badge */}
            {favorites.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10">
                <span className="text-xs text-white font-bold">
                  {favorites.length}
                </span>
              </div>
            )}
          </Link>

          <Link
            href="/checkout"
            className="relative flex items-center justify-center p-1 lg:p-1.5 xl:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Shopping Cart"
          >
            <Image
              src="/svg/cart.svg"
              alt="Shopping Cart"
              width={22}
              height={22}
              className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
              priority
            />
            {/* Cart count badge */}
            {getCartCount() > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {getCartCount()}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/20`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X size={20} className="w-5 h-5" />
          ) : (
            <Menu size={20} className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Hamburger Menu (Visible on Mobile Screens) */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 flex"
          style={{ transition: "background 0.3s" }}
        >
          {/* Slide-in menu panel */}
          <div className="layout relative w-full bg-white h-fit shadow-xl rounded-r-xl flex flex-col justify-start ">
            {/* Close button (top right of menu) */}
            <button
              className="absolute top-1 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
              {siteData.navigation.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-3 py-4 text-gray-700 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] rounded-lg transition-colors text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            {/* Favorites & Cart Links */}
            <div className="flex items-center justify-center gap-4 h-1/4 border-b border-gray-200">
              <Link
                href="/favorites"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] rounded-lg transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                Favorites
              </Link>
              <Link
                href="/checkout"
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-[#FF8C00]/10 hover:text-[#FF8C00] rounded-lg transition-colors text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/svg/cart.svg"
                  alt="Shopping Cart"
                  width={18}
                  height={18}
                  className="w-5 h-5"
                />
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
