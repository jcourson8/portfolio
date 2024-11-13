'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/payload-types';
import { getProjects } from '@/actions/getProjects';
import ProjectCard, { ProjectCardSkeleton } from '@/components/ProjectCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-4xl p-8 leading-tight"
    >
      <Link 
        href="/chat" 
        prefetch={false}
        className="inline-flex items-center gap-3 text-sm font-light text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="tracking-wide">Back to Home</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-normal tracking-tight mb-4 text-foreground">Projects</h1>
        <p className="text-sm font-light text-muted-foreground">
          A collection of my recent work and experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading 
          ? [...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)
          : projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
        }
      </div>
    </motion.div>
  );
};

export default ProjectsPage;