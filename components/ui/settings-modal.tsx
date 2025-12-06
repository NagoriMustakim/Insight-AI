"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Settings, LogOut, FileText, User, Building2, Key, X, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme()
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="absolute bottom-full mb-2 left-0 z-50 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200" ref={modalRef}>
      <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">User</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-black px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Sign out
        </button>
      </div>

      <div className="py-2">
        <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="text-sm">Dark Mode</span>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
              theme === "dark" ? "bg-indigo-600" : "bg-gray-200"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <Building2 className="h-4 w-4" />
          <span className="text-sm">MY TEST COMPANY A/S</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <Key className="h-4 w-4" />
          <div className="h-4 w-20 bg-gray-100 dark:bg-neutral-800 rounded"></div>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <X className="h-4 w-4" />
          <span className="text-sm">Clear log file</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <FileText className="h-4 w-4" />
          <span className="text-sm">Get log file</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Change customer</span>
        </div>

        <div className="px-4 py-3 flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors border-t border-gray-100 dark:border-neutral-800 mt-2">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </div>
  )
}
