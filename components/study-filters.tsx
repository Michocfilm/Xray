"use client"

import { motion } from "framer-motion"
import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface FilterState {
  patientName: string
  mrn: string
  startDate: string
  endDate: string
  description: string
  modality: string
  accessionNumber: string
}

interface StudyFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const MODALITIES = ["CT", "MR", "US", "CR", "DR", "NM", "PT", "SPECT", "XA", "RF", "DX"]

export default function StudyFilters({ filters, onFilterChange, onClearFilters, hasActiveFilters }: StudyFiltersProps) {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 space-y-4"
    >
      {/* Filter Fields Row */}
      <div className="grid grid-cols-12 gap-3">
        {/* Patient Name */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            Patient Name
          </label>
          <input
            type="text"
            placeholder="Filter..."
            value={filters.patientName}
            onChange={(e) => handleInputChange("patientName", e.target.value)}
            className="w-full bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-blue-300/30 border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </motion.div>

        {/* MRN */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">MRN</label>
          <input
            type="text"
            placeholder="Filter..."
            value={filters.mrn}
            onChange={(e) => handleInputChange("mrn", e.target.value)}
            className="w-full bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-blue-300/30 border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </motion.div>

        {/* Study Date - Start */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            Study Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400/50" />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full bg-slate-800/50 pl-8 pr-3 py-2 text-sm text-white border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Study Date - End */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400/50" />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="w-full bg-slate-800/50 pl-8 pr-3 py-2 text-sm text-white border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <input
            type="text"
            placeholder="Filter..."
            value={filters.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-blue-300/30 border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </motion.div>

        {/* Modality */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            Modality
          </label>
          <select
            value={filters.modality}
            onChange={(e) => handleInputChange("modality", e.target.value)}
            className="w-full bg-slate-800/50 px-3 py-2 text-sm text-white border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Modalities</option>
            {MODALITIES.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* Accession Number and Clear Filters */}
      <div className="grid grid-cols-12 gap-3">
        <motion.div
          className="col-span-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-xs font-semibold text-blue-90/50 uppercase tracking-wider mb-1.5">
            Accession #
          </label>
          <input
            type="text"
            placeholder="Filter..."
            value={filters.accessionNumber}
            onChange={(e) => handleInputChange("accessionNumber", e.target.value)}
            className="w-full bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-blue-300/30 border border-blue-700/30 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </motion.div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.div
            className="col-span-4 flex items-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
