"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DemandChart() {
  const data = [
    { region: "North", highDemand: 45, medium: 32, low: 23 },
    { region: "Northeast", highDemand: 38, medium: 35, low: 27 },
    { region: "East", highDemand: 52, medium: 28, low: 20 },
    { region: "West", highDemand: 41, medium: 33, low: 26 },
    { region: "Central", highDemand: 48, medium: 30, low: 22 },
    { region: "South", highDemand: 55, medium: 26, low: 19 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        />
        <Legend />
        <Bar dataKey="highDemand" stackId="a" fill="#dc2626" name="High" />
        <Bar dataKey="medium" stackId="a" fill="#f97316" name="Medium" />
        <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low" />
      </BarChart>
    </ResponsiveContainer>
  )
}
