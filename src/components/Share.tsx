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

interface Props {
  memory: {
    id: string
    coverUrl: string
    content: string
    createdAt: string
    isPublic: string
  }
}

export function Share(props: Props) {
  const pathname = usePathname()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL as string
  const fullUrl = appUrl.concat(pathname)
  const { memory } = props

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
