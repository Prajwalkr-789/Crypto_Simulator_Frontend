"use client";
import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toastUtils } from "@/utils/toastUtils";
import { useAuth } from "@/Contexts/AuthState"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutController , isAuthenticated , username } = useAuth(); 
  const urllink = "https://api.dicebear.com/7.x/lorelei/svg?seed="
  const logout = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
  }
    )
    if (res.status === 200) {
      logoutController();
      toastUtils.showInfo("Logout successful");
      window.location.href = "/";
    }
     else {
      toastUtils.showError("Logout failed");
    }
  }
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black/70 to-transparent backdrop-blur-xl shadow-md">
        <nav className="p-4 text-white flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-white transition-colors duration-200"
          >
            Crypto<span className="">Sim</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <ul className="flex gap-8 items-center text-sm font-normal">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-zinc-300 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/cryptopricepage"
                  className="hover:text-zinc-300 transition-colors duration-200"
                >
                  Price Page
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-zinc-300 transition-colors duration-200"
                >
                  News
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/settings"
                  className="hover:text-zinc-300 transition-colors duration-200"
                >
                  Settings
                </Link>
              </li>  */}
            
             { isAuthenticated &&   <li>  <button
                  onClick={logout}
                  className="hover:text-zinc-300 transition-colors duration-200"
                >
                  Logout
                </button></li>}
              
              {!isAuthenticated ? (
                <li>
                  <Link
                    href="/signup"
                    className="text-black bg-zinc-300 px-4 py-2 rounded-full font-semibold shadow-md hover:brightness-110 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </li>
              ) : (
                <li className="flex items-center gap-2">
                  <span className="text-gray-200 font-medium">{username ? username : "Username"}</span>
                  <img
                    src={urllink + (username?.length ?? 100)}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/90 p-5 absolute top-full left-0 w-full flex flex-col gap-4 shadow-xl z-40">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/cryptopricepage", label: "Price Page" },
              { href: "/news", label: "News" },
              // { href: "/settings", label: "Settings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center text-white gap-2 text-base font-medium  hover:text-orange-400 transition-colors duration-200`}
              >
                <ChevronRight className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <div>
              {!isAuthenticated ? (
                <Link
                  href="/signup"
                  className="text-black bg-zinc-300 px-4 py-2 rounded-full font-semibold shadow-md hover:brightness-110 transition-all duration-200"
                >
                  Sign Up
                </Link>
              ) : (
                <>
                  <div
                    className={`flex items-center gap-2 text-base font-medium text-white hover:text-orange-400 transition-colors duration-200`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    Logout
                  </div>
                  <div className="flex flex-row items-center  mt-2 ml-3">
                    <img
                      src="https://api.dicebear.com/7.x/lorelei/svg?seed=100"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-white font-medium">Username</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
