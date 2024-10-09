'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Project } from '@/payload-types'

export async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayload({
      config,
    })
    const projectsData = await payload.find({
      collection: 'projects',
      depth: 1,
    })
    return projectsData.docs as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
}