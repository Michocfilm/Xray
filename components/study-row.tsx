"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Play, BarChart2, PenTool, Ruler, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Study {
  id: string
  name: string
  mrn: string
  studyDate: string
  description: string
  modality: string
  accessionNumber: string
  instances: number
  expanded?: boolean
}

interface StudyRowProps {
  study: Study
  onToggleExpand: (id: string) => void
  onSelectStudy: (id: string) => void
}

const viewerButtons = [
  { label: "Basic Viewer", icon: Eye },
  { label: "Segmentation", icon: BarChart2 },
  { label: "Annotations", icon: PenTool },
  { label: "Measurements", icon: Ruler },
  { label: "Preclinical 4D", icon: Play },
]

const seriesData = [
  { description: "(empty)", series: 0, modality: "MR", instances: 1 },
  { description: "(empty)", series: 0, modality: "US", instances: 1 },
  { description: "(empty)", series: 1, modality: "CT", instances: 1 },
  { description: "(empty)", series: 1, modality: "CR", instances: 1 },
  { description: "(empty)", series: 1, modality: "DR", instances: 1 },
  { description: "(empty)", series: 2, modality: "CT", instances: 1 },
]

export default function StudyRow({ study, onToggleExpand, onSelectStudy }: StudyRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = study.expanded || false

  return (
    <>
      {/* Main Row */}
      <motion.div
        onClick={() => onToggleExpand(study.id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
        className={cn(
          "w-full group relative rounded-lg border transition-all duration-300 overflow-hidden cursor-pointer",
          isExpanded
            ? "border-blue-500/50 bg-gradient-to-r from-blue-600/20 to-blue-500/10"
            : "border-blue-700/30 bg-slate-800/40 hover:border-blue-600/50 hover:bg-slate-800/60",
        )}
      >
        <div className="grid grid-cols-12 items-center gap-4 px-4 py-4">
          {/* Chevron */}
          <motion.div
            className="col-span-1 flex justify-center"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-blue-400" />
          </motion.div>

          {/* Patient Name */}
          <div className="col-span-3">
            <p className="font-semibold text-white">{study.name}</p>
          </div>

          {/* MRN */}
          <div className="col-span-2">
            <p className="text-sm text-blue-300/80">{study.mrn}</p>
          </div>

          {/* Study Date */}
          <div className="col-span-2">
            <p className="text-sm text-blue-300/80">{study.studyDate}</p>
          </div>

          {/* Modality */}
          <div className="col-span-2">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block rounded-full bg-blue-500/20 px-3 py-1">
              <p className="text-xs font-medium text-blue-300">{study.modality}</p>
            </motion.div>
          </div>

          {/* Instances */}
          <div className="col-span-2 text-right">
            <p className="text-sm font-medium text-white">{study.instances}</p>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-blue-600/20 bg-slate-900/50"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <p className="text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-white/70">{study.description}</p>
                </motion.div>

                {/* Viewer Buttons */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <p className="text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-3">
                    Available Viewers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {viewerButtons.map((button, idx) => {
                      const Icon = button.icon
                      const isBasicViewer = button.label === "Basic Viewer"
                      return (
                        <motion.button
                          key={button.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (isBasicViewer) {
                              onSelectStudy(study.id)
                            }
                          }}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                            isBasicViewer
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
                              : "bg-slate-700/50 text-blue-200 hover:bg-slate-600/50",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {button.label}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Details Table */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-lg bg-slate-800/50 border border-blue-700/20 overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-0 text-xs font-semibold text-blue-90/50 uppercase tracking-wider bg-slate-900/70 px-4 py-3">
                    <div>Description</div>
                    <div>Series</div>
                    <div>Modality</div>
                    <div>Instances</div>
                  </div>
                  <div className="divide-y divide-blue-700/20">
                    {seriesData.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="grid grid-cols-4 gap-0 px-4 py-3 text-sm hover:bg-blue-500/10 transition-colors"
                      >
                        <div className="text-white/70">{item.description}</div>
                        <div className="text-blue-300">{item.series}</div>
                        <div className="text-blue-300">{item.modality}</div>
                        <div className="text-white">{item.instances}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Accession Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between px-2 py-2 rounded-lg bg-blue-500/5 border border-blue-700/20"
                >
                  <span className="text-xs font-medium text-blue-90/50">Accession Number:</span>
                  <span className="text-sm font-mono text-blue-200">{study.accessionNumber}</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
