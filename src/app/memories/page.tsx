import { EmptyMemories } from '@/components/EmptyMemories'
import { SimplifyMemory } from '@/types/Memory'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ptBr from 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale(ptBr)

export default async function Memories() {
  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const memories: SimplifyMemory[] = response.data

  if (memories.length === 0) return <EmptyMemories />

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('DD [de] MMMM[,] YYYY HH:mm:ss')}
          </time>
          <Image
            src={memory.coverUrl}
            alt="Memory image"
            width={592}
            height={288}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/details/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
