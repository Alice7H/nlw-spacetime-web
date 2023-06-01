import { EmptyMemories } from '@/components/EmptyMemories'
import { Share } from '@/components/Share'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
  isPublic: string
}

interface MemoryDetailsProps {
  params: { id: string }
  searchParams: {}
}

export default async function MemoryDetails(props: MemoryDetailsProps) {
  const { id } = props.params

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const memory: Memory = response.data

  if (!memory) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4">
        <h2 className="font-body text-center text-lg font-bold text-gray-50">
          Memória {memory.isPublic ? 'pública' : 'privada'}
        </h2>
        <Image
          src={memory.coverUrl}
          alt="Memory image"
          width={592}
          height={288}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <time className="mr-5 flex items-center gap-2 text-sm text-gray-100">
          {dayjs(memory.createdAt).format('DD [de] MMMM[,] YYYY HH:mm:ss')}
        </time>
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>

        <Link
          href={`/memories`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <Share memory={memory} />
      </div>
    </div>
  )
}
