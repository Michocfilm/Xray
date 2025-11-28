"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import StudyRow from "./study-row"
import StudyFilters, { type FilterState } from "./study-filters"

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

const mockStudies: Study[] = [
  {
    id: "1",
    name: "Structured Reports",
    mrn: "PID_SR",
    studyDate: "2024-01-01",
    description: "CT\\MR\\CR\\US\\D...",
    modality: "AN_SR",
    accessionNumber: "CT\\MR\\CR\\US\\D\\...",
    instances: 27,
  },
  {
    id: "2",
    name: "CTA Head and Neck",
    mrn: "NEW_PATIENT_ID",
    studyDate: "2023-05-11",
    description: "CT NECK SOFT TISSUE W/ ...",
    modality: "CT",
    accessionNumber: "CT NECK SOFT TISSUE",
    instances: 295,
  },
  {
    id: "3",
    name: "Anonymous",
    mrn: "AVSUHP",
    studyDate: "2023-04-03",
    description: "General Study",
    modality: "CT",
    accessionNumber: "ANONYMOUS",
    instances: 112,
  },
  {
    id: "4",
    name: "DATSCAN1",
    mrn: "DATSCAN1",
    studyDate: "2022-11-21",
    description: "CERVEAU DATSCAN",
    modality: "NM",
    accessionNumber: "DATSCAN",
    instances: 5,
  },
  {
    id: "5",
    name: "SIIM, Thierry",
    mrn: "Thierry_cbct_teeth",
    studyDate: "2022-10-15",
    description: "3D examination",
    modality: "CT",
    accessionNumber: "a50095520089017",
    instances: 402,
  },
  {
    id: "6",
    name: "M1",
    mrn: "M1",
    studyDate: "2022-09-15",
    description: "General Static Scan + CT",
    modality: "CT",
    accessionNumber: "CT\\PT",
    instances: 10163,
  },
]

export default function StudyList({ onSelectStudy }: { onSelectStudy: (id: string) => void }) {
  const [studies, setStudies] = useState<Study[]>(mockStudies)
  const [filters, setFilters] = useState<FilterState>({
    patientName: "",
    mrn: "",
    startDate: "",
    endDate: "",
    description: "",
    modality: "",
    accessionNumber: "",
  })

  const toggleExpand = (id: string) => {
    setStudies(studies.map((study) => (study.id === id ? { ...study, expanded: !study.expanded } : study)))
  }

  const filteredStudies = studies.filter((study) => {
    const matchPatientName = study.name.toLowerCase().includes(filters.patientName.toLowerCase())
    const matchMRN = study.mrn.toLowerCase().includes(filters.mrn.toLowerCase())
    const matchDescription = study.description.toLowerCase().includes(filters.description.toLowerCase())
    const matchAccessionNumber = study.accessionNumber.toLowerCase().includes(filters.accessionNumber.toLowerCase())
    const matchModality = filters.modality === "" || study.modality === filters.modality

    const studyDate = new Date(study.studyDate)
    const startDate = filters.startDate ? new Date(filters.startDate) : null
    const endDate = filters.endDate ? new Date(filters.endDate) : null

    const matchDateRange = (!startDate || studyDate >= startDate) && (!endDate || studyDate <= endDate)

    return matchPatientName && matchMRN && matchDescription && matchAccessionNumber && matchModality && matchDateRange
  })

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  const handleClearFilters = () => {
    setFilters({
      patientName: "",
      mrn: "",
      startDate: "",
      endDate: "",
      description: "",
      modality: "",
      accessionNumber: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Study List</h1>
              <p className="mt-1 text-sm text-blue-90/50">Medical Imaging Database</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-400">{filteredStudies.length}</div>
              <p className="text-sm text-blue-90/50">Studies</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <StudyFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Column Headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-1 grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-blue-90/50 uppercase tracking-wider"
        >
          <div className="col-span-1"></div>
          <div className="col-span-3">Patient Name</div>
          <div className="col-span-2">MRN</div>
          <div className="col-span-2">Study Date</div>
          <div className="col-span-2">Modality</div>
          <div className="col-span-2 text-right">Instances</div>
        </motion.div>

        {/* Studies Table */}
        <motion.div className="space-y-2">
          {filteredStudies.length > 0 ? (
            filteredStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <StudyRow study={study} onToggleExpand={toggleExpand} onSelectStudy={onSelectStudy} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-blue-700/30 bg-slate-800/30 px-6 py-8 text-center"
            >
              <p className="text-blue-90/50">No studies found</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
