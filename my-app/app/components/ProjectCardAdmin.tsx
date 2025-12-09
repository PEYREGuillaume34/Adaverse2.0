"use client"

import { publishProject, deleteProject } from "../actions/project"
import { useState } from "react"

type Props = {
  projectId: number
}

export default function ProjectCardAdmin({ projectId }: Props) {
  const [loading, setLoading] = useState(false)

  const handlePublish = async () => {
    
    setLoading(true)
    await publishProject(projectId)
    setLoading(false)
  }

  const handleDelete = async () => {
    
    await deleteProject(projectId)
    setLoading(false)
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={handlePublish}
        disabled={loading}
        className="font-oswald-semibold flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg transition-all disabled:opacity-50"
      >
        ✓ PUBLIER
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="font-oswald-semibold flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-all disabled:opacity-50"
      >
        ✗ REFUSER
      </button>
    </div>
  )
}