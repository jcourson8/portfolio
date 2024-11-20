// app/projects/[slug]/page.tsx
import { Metadata, ResolvingMetadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { cache } from 'react'

import type { Project } from '@/payload-types'
import TableOfContents, { TOCItem } from '@/components/TableOfContents'
import RichText from '@/components/RichText'
import { generateTableOfContents } from '@/utilities/toc'

// Define params type
type Params = Promise<{ slug: string }>

// Define search params type
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// Props type following Next.js conventions for async APIs
type Props = {
  params: Params
  searchParams: SearchParams
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

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const project = await queryProjectBySlug({ slug: params.slug })
  if (!project) return {}

  const previousImages = (await parent).openGraph?.images || []
  const projectImage =  `${process.env.NEXT_PUBLIC_SERVER_URL}/og-image.png`

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | James Courson`,
      description: project.description,
      type: 'article',
      images: projectImage ? [projectImage, ...previousImages] : previousImages,
      modifiedTime: project.updatedAt,
    },
  }
}

export default async function ProjectPage(props: Props) {
  const params = await props.params
  const project = await queryProjectBySlug({ slug: params.slug })
  if (!project) return notFound()

  const tableOfContents = generateTableOfContents(project.content)

  return (
    <div className="container max-w-4xl p-8 leading-tight">
      <Link 
        href="/projects" 
        prefetch={false}
        className="inline-flex items-center gap-3 text-sm font-light text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="tracking-wide">Back to Projects</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-8">
            <TableOfContents items={tableOfContents} />
          </div>
        </aside>

        <main className="lg:col-span-9">
          <article className="max-w-4xl space-y-8">
            <header className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground">
                    {project.title}
                  </h1>

                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 p-2.5 
                      bg-secondary/50 rounded-lg hover:bg-secondary transition-colors shrink-0"
                      aria-label="View Repository"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span className="tracking-wide hidden sm:inline">View Repository</span>
                    </a>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="px-2.5 py-0.5 text-xs sm:text-sm font-light bg-secondary/50"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-border" />
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none
           prose-headings:font-extralight prose-headings:tracking-tight
           prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
           prose-p:text-base prose-p:leading-relaxed prose-p:font-light
           prose-p:text-muted-foreground
           prose-strong:font-normal prose-strong:text-foreground
           prose-a:text-foreground prose-a:no-underline hover:prose-a:underline
           prose-a:underline-offset-4
           prose-pre:bg-secondary prose-pre:border prose-pre:border-border
           prose-code:text-foreground prose-code:font-mono
           prose-code:before:content-[''] prose-code:after:content-['']
           prose-img:rounded-md prose-img:border prose-img:border-border
           prose-blockquote:border-l-2 prose-blockquote:border-border
           prose-blockquote:pl-6 prose-blockquote:italic
           prose-ul:list-disc prose-ul:pl-6 prose-ul:marker:text-muted-foreground
           prose-ol:list-decimal prose-ol:pl-6 prose-ol:marker:text-muted-foreground pb-48">
              <RichText 
                content={project.content}
                enableGutter={false}
                enableProse={true}
              />
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}