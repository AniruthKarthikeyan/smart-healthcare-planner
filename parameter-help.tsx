"use client"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function ParameterHelp() {
  const params = [
    {
      name: "Budget (Crores ₹)",
      description:
        "Sets the total capital budget available for opening/upgrading facilities. The optimizer will select sites whose combined capital cost stays within this budget. Increasing budget typically increases coverage and number of facilities.",
    },
    {
      name: "Max Travel (km)",
      description:
        "Maximum acceptable travel distance from a district centroid to its assigned facility. If a district is farther than this threshold from all selected facilities, it remains unassigned. Lower values prioritize local access; higher values allow fewer facilities to cover larger areas.",
    },
    {
      name: "Vulnerable Priority",
      description:
        "Multiplicative weight applied to demand scores of vulnerable districts (elderly, low-income, tribal). Increasing this weight favors selecting facilities that serve vulnerable populations even if cost is higher.",
    },
  ]

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
        <h3 className="text-lg font-semibold text-emerald-900">Parameter Guide</h3>
      </div>

      <div className="space-y-4">
        {params.map((param, idx) => (
          <div key={idx} className="border-l-4 border-emerald-300 pl-4 py-2">
            <h4 className="font-semibold text-emerald-900 text-sm">{param.name}</h4>
            <p className="text-sm text-emerald-800 mt-1">{param.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
        <p className="text-xs text-emerald-700 font-medium">
          💡 Tip: Run the optimizer with different parameter combinations and compare results using the Scenarios page
          to find the best trade-off for your region.
        </p>
      </div>
    </Card>
  )
}
