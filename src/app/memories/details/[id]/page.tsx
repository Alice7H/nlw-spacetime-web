import { Memory } from '@/types/Memory'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Share } from '@/components/Share'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBr)

interface MemoryDetailsProps {
  params: { id: string }
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
        <Link
          href={`/memories`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
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

        <div className="flex items-center justify-end">
          <Link
            href={`/memories/edit/${memory.id}`}
            className="rounded-full bg-green-500 px-5 py-3 font-alt text-sm font-bold uppercase leading-none text-black hover:bg-green-600"
          >
            Editar lembrança
          </Link>
        </div>
        <Share memory={memory} />
      </div>
    </div>
  )
}
