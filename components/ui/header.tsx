"use client"

import { Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl flex items-center justify-end px-4 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-gray-400 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-neutral-900"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 dark:bg-neutral-800 mx-2"></div>
        <div className="flex items-center gap-3 ml-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Product Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}
