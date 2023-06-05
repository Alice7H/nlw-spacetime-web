'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import Cookie from 'js-cookie'
import { api } from '@/lib/api'
import { Memory } from '@/types/Memory'
import { DTimePicker } from './DateTimePicker'

interface Props {
  oldMemory?: Memory
}

export function MemoryForm({ oldMemory }: Props) {
  const router = useRouter()
  const token = Cookie.get('token') as string

  const [memory, setMemory] = useState<Memory | null>(oldMemory || null)
  const [memoryDateTime, setMemoryDateTime] = useState(
    memory?.createdAt || new Date(),
  )

  async function handleUpdateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('coverURL') as File
    const hasFileToUpload = fileToUpload && fileToUpload.size > 0
    let coverUrl = ''

    if (hasFileToUpload) {
      await deleteOldImage()
      coverUrl = await uploadNewImage(fileToUpload)
    } else {
      coverUrl = oldMemory?.coverUrl as string
    }
    formData.set('coverUrl', coverUrl)
    formData.set('createdAt', memoryDateTime as string)

    if (oldMemory === undefined) {
      await createMemory(formData)
    } else {
      await updateMemory(formData)
    }
    router.push('/memories')
  }

  async function deleteOldImage() {
    if (oldMemory !== undefined) {
      await api.delete(`/upload/${oldMemory.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
  }

  async function createMemory(formData: FormData) {
    await api.post(
      '/memories',
      {
        coverUrl: formData.get('coverUrl'),
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        createdAt: formData.get('createdAt'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  async function uploadNewImage(fileToUpload: File) {
    const uploadFormData = new FormData()
    uploadFormData.set('file', fileToUpload)
    const uploadResponse = await api.post('/upload', uploadFormData)
    return uploadResponse.data.fileUrl
  }

  async function updateMemory(formData: FormData) {
    await api.put(
      `/memories/${memory?.id}`,
      {
        coverUrl: formData.get('coverUrl'),
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        createdAt: formData.get('createdAt'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }

  return (
    <form onSubmit={handleUpdateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            id="isPublic"
            name="isPublic"
            value="true"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-400"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker oldPreview={memory?.coverUrl} />
      <DTimePicker
        memoryDateTime={memoryDateTime}
        changeMemoryDateTime={setMemoryDateTime}
      />

      <textarea
        name="content"
        spellCheck="false"
        value={memory?.content}
        onChange={(e) =>
          memory && setMemory({ ...memory, content: e.target.value })
        }
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa
      experiência que você quer lembrar para sempre."
      />
      <button
        className="self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm font-bold uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  )
}
