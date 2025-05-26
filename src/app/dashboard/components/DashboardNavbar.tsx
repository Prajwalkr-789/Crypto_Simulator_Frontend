import Home from '@/app/page'
import { motion } from 'framer-motion'
import { Menu, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function DashboardNavbar({toggleSidebar , isSidebarOpen}: { toggleSidebar: () => void , isSidebarOpen: boolean}) {
  return (
    <div className='flex w-full h-full mt-14'>
       <motion.div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-zinc-900 hidden md:block text-white transition-all duration-500 ease-in-out flex flex-col items-center py-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-between w-full px-4">
            <h1
              className={`text-xl font-bold ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              CryptoSim
            </h1>
            <button onClick={toggleSidebar} className="text-white text-2xl">
              {isSidebarOpen ? (
                <Menu size={20} className="text-gray-200" />
              ) : (
                <Menu size={20} className="text-gray-200" />
              )}
            </button>
          </div>


          {/* Navigation Items */}
          <nav className="mt-6 w-full">
            <ul className="space-y-4 flex flex-col justify-start py-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <Home className="w-6 h-6" />
                  {isSidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <a
                  href="/profile"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <User className="w-6 h-6" />
                  {isSidebarOpen && <span>Transaction History</span>}
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  <Settings className="w-6 h-6" />
                  {isSidebarOpen && <span>Settings</span>}
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
    </div>
  )
}

export default DashboardNavbar
