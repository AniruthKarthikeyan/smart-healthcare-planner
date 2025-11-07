"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DemandChart from "./demand-chart"

export default function DemandPage() {
  const [selectedRegion, setSelectedRegion] = useState("all")

  const demandStats = [
    { label: "High Demand Areas", value: "245", trend: "+12%" },
    { label: "Medium Demand Areas", value: "312", trend: "+8%" },
    { label: "Low Demand Areas", value: "161", trend: "-3%" },
    { label: "Avg Demand Score", value: "6.8/10", trend: "+0.4" },
  ]

  const regionData = [
    { name: "North", population: 23.5, coverage: 55, gap: 45 },
    { name: "Northeast", population: 8.2, coverage: 42, gap: 58 },
    { name: "East", population: 19.8, coverage: 48, gap: 52 },
    { name: "West", population: 21.3, coverage: 72, gap: 28 },
    { name: "Central", population: 16.4, coverage: 58, gap: 42 },
    { name: "South", population: 24.7, coverage: 78, gap: 22 },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Healthcare Demand Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">Regional demand patterns and population healthcare needs</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {demandStats.map((stat, idx) => (
              <Card key={idx} className="p-6">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mt-2">{stat.label}</p>
                <p className="text-xs text-emerald-600 font-medium mt-2">{stat.trend}</p>
              </Card>
            ))}
          </div>

          {/* Tabs for Different Views */}
          <Card className="p-6">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chart">Demand Distribution</TabsTrigger>
                <TabsTrigger value="regional">Regional Breakdown</TabsTrigger>
                <TabsTrigger value="insights">Key Insights</TabsTrigger>
              </TabsList>

              {/* Demand Chart Tab */}
              <TabsContent value="chart" className="mt-6">
                <DemandChart />
              </TabsContent>

              {/* Regional Breakdown Tab */}
              <TabsContent value="regional" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Region</th>
                        <th className="text-left py-3 px-4 font-semibold">Population (M)</th>
                        <th className="text-left py-3 px-4 font-semibold">Coverage %</th>
                        <th className="text-left py-3 px-4 font-semibold">Coverage Gap %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionData.map((region, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-secondary/50">
                          <td className="py-3 px-4 font-medium">{region.name}</td>
                          <td className="py-3 px-4">{region.population}M</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                              {region.coverage}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                              {region.gap}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="mt-6 space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-900 mb-2">Critical Demand Areas</p>
                    <p className="text-sm text-blue-800">
                      Northeast and East regions show highest demand-supply gaps with 58% and 52% coverage gaps
                      respectively. Prioritize infrastructure development in these regions.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="font-semibold text-amber-900 mb-2">Population Growth Impact</p>
                    <p className="text-sm text-amber-800">
                      South region has highest population (24.7M) but also highest coverage (78%), indicating efficient
                      facility distribution. Replicable model for other regions.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-900 mb-2">Opportunity Zones</p>
                    <p className="text-sm text-green-800">
                      Central and West regions show potential for cost-effective improvements with targeted facility
                      placements in underserved districts.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Demand Factors Card */}
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <h3 className="text-lg font-semibold mb-4">Factors Influencing Demand</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-3">Population Metrics</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Total population: 113.9 Million</li>
                  <li>• Urban population: 38.2%</li>
                  <li>• Rural population: 61.8%</li>
                  <li>• Annual growth rate: 1.8%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Health Indicators</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Avg life expectancy: 67.3 years</li>
                  <li>• Disease prevalence: 18.5%</li>
                  <li>• Vulnerable population: 32.1%</li>
                  <li>• Elderly (65+): 5.2%</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700">Export Demand Report</Button>
            <Button variant="outline">Download Data</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
