"use client"
import { Info } from "lucide-react"

interface ParameterControlsProps {
  params: {
    budget: number
    maxKm: number
    vulnerableWeight: number
  }
  onChange: (params: any) => void
}

export default function ParameterControls({ params, onChange }: ParameterControlsProps) {
  const handleChange = (key: string, value: number) => {
    onChange({ ...params, [key]: value })
  }

  const controls = [
    {
      key: "budget",
      label: "Budget",
      unit: "Crores ₹",
      min: 10,
      max: 200,
      value: params.budget,
      description: "Total capital budget for opening/upgrading facilities",
    },
    {
      key: "maxKm",
      label: "Max Travel",
      unit: "km",
      min: 5,
      max: 50,
      value: params.maxKm,
      description: "Maximum acceptable travel distance to facilities",
    },
    {
      key: "vulnerableWeight",
      label: "Vulnerable Priority",
      unit: "weight",
      min: 1,
      max: 3,
      value: params.vulnerableWeight,
      description: "Priority weight for vulnerable populations",
      step: 0.1,
    },
  ]

  return (
    <div className="space-y-6">
      {controls.map((control) => (
        <div key={control.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">{control.label}</label>
            <span className="text-2xl font-bold text-primary">{control.value.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step || 1}
            value={control.value}
            onChange={(e) => handleChange(control.key, Number.parseFloat(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{control.description}</span>
          </div>
          <p className="text-xs text-muted-foreground pl-5">
            Range: {control.min}-{control.max} {control.unit}
          </p>
        </div>
      ))}
    </div>
  )
}
