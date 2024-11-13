import { Project } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { GithubIcon } from './icons/GithubIcon'
import { ArrowUpperRightIcon } from './icons/ArrowUpperRightIcon'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col h-[120px] sm:h-[150px] border-b border-border py-3 sm:py-4">
      <div className="flex justify-between items-baseline mb-2 sm:mb-4">
        <div className="w-1/2 h-5 sm:h-6 bg-border/40 rounded-sm animate-pulse" />
        <div className="w-12 sm:w-16 h-3 sm:h-4 bg-border/40 rounded-sm animate-pulse" />
      </div>
      
      <div className="flex-1 mb-2 sm:mb-4 space-y-1.5 sm:space-y-2">
        <div className="w-full h-3 sm:h-4 bg-border/40 rounded-sm animate-pulse" />
        <div className="w-3/4 h-3 sm:h-4 bg-border/40 rounded-sm animate-pulse" />
      </div>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index}
            className="w-12 sm:w-16 h-2 sm:h-3 bg-border/40 rounded-sm animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}; 

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="group flex flex-col h-[120px] sm:h-[150px] border-b border-border py-3 sm:py-4 transition-colors hover:border-muted">
        <div className="flex justify-between items-baseline mb-2 sm:mb-4">
          <h3 className="text-base sm:text-lg font-normal tracking-tight text-foreground pr-4">{project.title}</h3>
          <span className="text-xs sm:text-sm font-light text-muted">{project.year}</span>
        </div>
        
        <p className="text-xs sm:text-sm font-light text-foreground/80 mb-2 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
          {project.technologies?.map((tech, index) => (
            <span key={index} className="text-xs font-light text-muted">
              {tech.name}{index < (project.technologies?.length ?? 0) - 1 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard