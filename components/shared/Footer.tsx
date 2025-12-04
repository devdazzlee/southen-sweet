"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { siteData } from "@/content/index";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscriptionMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubscriptionMessage("Successfully subscribed! Thank you.");
        setEmail("");
      } else {
        setSubscriptionMessage(
          data.message || "Subscription failed. Please try again."
        );
      }
    } catch (error) {
      setSubscriptionMessage("An error occurred. Please try again.");
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionMessage(""), 5000);
    }
  };

  return (
    <footer className="bg-[#E85A2D] pt-6 sm:pt-8 md:pt-12 lg:pt-12 xl:pt-16">
      <div className="layout w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <h3 className="text-4xl text-white sm:text-4xl md:text-5xl font-inter lg:text-5xl xl:text-6xl font-semibold uppercase tracking-wide mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          CONTACT US
        </h3>

        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row w-full h-full gap-8 sm:gap-10 mb-8 md:gap-12 lg:gap-16">
          {/* Left Column - Contact Us & Subscription */}
          <div className=" flex flex-col items-start justify-between w-full lg:w-2/3 gap-20 sm:gap-10 md:gap-20 lg:gap-20">
            {/* Email Subscription */}
            <form onSubmit={handleNewsletterSubscribe} className="w-full">
              <div className="flex w-full max-w-2xl h-10 sm:h-12 md:h-14 gap-2 border-2 border-white items-center rounded-xl overflow-hidden mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="bg-transparent text-white placeholder-white/70 w-full h-full px-3 sm:px-4 md:px-6 text-sm sm:text-base font-inter focus:outline-none"
                  required
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#FBC332] text-black px-4 sm:px-6 rounded-xl md:px-8 h-full text-xs sm:text-sm md:text-base font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap disabled:opacity-50"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe Free"}
                </button>
              </div>
              {subscriptionMessage && (
                <p className="text-white text-sm mt-2">{subscriptionMessage}</p>
              )}
            </form>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full md:gap-16 ">
              <span className=" flex flex-col gap-1 ">
                <h4 className="text-sm sm:text-sm md:text-base lg:text-base tracking-wide font-bold font-inter text-white">
                  Phone
                </h4>
                <a
                  href="tel:+19197019321"
                  className="text-white font-inter font-regular tracking-wide text-xs sm:text-xs md:text-sm lg:text-base hover:text-[#FBC332] transition-colors"
                >
                  +1 919-701-9321
                </a>
              </span>

              <span className=" flex flex-col gap-1">
                <h4 className="text-sm sm:text-sm md:text-base lg:text-base tracking-wider font-bold font-inter text-white">
                  Address
                </h4>
                <p className="text-white font-inter font-regular  tracking-wide text-xs sm:text-xs md:text-sm lg:text-base ">
                  4363 Ocean Farm Dr, Summerville, SC 29485
                </p>
              </span>

              <span className=" flex flex-col gap-1 ">
                <h4 className="text-sm sm:text-sm md:text-base lg:text-base tracking-wider font-bold font-inter text-white">
                  Email
                </h4>
                <a
                  href="mailto:info@licorice4good.com"
                  className="text-white font-inter font-regular tracking-wide text-xs sm:text-xs md:text-sm lg:text-base hover:text-[#FBC332] transition-colors"
                >
                  info@licorice4good.com
                </a>
              </span>
            </div>
          </div>

          {/* Right Column - Navigation Links */}
          <div className="grid grid-cols-1 w-full lg:w-1/2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Contact Us Links */}
            <span className="flex flex-col gap-2 ">
              <h4 className="text-sm sm:text-sm md:text-base lg:text-base tracking-wider font-bold font-inter text-white">
                CONTACT US
              </h4>
              <div className=" flex flex-col justify-between tracking-tight gap-2">
                <Link
                  href="/contact"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Contact us
                </Link>
                <Link
                  href="/delivery-and-return"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Delivery and return
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Terms and conditions
                </Link>
                <Link
                  href="/faqs"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  FAQs
                </Link>
                <Link
                  href="/accessibility"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Accessibility
                </Link>
              </div>
            </span>

            {/* About Links */}
            <span className="flex flex-col gap-2 ">
              <h4 className="text-sm sm:text-sm md:text-base lg:text-base tracking-wider font-bold font-inter uppercase text-white">
                ABOUT
              </h4>
              <div className="flex flex-col justify-between tracking-tight gap-2">
                <Link
                  href="/our-story"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Our story
                </Link>
                <Link
                  href="/careers"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Careers
                </Link>
                <Link
                  href="/corporate-gifts"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Corporate gifts
                </Link>
              </div>
            </span>

            {/* Social Links */}
            <span className="flex flex-col gap-2">
              <h4 className="text-sm sm:text-base md:text-lg lg:text-sm font-bold font-inter mb-3 sm:mb-4 md:mb-5 lg:mb-6 uppercase tracking-wide text-white">
                SOCIAL
              </h4>

              {/* Social Links List */}
              <div className="flex flex-col justify-between gap-2">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Instagram
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Twitter
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs leading-8 sm:text-xs md:text-sm lg:text-base text-white hover:text-[#FBC332] transition-all duration-300 hover:translate-x-1"
                >
                  Facebook
                </Link>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-2 text-xs text-white sm:text-sm md:text-base lg:text-lg">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <BsFacebook />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                    X
                  </span>
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12   flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <FaInstagram />
                </Link>
              </div>
            </span>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <div className="border-t border-white/90 flex flex-col md:flex-row items-center justify-center md:justify-between w-full py-4 gap-2">
          <Link
            href="/privacy-policy"
            className="text-white font-inter uppercase text-xs text-center md:text-left tracking-wide w-full md:w-auto hover:text-[#FBC332] transition-colors"
          >
            PRIVACY POLICY
          </Link>

          <div className="text-white font-inter uppercase text-xs text-center md:text-left tracking-wide w-full md:w-auto">
            © {currentYear} LICORICE ROPES. ALL RIGHTS RESERVED
          </div>

          <Link
            href="/terms-of-service"
            className="text-white font-inter uppercase text-xs text-center md:text-left tracking-wide w-full md:w-auto hover:text-[#FBC332] transition-colors"
          >
            TERMS OF SERVICE
          </Link>
        </div>
      </div>
    </footer>
  );
}
