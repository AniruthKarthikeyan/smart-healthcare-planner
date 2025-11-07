"use client"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ScenarioPage() {
  const scenarioData = [
    { budget: 20, coverage: 48, facilities: 10, equity: 52 },
    { budget: 50, coverage: 68, facilities: 18, equity: 65 },
    { budget: 100, coverage: 82, facilities: 28, equity: 72 },
    { budget: 150, coverage: 90, facilities: 35, equity: 78 },
    { budget: 200, coverage: 95, facilities: 42, equity: 84 },
  ]

  const priorityScenarios = [
    {
      name: "Equity-First",
      vulnerable: 2.5,
      coverage: 85,
      equity: 88,
      cost: 140,
      description: "Prioritizes vulnerable populations",
    },
    {
      name: "Cost-Optimized",
      vulnerable: 1.0,
      coverage: 72,
      equity: 58,
      cost: 95,
      description: "Minimizes total investment",
    },
    {
      name: "Balanced",
      vulnerable: 1.5,
      coverage: 80,
      equity: 72,
      cost: 125,
      description: "Balances cost and equity",
    },
  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <h2 className="text-3xl font-bold text-foreground">Scenario Analysis</h2>
        <p className="text-sm text-muted-foreground mt-1">Explore trade-offs between budget, coverage, and equity</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Budget vs Coverage Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Budget vs. Coverage Trade-off</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="budget"
                  label={{ value: "Budget (₹ Crores)", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis yAxisId="left" label={{ value: "Coverage (%)", angle: -90, position: "insideLeft" }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: "Facilities", angle: 90, position: "insideRight" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="coverage"
                  stroke="#22c55e"
                  strokeWidth={3}
                  name="Coverage %"
                  dot={{ fill: "#22c55e", r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="facilities"
                  stroke="#0d6efd"
                  strokeWidth={3}
                  name="Facilities"
                  dot={{ fill: "#0d6efd", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Scenario Comparison */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policy Scenarios</h3>
            <div className="grid grid-cols-3 gap-4">
              {priorityScenarios.map((scenario, idx) => (
                <Card
                  key={idx}
                  className={`p-6 transition-all cursor-pointer border-2 ${
                    scenario.name === "Balanced"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <h4 className="font-semibold text-lg mb-2">{scenario.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{scenario.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Coverage</span>
                      <span className="text-xl font-bold text-emerald-600">{scenario.coverage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Equity Index</span>
                      <span className="text-xl font-bold text-blue-600">{scenario.equity}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Investment</span>
                      <span className="text-xl font-bold text-orange-600">₹{scenario.cost}Cr</span>
                    </div>
                  </div>

                  <button
                    className={`w-full mt-4 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      scenario.name === "Balanced"
                        ? "bg-emerald-600 text-white"
                        : "bg-secondary text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {scenario.name === "Balanced" ? "Recommended" : "View Details"}
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Insights */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Key Insights</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  Doubling budget from ₹50Cr to ₹100Cr increases coverage by 14% but yields diminishing returns beyond
                  ₹150Cr
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>
                  Increasing vulnerable priority weight significantly improves equity metrics with minimal cost increase
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">•</span>
                <span>The "Balanced" scenario offers the best cost-effectiveness for implementation</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
