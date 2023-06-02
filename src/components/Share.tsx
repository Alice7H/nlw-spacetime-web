'use client'

import { usePathname } from 'next/navigation'
import {
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  EmailShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'
import { Memory } from '@/types/Memory'

interface Props {
  memory: Memory
}

export function Share({ memory }: Props) {
  const pathname = usePathname()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL as string
  const fullUrl = appUrl.concat(pathname)

  if (memory === undefined) return null

  return (
    <div className="flex items-center justify-start gap-2">
      <EmailShareButton
        subject={'Share memory'}
        body={memory.content}
        separator={'\nVeja em: '}
        url={fullUrl}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>

      <WhatsappShareButton
        title={memory.content}
        separator={'\nVeja em: '}
        url={fullUrl}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <TwitterShareButton
        title={memory.content.slice(0, 150).concat('...')}
        url={`${fullUrl}\n`}
        hashtags={['mymemory', 'nextshare', 'rocketseat']}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  )
}
