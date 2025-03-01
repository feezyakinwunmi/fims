"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { HeaderIcons } from "@/app/components/headerIcon";
import { rootNavItems } from "@/constant";
import Link from "next/link";
import fimslogo from "@/public/fimslogo.png";




export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white text-eweko_green_dark fixed top-0 left-0 z-50 shadow-sm">
      <div className="w-[90%] md:w-[85%] mx-auto flex justify-between items-center py-3 text-center transition-all duration-500">
     <Link href="/">
        <Image
          src={fimslogo}
          alt="EwekoAggregate"
          className="w-[100px] max-h-auto object-contain"
          loading="eager"
        />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="sm3:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm3:flex items-center">
          {rootNavItems.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className="px-4 md:px-6 py-3 uppercase font-bold transition-all duration-500 text-sm hover:text-eweko_green_light"
            >
              {item.name}
            </Link>
          ))}
          <HeaderIcons />
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-[50%] h-auto bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-[90%] mx-auto py-4">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 focus:outline-none"
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Mobile Menu Items */}
          <nav className="flex  flex-col mt-16">
          <Image
          src={fimslogo}
          alt="EwekoAggregate"
          className="w-[50px] item-center max-h-auto object-contain"
          loading="eager"
        />
            {rootNavItems.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="px-4 py-3 hover:bg-eweko_green_dark hover:text-white uppercase font-bold text-sm hover:text-eweko_green_light"
                onClick={toggleMenu} // Close menu on link click
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 ml-[100px]">
              <HeaderIcons />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};