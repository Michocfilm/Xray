"use client"

import { useState } from "react"
import StudyList from "@/components/study-list"
import StudyViewer from "@/components/study-viewer"

export default function Home() {
  const [activeStudy, setActiveStudy] = useState<string | null>(null)

  if (activeStudy) {
    return <StudyViewer studyId={activeStudy} onBack={() => setActiveStudy(null)} />
  }

  return <StudyList onSelectStudy={setActiveStudy} />
}
