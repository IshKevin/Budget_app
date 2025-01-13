"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/transactions", label: "Transactions" },
    { href: "/reports", label: "Reports" },
    { href: "/categories", label: "Categories" },
    { href: "/budgets", label: "Budgets" },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-green-200 via-blue-200 to-white border-b shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/assets/logo.png"
            alt="App Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="text-lg font-extrabold text-green-600">
            FinanceApp
          </span>
        </Link>

        
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-green-700",
                pathname === link.href
                  ? "text-green-600 underline underline-offset-4"
                  : "text-gray-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LogoutLink>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition text-sm">
              Log out
            </button>
          </LogoutLink>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-green-700",
                  pathname === link.href ? "text-green-600 underline" : "text-gray-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <LogoutLink>
              <button className="w-full px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition">
                Log out
              </button>
            </LogoutLink>
          </nav>
        </div>
      )}
    </header>
  );
}
