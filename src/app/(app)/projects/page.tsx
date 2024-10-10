import React from 'react'
import Link from 'next/link'
import { getProjects } from '@/actions/getProjects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="dark container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <span className="text-blue-500 hover:underline">View Project</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
