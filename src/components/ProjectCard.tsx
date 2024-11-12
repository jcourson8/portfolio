import { Project } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { GithubIcon } from './icons/GithubIcon'
import { ArrowUpperRightIcon } from './icons/ArrowUpperRightIcon'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

export const ProjectCardSkeleton = () => {
  return (
    <div className="border border-border py-4 px-5 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div className="h-7 bg-primary/10 rounded w-2/3 animate-pulse" />
        <div className="w-4 h-4 bg-primary/10 rounded animate-pulse" />
      </div>
      <div className="flex-grow space-y-2 mt-3">
        <div className="h-4 bg-primary/10 rounded w-full animate-pulse" />
        <div className="h-4 bg-primary/10 rounded w-3/4 animate-pulse" />
      </div>
      <div className="flex gap-2 mt-3">
        <div className="h-6 bg-primary/10 rounded-full w-16 animate-pulse" />
        <div className="h-6 bg-primary/10 rounded-full w-16 animate-pulse" />
      </div>
    </div>
  )
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group border border-border py-4 px-5 rounded-lg shadow-lg h-full flex flex-col transition-colors duration-300 hover:border-muted-foreground">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold pr-4 flex-grow">{project.title}</h3>
          <div className="flex-shrink-0">
            <ArrowUpperRightIcon className="w-4 h-4 my-2 transition-colors duration-300 group-hover:stroke-muted-foreground" />
          </div>
        </div>
        <p className="flex-grow font-light font-sm">{project.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, index) => (
              <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {tech.name}
              </span>
            ))}
          </div>
          {/* <div className="flex items-center space-x-2">
            {project.githubUrl && (
              <GithubIcon githubUrl={project.githubUrl} altText="GitHub Repo" />
            )}
            {project.projectUrl && (
              <ExternalLinkIcon projectUrl={project.projectUrl} altText="Website Link" />
            )}
          </div> */}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard