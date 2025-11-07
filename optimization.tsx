"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OptimizationPage() {
  const [results, setResults] = useState(null)

  const mockResults = {
    selectedFacilities: 24,
    estimatedInvestment: 185,
    coverageImprovement: 28.3,
    selectedSites: [
      {
        name: "District General Hospital - Pune",
        type: "Tertiary",
        capacity: 500,
        cost: 45,
        impact: "High",
      },
      {
        name: "Primary Health Centre - Indore",
        type: "Primary",
        capacity: 100,
        cost: 8,
        impact: "Medium",
      },
      {
        name: "Community Clinic - Nagpur",
        type: "Secondary",
        capacity: 250,
        cost: 25,
        impact: "High",
      },
    ],
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <h2 className="text-3xl font-bold text-foreground">Optimization Results</h2>
        <p className="text-sm text-muted-foreground mt-1">Facility recommendations based on your parameters</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600">{mockResults.selectedFacilities}</p>
              <p className="text-sm font-semibold text-emerald-900 mt-2">Facilities Recommended</p>
              <p className="text-xs text-emerald-700 mt-1">Across India</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <p className="text-4xl font-bold text-blue-600">₹{mockResults.estimatedInvestment}</p>
              <p className="text-sm font-semibold text-blue-900 mt-2">Estimated Investment</p>
              <p className="text-xs text-blue-700 mt-1">In Crores</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <p className="text-4xl font-bold text-orange-600">+{mockResults.coverageImprovement}%</p>
              <p className="text-sm font-semibold text-orange-900 mt-2">Coverage Improvement</p>
              <p className="text-xs text-orange-700 mt-1">vs. baseline</p>
            </Card>
          </div>

          {/* Recommended Sites */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Recommended Sites</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Facility Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Capacity (Beds)</th>
                    <th className="text-left py-3 px-4 font-semibold">Cost (₹L)</th>
                    <th className="text-left py-3 px-4 font-semibold">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.selectedSites.map((site, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4">{site.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {site.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">{site.capacity}</td>
                      <td className="py-3 px-4 font-semibold">{site.cost}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            site.impact === "High" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {site.impact}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Policy Brief */}
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <h3 className="text-lg font-semibold mb-3">Policy Brief</h3>
            <p className="text-sm text-foreground leading-relaxed">
              Based on the optimization model, we recommend opening 24 new facilities and upgrading 8 existing ones.
              This strategy will increase overall coverage from 60.1% to 88.4%, while reducing average patient travel
              distance from 13.0 km to 8.2 km. The investment of ₹185 Crores prioritizes vulnerable populations,
              ensuring equitable access across rural and urban areas. Implementation should follow a phased approach
              over 18 months.
            </p>
          </Card>

          {/* Export Options */}
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700">Export as PDF</Button>
            <Button variant="outline">Download Data</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
