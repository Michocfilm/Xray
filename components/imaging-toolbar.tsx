"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Ruler,
  ZoomIn,
  Hand,
  Crosshair,
  Settings,
  Camera,
  LayoutGrid,
  Minus,
  Circle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  PenTool,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

const measurementTools = [
  { id: "length", icon: Ruler, label: "Length" },
  { id: "bidirectional", icon: Crosshair, label: "Bidirectional" },
  { id: "annotation", icon: PenTool, label: "Annotation" },
  { id: "ellipse", icon: Circle, label: "Ellipse" },
  { id: "rectangle", label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "freehand", label: "Freehand ROI" },
  { id: "spline", label: "Spline ROI" },
  { id: "livewire", label: "Livewire tool" },
]

// Layout Icons Components
const LayoutIcon1x1 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="1" />
  </svg>
)

const LayoutIcon2x1 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="10" height="18" rx="1" />
    <rect x="14" y="3" width="7" height="18" rx="1" />
  </svg>
)

const LayoutIcon2x2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </svg>
)

const LayoutIcon2x3 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="8" height="5" rx="1" />
    <rect x="13" y="3" width="8" height="5" rx="1" />
    <rect x="3" y="9" width="8" height="5" rx="1" />
    <rect x="13" y="9" width="8" height="5" rx="1" />
    <rect x="3" y="15" width="8" height="6" rx="1" />
    <rect x="13" y="15" width="8" height="6" rx="1" />
  </svg>
)

const LayoutIconMPR = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="5" height="18" rx="1" />
    <rect x="10" y="3" width="5" height="18" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
)

const LayoutIcon3DMain = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="10" rx="1" />
    <rect x="3" y="15" width="5" height="6" rx="1" />
    <rect x="10" y="15" width="5" height="6" rx="1" />
    <rect x="17" y="15" width="4" height="6" rx="1" />
  </svg>
)

const LayoutIconAxialPrimary = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="14" height="18" rx="1" />
    <rect x="19" y="3" width="2" height="18" rx="1" />
  </svg>
)

const LayoutIcon3DOnly = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="3" y="3" width="18" height="18" rx="1" />
  </svg>
)

const LayoutIcon3DPrimary = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="14" height="18" rx="1" />
    <rect x="19" y="3" width="2" height="8" rx="1" />
    <rect x="19" y="13" width="2" height="8" rx="1" />
  </svg>
)

const LayoutIconFrameView = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <rect x="5" y="5" width="14" height="14" rx="0.5" />
    <rect x="7" y="7" width="10" height="10" rx="0.5" />
  </svg>
)

const commonLayouts = [
  { id: "1x1", icon: LayoutIcon1x1, label: "1x1" },
  { id: "2x1", icon: LayoutIcon2x1, label: "2x1" },
  { id: "2x2", icon: LayoutIcon2x2, label: "2x2" },
  { id: "2x3", icon: LayoutIcon2x3, label: "2x3" },
]

const advancedLayouts = [
  { id: "mpr", icon: LayoutIconMPR, label: "MPR" },
  { id: "3d-four-up", icon: LayoutIcon2x2, label: "3D four up" },
  { id: "3d-main", icon: LayoutIcon3DMain, label: "3D main" },
  { id: "axial-primary", icon: LayoutIconAxialPrimary, label: "Axial Primary" },
  { id: "3d-only", icon: LayoutIcon3DOnly, label: "3D only" },
  { id: "3d-primary", icon: LayoutIcon3DPrimary, label: "3D primary" },
  { id: "frame-view", icon: LayoutIconFrameView, label: "Frame View" },
]

