"use client"

import {
  MultiImageDropzone,
  type FileState,
} from "@/app/(dashboard)/_components/MultiImageDropzone"
import { useEdgeStore } from "@/app/_lib/edgestore"
import { useState } from "react"

interface MultiImageDropzoneProps {
  setUrl: (url: string) => void
}

export function MultiImageDropzoneUsage({ setUrl }: MultiImageDropzoneProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([])
  const { edgestore } = useEdgeStore()

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates)
      const fileState = newFileStates.find((fileState) => fileState.key === key)
      if (fileState) {
        fileState.progress = progress
      }
      return newFileStates
    })
  }

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        className="w-full"
        dropzoneOptions={{
          maxFiles: 1,
        }}
        onChange={(files) => {
          setFileStates(files)
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles])
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file as File, //mudei aqui adicionando AS FILE
                  options: {
                    temporary: true, // Torna o upload temporário
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress)
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000))
                      updateFileProgress(addedFileState.key, "COMPLETE")
                    }
                  },
                })
                setUrl(res.url)
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR")
              }
            }),
          )
        }}
      />
    </div>
  )
}
