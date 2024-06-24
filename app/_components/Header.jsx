"use client";
import Image from "next/image";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
          <Link className="block text-teal-600 z-50" href="/">
            <Image src="/logo.svg" width={150} height={100} alt="logo" />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              {/* <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Blog
                  </Link>
                </li>
              </ul> */}
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 z-50 cursor-pointer">
                <Link
                  className="hidden md:block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary"
                  href="/upload"
                >
                  Get Started
                </Link>
              </div>

              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden z-50"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="bg-white w-64 h-full shadow-lg transform transition-transform duration-400"
              style={{
                transform: isMobileMenuOpen
                  ? "translateX(0)"
                  : "translateX(-100%)",
              }}
            >
              <div className="mt-6 px-3 flex justify-between">
                <Image src="logo.svg" width={70} height={70} alt="/" />
                <UserButton afterSignOutUrl="/" />
              </div>
              <nav aria-label="Global" className="md:hidden">
                <ul className="flex flex-col items-center gap-6 text-sm mt-10">
                  <li>
                    <Link
                      href="/upload"
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={toggleMobileMenu}
                    >
                      Upload
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/files"
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={toggleMobileMenu}
                    >
                      Files
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/about"
                      onClick={toggleMobileMenu}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex-1" onClick={toggleMobileMenu}></div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
