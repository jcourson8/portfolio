'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Project } from '@/payload-types'

export async function getProject(id: string): Promise<Project | null> {
  try {
    const payload = await getPayload({
      config,
    })
    const projectData = await payload.findByID({
      collection: 'projects',
      id: id,
      depth: 1,
    })
    return projectData as Project
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error)
    throw new Error(`Failed to fetch project with id ${id}`)
  }
}