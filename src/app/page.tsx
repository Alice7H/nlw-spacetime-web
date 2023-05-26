import { EmptyMemories } from '@/components/EmptyMemories'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const isAuthenticated = cookies().has('token')
  if (isAuthenticated) redirect('/memories')

  return <EmptyMemories />
}
