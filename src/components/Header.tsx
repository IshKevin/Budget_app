"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Home,
  CreditCard,
  BarChart,
  Tag,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/Home", label: "Home", icon: Home },
    { href: "/transactions", label: "Transactions", icon: CreditCard },
    { href: "/reports", label: "Reports", icon: BarChart },
    { href: "/categories", label: "Categories", icon: Tag },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-50 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6 text-green-600" /> : <Menu className="w-6 h-6 text-green-600" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "h-screen w-64 bg-gray-50 shadow-md flex flex-col fixed z-40 transition-transform transform md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-3 p-4 border-b">
          <img
            src="/assets/logo.png"
            alt="App Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="text-lg font-extrabold text-green-600">WalletPro</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md transition",
                    pathname === href
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-green-50"
                  )}
                  onClick={() => setIsOpen(false)} // Close sidebar on link click
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t">
          <LogoutLink>
            <button
              className="flex items-center w-full space-x-3 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 rounded-md hover:bg-red-100 transition"
              onClick={() => setIsOpen(false)} // Close sidebar on logout
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </LogoutLink>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
