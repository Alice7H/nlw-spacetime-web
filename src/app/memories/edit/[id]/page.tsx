import { Memory } from '@/types/Memory'
import { EmptyMemories } from '@/components/EmptyMemories'
import { MemoryForm } from '@/components/MemoryForm'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

export default async function EditMemory(props: Props) {
  const { id } = props.params

  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const memory: Memory = response.data

  if (!memory) return <EmptyMemories />

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/memories"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <MemoryForm oldMemory={memory} />
    </div>
  )
}