export default function ImagingToolbar() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [showMeasurementMenu, setShowMeasurementMenu] = useState(false)
  const [showLayoutMenu, setShowLayoutMenu] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState<string>("3d-only")
  const [customGrid, setCustomGrid] = useState({ rows: 0, cols: 0 })
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
  const layoutMenuRef = useRef<HTMLDivElement>(null)
  const layoutButtonRef = useRef<HTMLDivElement>(null)

  const tools = [
    { id: "ruler", icon: Ruler, label: "Ruler", hasDropdown: true },
    { id: "zoom", icon: ZoomIn, label: "Zoom" },
    { id: "pan", icon: Hand, label: "Pan" },
    { id: "crosshair", icon: Crosshair, label: "Measurement" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "measure", icon: Circle, label: "Measure", highlight: true },
    { id: "camera", icon: Camera, label: "Screenshot" },
    { id: "grid", icon: LayoutGrid, label: "Layout", hasLayoutDropdown: true },
  ]

  // Close layout menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layoutMenuRef.current && !layoutMenuRef.current.contains(event.target as Node)) {
        setShowLayoutMenu(false)
      }
    }

    if (showLayoutMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLayoutMenu])

  const rightTools = [
    { id: "minus", icon: Minus, label: "Reset" },
    { id: "lines", icon: Minus, label: "Lines" },
    { id: "crosshair2", icon: Crosshair, label: "Crosshair" },
    { id: "rotate", icon: RotateCcw, label: "Rotate" },
    { id: "separator", isSeparator: true },
    { id: "prev", icon: ArrowLeft, label: "Previous" },
    { id: "next", icon: ArrowRight, label: "Next" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-14 bg-gradient-to-r from-slate-900/80 via-blue-900/30 to-slate-900/80 backdrop-blur-md border-b border-blue-500/20 flex items-center justify-between px-4 gap-2 relative z-50"
    >
      {/* Left Tools */}
      <div className="flex items-center gap-1">
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div
              className="relative group"
              ref={tool.hasLayoutDropdown ? layoutButtonRef : null}
            >
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  if (tool.hasDropdown) {
                    setShowMeasurementMenu(!showMeasurementMenu)
                    setShowLayoutMenu(false)
                  } else if (tool.hasLayoutDropdown) {
                    setShowLayoutMenu(!showLayoutMenu)
                    setShowMeasurementMenu(false)
                  } else {
                    setActiveTool(activeTool === tool.id ? null : tool.id)
                  }
                }}
                className={`h-9 px-3 rounded-lg transition-all ${
                  tool.highlight
                    ? "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-blue-500/10 hover:text-blue-300"
                }`}
              >
                <tool.icon className="h-4 w-4" />
                {(tool.hasDropdown || tool.hasLayoutDropdown) && (
                  <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
                )}
              </Button>

              {/* Measurement Menu */}
              <AnimatePresence>
                {tool.hasDropdown && showMeasurementMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 bg-slate-900/95 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {measurementTools.map((mtool, midx) => (
                      <motion.button
                        key={mtool.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: midx * 0.05 }}
                        onClick={() => {
                          setActiveTool(mtool.id)
                          setShowMeasurementMenu(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 transition-colors flex items-center gap-3 whitespace-nowrap"
                      >
                        {mtool.icon && <mtool.icon className="h-4 w-4" />}
                        {mtool.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Layout Menu */}
              {tool.hasLayoutDropdown && (
                <AnimatePresence>
                  {showLayoutMenu && (
                    <motion.div
                      ref={layoutMenuRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 bg-slate-900/95 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-xl z-[9999] w-[500px]"
                    >
                    <div className="flex">
                      {/* Left Section - Common & Advanced */}
                      <div className="flex-1 p-4 border-r border-blue-500/20">
                        {/* Common Section */}
                        <div className="mb-4">
                          <h3 className="text-xs font-semibold text-blue-300/80 uppercase tracking-wider mb-3">
                            Common
                          </h3>
                          <div className="flex gap-2">
                            {commonLayouts.map((layout) => {
                              const Icon = layout.icon
                              return (
                                <motion.button
                                  key={layout.id}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setSelectedLayout(layout.id)
                                    setShowLayoutMenu(false)
                                  }}
                                  className={`p-2 rounded-lg border transition-all ${
                                    selectedLayout === layout.id
                                      ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                      : "border-blue-500/30 text-slate-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                                  }`}
                                >
                                  <Icon />
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-blue-500/20 mb-4"></div>

                        {/* Advanced Section */}
                        <div>
                          <h3 className="text-xs font-semibold text-blue-300/80 uppercase tracking-wider mb-3">
                            Advanced
                          </h3>
                          <div className="space-y-1">
                            {advancedLayouts.map((layout) => {
                              const Icon = layout.icon
                              return (
                                <motion.button
                                  key={layout.id}
                                  whileHover={{ x: 2 }}
                                  onClick={() => {
                                    setSelectedLayout(layout.id)
                                    setShowLayoutMenu(false)
                                  }}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                                    selectedLayout === layout.id
                                      ? "bg-blue-500/20 text-blue-300"
                                      : "text-slate-300 hover:bg-blue-500/10 hover:text-blue-300"
                                  }`}
                                >
                                  <Icon />
                                  <span>{layout.label}</span>
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Custom */}
                      <div className="w-[200px] p-4">
                        <h3 className="text-xs font-semibold text-blue-300/80 uppercase tracking-wider mb-3">
                          Custom
                        </h3>
                        <div className="grid grid-cols-4 gap-1 mb-2">
                          {Array.from({ length: 12 }).map((_, idx) => {
                            const row = Math.floor(idx / 4) + 1
                            const col = (idx % 4) + 1
                            const isHovered =
                              hoveredCell &&
                              row <= hoveredCell.row &&
                              col <= hoveredCell.col
                            const isSelected =
                              customGrid.rows > 0 &&
                              row <= customGrid.rows &&
                              col <= customGrid.cols

                            return (
                              <div
                                key={idx}
                                onMouseEnter={() => setHoveredCell({ row, col })}
                                onMouseLeave={() => setHoveredCell(null)}
                                onClick={() => {
                                  setCustomGrid({ rows: row, cols: col })
                                  setShowLayoutMenu(false)
                                }}
                                className={`aspect-square rounded border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-blue-500/30 border-blue-500"
                                    : isHovered
                                      ? "bg-blue-500/20 border-blue-500/50"
                                      : "bg-slate-800/50 border-blue-500/30 hover:border-blue-500/50"
                                }`}
                              />
                            )
                          })}
                        </div>
                        <p className="text-xs text-blue-300/60 text-center">
                          Hover to select rows and columns
                        </p>
                        <p className="text-xs text-blue-300/60 text-center mt-1">
                          Click to apply
                        </p>
                      </div>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 border border-blue-500/30 rounded text-xs text-blue-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {tool.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Center - Image Info */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-slate-400"
        >
          <span className="text-slate-300">H: Axial</span>
          <span className="mx-2 text-slate-600">|</span>
          <span className="text-slate-300">Frame 1/50</span>
        </motion.div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-1">
        {rightTools.map((tool, idx) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.04 }}
          >
            {tool.isSeparator ? (
              <div className="w-px h-5 bg-slate-700/30 mx-2"></div>
            ) : (
              <div className="relative group">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 w-9 p-0 rounded-lg text-slate-300 hover:bg-blue-500/10 hover:text-blue-300 transition-all"
                >
                  <tool.icon className="h-4 w-4" />
                </Button>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 border border-blue-500/30 rounded text-xs text-blue-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {tool.label}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
