"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Search, Plus, ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImagingToolbar from "./imaging-toolbar"

interface StudyViewerProps {
  studyId: string
  onBack: () => void
}

const seriesThumbnails = [
  { id: 1, label: "MR", series: "S:0", instances: 1, imageUrl: "/mr-scan-medical-imaging.jpg" },
  { id: 2, label: "CT", series: "S:1", instances: 1, imageUrl: "/ct-scan-medical-imaging.jpg" },
  { id: 3, label: "CR", series: "S:1", instances: 1, imageUrl: "/cr-scan-medical-imaging.jpg" },
  { id: 4, label: "DR", series: "S:1", instances: 1, imageUrl: "/dr-scan-medical-imaging.jpg" },
  { id: 5, label: "CT", series: "S:2", instances: 1, imageUrl: "/ct-chest-scan-medical.jpg" },
  { id: 6, label: "MR", series: "S:3", instances: 1, imageUrl: "/mr-brain-scan-medical.jpg" },
]

export default function StudyViewer({ studyId, onBack }: StudyViewerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-xl px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="rounded-lg p-2 hover:bg-blue-500/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-blue-400" />
            </motion.button>
            <div className="flex items-center gap-2 text-sm text-blue-90/50">
              <span>Studies</span>
              <span className="text-blue-300/50">/</span>
              <span className="text-white">Basic Viewer</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
              <Plus className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-blue-700/30 mx-2"></div>
            <Button size="icon" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-90/50">Patient</span>
            <span className="text-blue-400 font-medium">Details</span>
          </div>
        </div>
      </motion.div>

      <ImagingToolbar />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-60px-56px)] overflow-hidden">
        {/* Left Sidebar - Study Info & Thumbnails */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-64 border-r border-blue-800/30 bg-slate-900/30 overflow-y-auto flex flex-col"
        >
          {/* Study Info */}
          <div className="p-4 border-b border-blue-800/30">
            <div className="text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-3">Study Info</div>
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-blue-90/50">Date</p>
                <p className="text-blue-200 font-medium">Jan 1, 2024</p>
              </div>
              <div>
                <p className="text-blue-90/50">ID</p>
                <p className="text-blue-200 font-medium font-mono text-xs">CT\MR\CR\US\D\SR</p>
              </div>
              <div>
                <p className="text-blue-90/50">Series</p>
                <p className="text-blue-200 font-medium">27</p>
              </div>
            </div>
          </div>

          {/* Thumbnails Grid */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {seriesThumbnails.map((series, idx) => (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group rounded-lg border border-blue-700/30 bg-slate-800/50 p-2 hover:border-blue-500/50 hover:bg-slate-800/70 cursor-pointer transition-all"
              >
                <div className="aspect-square bg-slate-900/50 rounded-md mb-2 overflow-hidden flex items-center justify-center">
                  <motion.img
                    src={series.imageUrl}
                    alt={`${series.label} series ${series.series}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{series.label}</span>
                    {series.instances > 1 && <span className="text-yellow-500 text-xs">⚠</span>}
                  </div>
                  <p className="text-blue-300/60">{series.series}</p>
                  <p className="text-blue-300/60">{series.instances} instance</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Main Viewer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 relative bg-black flex flex-col"
        >
          {/* Main Image Display */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full h-full max-w-4xl max-h-full"
            >
              <img
                src="/medical-scan-mri-brain-imaging.jpg"
                alt="Medical scan"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Bottom Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-blue-800/30 bg-slate-900/50 backdrop-blur-sm p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-blue-90/50">H: Axial | Frame 1/50</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-90/50">WL: 40</span>
              <span className="text-xs text-blue-90/50">WW: 400</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Sidebar - Tools */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-12 border-l border-blue-800/30 bg-slate-900/30 flex flex-col items-center justify-center gap-3 py-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors flex items-center justify-center"
            >
              {i === 0 ? <RotateCw className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
