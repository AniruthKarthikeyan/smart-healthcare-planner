"use client"

import { useState, useEffect } from "react"
import DashboardPage from "@/components/dashboard"
import DemandPage from "@/components/demand"
import OptimizationPage from "@/components/optimization"
import ScenarioPage from "@/components/scenario"
import Navigation from "@/components/navigation"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "demand" | "optimize" | "scenario">("dashboard")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) return null

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "demand" && <DemandPage />}
        {currentPage === "optimize" && <OptimizationPage />}
        {currentPage === "scenario" && <ScenarioPage />}
      </main>
    </div>
  )
}
