'use client';

import React, { useEffect, useState } from 'react'
import ProjectCard, { ProjectCardSkeleton } from './ProjectCard'
import { Project } from '@/payload-types'
import { getProjects } from '@/actions/getProjects';
import Link from 'next/link';

const attributes = ['a developer.', 'a pole vaulter.', 'a designer.', 'an AI enthusiast.'];

const LandingIntro: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto p-8 pt-24">
      <p className="text-4xl font-normal tracking-tight text-foreground mb-16">
        I&apos;m <TypingEffect />
      </p>
      
      <div className="space-y-12">
        <div className="flex justify-between items-baseline border-b border-border pb-2">
          <h2 className="text-xl font-normal tracking-tight text-foreground">Featured Projects</h2>
          <Link 
            href="/projects" 
            className="text-sm font-light text-muted hover:text-foreground transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading 
            ? [...Array(4)].map((_, i) => <ProjectCardSkeleton key={i} />)
            : projects.slice(0, 4).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % attributes.length;
      const fullText = attributes[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 70);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 900);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default LandingIntro;
