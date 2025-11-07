"use client"

import { useEffect, useRef, useState } from "react"

export default function DistrictMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)

  // District demand data mapping
  const districtDemandData: Record<
    string,
    { demand: number; coverage: number; travelTime: number; lat: number; lon: number }
  > = {
    // North India
    Delhi: { demand: 85, coverage: 45, travelTime: 8, lat: 28.7041, lon: 77.1025 },
    Punjab: { demand: 72, coverage: 52, travelTime: 18, lat: 31.1471, lon: 75.3412 },
    Haryana: { demand: 78, coverage: 48, travelTime: 14, lat: 29.0588, lon: 76.0856 },
    UttarPradesh: { demand: 92, coverage: 35, travelTime: 28, lat: 26.8467, lon: 80.9462 },
    Uttarakhand: { demand: 65, coverage: 60, travelTime: 20, lat: 30.0668, lon: 79.0193 },

    // Northeast India
    Assam: { demand: 68, coverage: 58, travelTime: 16, lat: 26.2006, lon: 92.9376 },
    Meghalaya: { demand: 55, coverage: 65, travelTime: 22, lat: 25.467, lon: 91.3662 },
    Tripura: { demand: 52, coverage: 68, travelTime: 12, lat: 23.9408, lon: 91.9882 },
    Mizoram: { demand: 48, coverage: 70, travelTime: 15, lat: 23.1815, lon: 92.9789 },
    Nagaland: { demand: 58, coverage: 62, travelTime: 24, lat: 26.1584, lon: 94.5624 },

    // East India
    WestBengal: { demand: 88, coverage: 42, travelTime: 19, lat: 24.8355, lon: 88.2676 },
    Bihar: { demand: 95, coverage: 30, travelTime: 32, lat: 25.0961, lon: 85.3131 },
    Jharkhand: { demand: 75, coverage: 50, travelTime: 23, lat: 23.6102, lon: 85.2799 },
    Odisha: { demand: 72, coverage: 54, travelTime: 20, lat: 20.9517, lon: 85.0985 },

    // Central India
    MadhyaPradesh: { demand: 82, coverage: 46, travelTime: 25, lat: 22.9375, lon: 78.6553 },
    Chhattisgarh: { demand: 70, coverage: 56, travelTime: 22, lat: 21.2787, lon: 81.8661 },

    // West India
    Gujarat: { demand: 76, coverage: 52, travelTime: 16, lat: 22.2587, lon: 71.1924 },
    Rajasthan: { demand: 80, coverage: 48, travelTime: 26, lat: 27.0238, lon: 74.2179 },
    Maharashtra: { demand: 84, coverage: 44, travelTime: 18, lat: 19.7515, lon: 75.7139 },
    Goa: { demand: 62, coverage: 62, travelTime: 10, lat: 15.3017, lon: 73.8207 },

    // South India
    Karnataka: { demand: 74, coverage: 53, travelTime: 19, lat: 15.3173, lon: 75.7139 },
    TamilNadu: { demand: 78, coverage: 49, travelTime: 15, lat: 11.1271, lon: 78.6569 },
    Telangana: { demand: 71, coverage: 55, travelTime: 17, lat: 18.1124, lon: 79.0193 },
    AndhraPradesh: { demand: 73, coverage: 54, travelTime: 18, lat: 16.5062, lon: 80.648 },
    Kerala: { demand: 58, coverage: 64, travelTime: 12, lat: 10.8505, lon: 76.2711 },

    // Hilly Regions
    JammuKashmir: { demand: 45, coverage: 75, travelTime: 30, lat: 33.7782, lon: 76.5769 },
    HimachalPradesh: { demand: 52, coverage: 68, travelTime: 25, lat: 31.7433, lon: 77.1205 },
  }

  // Get color based on demand percentage
  const getDemandColor = (demand: number): string => {
    if (demand >= 85) return "#991b1b" // Dark red
    if (demand >= 70) return "#dc2626" // Red
    if (demand >= 60) return "#f97316" // Orange
    if (demand >= 50) return "#eab308" // Yellow
    return "#22c55e" // Green
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      const leafletCss = document.createElement("link")
      leafletCss.rel = "stylesheet"
      leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(leafletCss)

      // Load Leaflet script
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = () => {
        initializeMap()
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      const L = (window as any).L

      const indiaBounds: [[number, number], [number, number]] = [
        [6.5, 68.0],
        [36.0, 97.5],
      ]
      const map = L.map(mapContainerRef.current, {
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
      }).fitBounds(indiaBounds)

      mapRef.current = map

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map)

      Object.entries(districtDemandData).forEach(([name, data]) => {
        const color = getDemandColor(data.demand)
        const radius = 6 + (data.demand - 30) / 6

        const circleMarker = L.circleMarker([data.lat, data.lon], {
          radius: radius,
          color: color,
          weight: 2,
          opacity: 1,
          fillColor: color,
          fillOpacity: 0.8,
        })

        // Add tooltip with demand information
        const tooltipText = `<div class="font-semibold">${name}</div>
          <div class="text-sm mt-1">
            <div>Demand: ${data.demand}%</div>
            <div>Coverage: ${data.coverage}%</div>
            <div>Avg Travel: ${data.travelTime}km</div>
          </div>`

        circleMarker.bindPopup(tooltipText)
        circleMarker.bindTooltip(name, { permanent: false })

        // Interactive hover effects
        circleMarker.on("mouseover", () => {
          circleMarker.setStyle({ radius: radius + 2, weight: 3, opacity: 1 })
          setHoveredDistrict(name)
        })

        circleMarker.on("mouseout", () => {
          circleMarker.setStyle({ radius: radius, weight: 2, opacity: 1 })
          setHoveredDistrict(null)
        })

        circleMarker.addTo(map)
      })

      // Fit to India bounds on load
      map.fitBounds(indiaBounds)
    }

    loadLeaflet()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      <div
        ref={mapContainerRef}
        className="relative bg-slate-50 rounded-lg shadow-sm border border-slate-200 overflow-hidden"
        style={{ height: "500px" }}
      ></div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-900 rounded shadow-sm"></div>
              <span className="text-sm font-medium">Very High (&ge;85%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded shadow-sm"></div>
              <span className="text-sm font-medium">High (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded shadow-sm"></div>
              <span className="text-sm font-medium">Moderate (60-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded shadow-sm"></div>
              <span className="text-sm font-medium">Fair (50-59%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded shadow-sm"></div>
              <span className="text-sm font-medium">Low (&lt;50%)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Each marker shows healthcare demand intensity • Larger circles indicate higher demand • Click any marker for
          detailed metrics
        </p>
      </div>
    </div>
  )
}
