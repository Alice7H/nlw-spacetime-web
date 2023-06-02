'use client'
import { ChangeEvent, useState } from 'react'

interface Props {
  oldPreview?: string
}

export function MediaPicker({ oldPreview }: Props) {
  const [preview, setPreview] = useState<string | null>(oldPreview || null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) return

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        name="coverURL"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt="Preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
