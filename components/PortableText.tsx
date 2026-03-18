import { PortableText as SanityPortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const components = {
  types: {
    image: ({ value }: { value: { asset: { url: string }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            width={900}
            height={600}
            className="w-full object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-[#6B6B67]">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    callout: ({ value }: { value: { type: string; text: string } }) => {
      const styles: Record<string, string> = {
        info: 'border-[#043927] bg-[#e8f4ef] text-[#043927]',
        warning: 'border-[#DAA520] bg-[#fdf3d0] text-[#7a5a00]',
        success: 'border-[#22C55E] bg-[#f0fdf4] text-[#166534]',
        tip: 'border-[#6366f1] bg-[#eef2ff] text-[#3730a3]',
      }
      const icons: Record<string, string> = {
        info: 'ℹ️',
        warning: '⚠️',
        success: '✅',
        tip: '💡',
      }
      return (
        <div className={`my-6 border-l-4 rounded-r-lg p-4 ${styles[value.type] || styles.info}`}>
          <span className="mr-2">{icons[value.type] || icons.info}</span>
          {value.text}
        </div>
      )
    },
    codeBlock: ({ value }: { value: { language: string; code: string; filename?: string } }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-[#043927]/90 text-[#DAA520] text-xs font-mono px-4 py-2 rounded-t-lg">
            {value.filename}
          </div>
        )}
        <pre className={`bg-[#043927] text-[#e8f4ef] p-4 rounded-lg overflow-x-auto text-sm font-mono ${value.filename ? 'rounded-tl-none rounded-tr-none' : ''}`}>
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: { value?: { href: string }; children: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-[#DAA520] underline underline-offset-2 hover:text-[#b8891a]"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableText({ value }: { value: unknown[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <SanityPortableText value={value as Parameters<typeof SanityPortableText>[0]['value']} components={components} />
    </div>
  )
}
