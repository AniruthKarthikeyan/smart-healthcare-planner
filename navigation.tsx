"use client"

import type React from "react"
import { LayoutGrid, Zap, TrendingUp, HelpCircle } from "lucide-react"

interface NavigationProps {
  currentPage: "dashboard" | "demand" | "optimize" | "scenario"
  onNavigate: (page: "dashboard" | "demand" | "optimize" | "scenario") => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <aside className="w-72 border-r border-border bg-sidebar text-sidebar-foreground shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            HC
          </div>
          <h1 className="text-xl font-bold">
            HealthCare
            <br />
            Planner
          </h1>
        </div>
        <p className="text-xs text-sidebar-foreground/60">India Infrastructure Optimization</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-2">
        <NavLink
          icon={<LayoutGrid size={20} />}
          label="Dashboard"
          isActive={currentPage === "dashboard"}
          onClick={() => onNavigate("dashboard")}
        />
        <NavLink
          icon={<TrendingUp size={20} />}
          label="Demand Analysis"
          isActive={currentPage === "demand"}
          onClick={() => onNavigate("demand")}
        />
        <NavLink
          icon={<Zap size={20} />}
          label="Optimization"
          isActive={currentPage === "optimize"}
          onClick={() => onNavigate("optimize")}
        />
        <NavLink
          icon={<TrendingUp size={20} />}
          label="Scenarios"
          isActive={currentPage === "scenario"}
          onClick={() => onNavigate("scenario")}
        />
      </nav>

      {/* Help Section */}
      <div className="p-6 border-t border-sidebar-border bg-sidebar-accent/10 m-4 rounded-lg">
        <div className="flex items-start gap-3">
          <HelpCircle size={20} className="text-sidebar-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Need Help?</p>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Check parameter explanations in each section</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavLink({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
          : "text-sidebar-foreground hover:bg-sidebar-accent/20"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
