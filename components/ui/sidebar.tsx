"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  BarChart2, 
  Lightbulb, 
  Map, 
  MessageSquare, 
  Settings,
  Menu,
  X,
  Sparkles,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SettingsModal } from "./settings-modal"

const navItems = [
  { name: "Overview", id: "overview", icon: LayoutDashboard },
  { name: "Platform Comparison", id: "comparison", icon: BarChart2 },
  { name: "Insights & Themes", id: "insights", icon: Lightbulb },
  { name: "Product Intelligence", id: "product-intelligence", icon: Brain },
  { name: "Action Roadmap", id: "roadmap", icon: Map },
  { name: "Reviews Explorer", id: "reviews", icon: MessageSquare },
  { name: "Chat with AI", id: "chat", icon: Sparkles },
]

interface SidebarProps {
  activeView: string
  onNavigate: (viewId: string) => void
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  const handleNavigate = (viewId: string) => {
    onNavigate(viewId)
    setIsMobileOpen(false) // Close sidebar on mobile after navigation
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "flex flex-col h-screen w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 transition-all duration-300 relative z-40",
        // Mobile: fixed position, slide in/out
        "fixed lg:relative",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              I
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">Insight AI</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Multi-Platform Analyzer</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-gray-100"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500")} />
                {item.name}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-neutral-800 relative">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-gray-100 transition-all"
          >
            <Settings className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            Settings
          </button>
          <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
      </div>
    </>
  )
}
