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
    <div className="w-full max-w-4xl mx-auto p-8 pt-0 ">
      {/* <h1 className="text-xl font-semibold mb-2">James Courson</h1> */}
      <p className="text-3xl md:text-5xl mb-8 font-bold pb-10 pt-14">
        I&apos;m <TypingEffect />
      </p>
      <div className="px-6">
        <div className="flex justify-between items-center mb-4 pl-4">
          <h3 className="text-md">Featured Projects:</h3>
          <Link 
            href="/projects" 
            className="text-sm hover:underline text-muted"
          >
            View All Projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
