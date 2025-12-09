"use client"

import { useState } from "react"

type Props = {
  githubUrl: string
  projectName: string
  height?: string  // Hauteur personnalisable
}

export default function ProjectImage({ githubUrl, projectName, height = "h-48" }: Props) {
  const [imageError, setImageError] = useState(false)

  const getThumbnailUrl = (url: string) => {
    return `${url}/blob/main/thumbnail.png?raw=true`
  }

  return (
    <div className={`relative ${height} overflow-hidden bg-gray-100`}>
      {imageError ? (
        <div className="w-full h-full bg-linear-to-br from-ada-blue to-ada-coral flex items-center justify-center">
          <div className="text-center">
            <img
              className="text-gray-500 w-18 h-18 object-contain justify-center mx-auto"
              src="/folder-code.svg"
              alt="Icône dossier"
            />
            <p className="text-gray-700 text-sm md:text-lg font-semibold mt-2 md:mt-4">
              Aucune image disponible
            </p>
          </div>
        </div>
      ) : (
        <img
          src={getThumbnailUrl(githubUrl)}
          alt={projectName}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  )
}