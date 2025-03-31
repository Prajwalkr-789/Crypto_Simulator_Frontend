'use client';
import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 z-50 w-full backdrop-blur-lg bg-black/50">
      <nav className="p-4 text-white flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">Crypto Simulator</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="list-none flex gap-6 items-center">
            <li><Link href="/dashboard" className="text-white no-underline hover:text-gray-300">Dashboard</Link></li>
            <li><Link href="/portfolio" className="text-white no-underline hover:text-gray-300">Portfolio</Link></li>
            <li><Link href="/news" className="text-white no-underline hover:text-gray-300">News</Link></li>
            <li><Link href="/settings" className="text-white no-underline hover:text-gray-300">Settings</Link></li>
            <li><Link href="/signup" className="text-gray-800 bg-gray-200 border px-2 py-1 rounded-lg font-semibold no-underline hover:text-orange-400">Signup</Link></li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black p-4 absolute top-14 left-0 w-full flex flex-col gap-4">
          <Link href="/dashboard" className="text-white flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Dashboard</Link>
          <Link href="/portfolio" className="text-white flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Portfolio</Link>
          <Link href="/news" className="text-white flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> News</Link>
          <Link href="/settings" className="text-white flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Settings</Link>
          <Link href="/signup" className="text-gray-500 border font-semibold flex items-center"><ChevronRight className="w-4 h-4 mr-2" /> Signup</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
