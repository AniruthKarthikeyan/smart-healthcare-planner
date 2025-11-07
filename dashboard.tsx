"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ParameterControls from "./parameter-controls"
import ParameterHelp from "./parameter-help"
import DemandChart from "./demand-chart"
import DistrictMap from "./district-map"

export default function DashboardPage() {
  const [showHelp, setShowHelp] = useState(false)
  const [params, setParams] = useState({
    budget: 50,
    maxKm: 25,
    vulnerableWeight: 1.5,
  })

  // Mock data
  const stats = [
    { label: "Districts", value: "718", subtext: "across India" },
    { label: "Coverage", value: "60.1%", subtext: "current baseline" },
    { label: "Avg Travel", value: "13.0 km", subtext: "mean distance" },
    { label: "Equity Index", value: "62.3/100", subtext: "vulnerability-weighted" },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time view of healthcare demand and facility planning
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowHelp(!showHelp)} className="gap-2">
            {showHelp ? "Hide" : "Show"} Parameter Guide
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Parameter Help Modal */}
          {showHelp && <ParameterHelp />}

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Map */}
            <Card className="col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                District Demand Heatmap
              </h3>
              <DistrictMap />
            </Card>

            {/* Parameter Controls */}
            <Card className="p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Planner Controls</h3>
              <ParameterControls params={params} onChange={setParams} />
              <Button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700">Run Optimizer</Button>
            </Card>
          </div>

          {/* Demand Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Demand Distribution</h3>
            <DemandChart />
          </Card>

          {/* Insights */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-3">Recommended Actions</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Focus on high-demand districts with long travel distances for maximum impact</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Increase vulnerable priority weight to prioritize underserved populations</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>Explore scenario analysis to compare budget vs. coverage trade-offs</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
