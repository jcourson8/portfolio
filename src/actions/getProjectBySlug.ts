'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Project } from '@/payload-types'

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1,
    })
    if (result.docs.length > 0) {
      return result.docs[0] as Project
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    throw new Error(`Failed to fetch project with slug ${slug}`)
  }
}
