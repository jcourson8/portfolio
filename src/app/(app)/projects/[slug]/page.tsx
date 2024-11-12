import { JSDOM } from 'jsdom'
import { Metadata, ResolvingMetadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import type { Project } from '@/payload-types'
import TableOfContents, { TOCItem } from '@/components/TableOfContents'
import { cache } from 'react'
import styles from './ProjectPage.module.css'
import RichText from '@/components/RichText'

// Define params type
type Params = Promise<{ slug: string }>

// Define search params type
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Props type following Next.js conventions for async APIs
type Props = {
  params: Params
  searchParams: SearchParams
}

export async function generateStaticParams(): Promise<{ params: Params }[]> {
  const payload = await getPayloadHMR({ config })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return projects.docs.map(({ slug }) => ({
    params: Promise.resolve({ slug: slug || '' })
  }))
}

export default async function ProjectPage(props: Props) {
  const params = await props.params
  const project = await queryProjectBySlug({ slug: params.slug })
  if (!project) return notFound()

  // const { tableOfContents, contentWithIds } = processContent(project.content_html || '')

  return (
    <>
    <div className={`container max-w-4xl mx-auto py-12 flex ${styles.styledContent}`}>
      <aside className="w-64 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <Link 
            href="/chat" 
            prefetch={false}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
           {/* <TableOfContents items={tableOfContents} /> */}
          <TableOfContents items={generateTableOfContents(project.content)} />
        </div>
      </aside>
      <article className="flex-grow max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">{project.title}</h1>
          <div className="flex items-center space-x-2">
            {project.technologies?.map((technology, index) => (
              <Badge key={index} variant="secondary">{technology.name}</Badge>
            ))}
          </div>
          <Separator />
          <RichText 
            content={project.content} 
            enableGutter={false}
            enableProse={true}
          />
        </div>
      </article>
    </div>
    </>
  )
}

export async function generateMetadata(props: {
  params: Params
  searchParams: SearchParams
}, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const project = await queryProjectBySlug({ slug: params.slug })
  if (!project) return {}

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [...previousImages]
    }
  }
}

// Query response type
type QueryResponse = {
  docs: Project[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
  pagingCounter: number
  totalDocs: number
  totalPages: number
}

const queryProjectBySlug = cache(async ({ 
  slug 
}: {
  slug: string 
}): Promise<Project | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayloadHMR({ config })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  }) as QueryResponse

  return result.docs[0] || null
})

function generateTableOfContents(content: any): TOCItem[] {
  const tableOfContents: TOCItem[] = []
  
  if (!content?.root?.children) return tableOfContents

  content.root.children.forEach((node: any, index: number) => {
    if (node.type === 'heading' && (node.tag === 'h1' || node.tag === 'h2')) {
      const text = node.children?.[0]?.text || ''
      const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      
      tableOfContents.push({
        id,
        text,
        level: node.tag === 'h1' ? 1 : 2
      })
    }
  })

  return tableOfContents
}
