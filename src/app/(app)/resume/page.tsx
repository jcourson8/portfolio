'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const projects = [
  {
    title: "Conversational Codebase",
    year: "2024",
    description: "Developed a Python-based conversational AI tool for simplified codebase interaction, utilizing semantic search and OpenAI models. Implemented advanced features including knowledge graph dependency resolution, LLM validation with citation, and Retrieval Augmented Generation (RAG).",
    githubUrl: "https://github.com/jcourson8/conversational-codebase",
    projectUrl: null,
    technologies: ["Python", "OpenAI", "RAG", "LangChain"]
  },
  {
    title: "Doxi CLI Documentation Tool",
    year: "2024",
    description: "Built a CLI tool leveraging Jina AI's reader API to convert web documentation into LLM-friendly formats, optimizing content organization for enhanced AI model comprehension and response accuracy.",
    githubUrl: "https://github.com/jcourson8/doxi",
    projectUrl: null,
    technologies: ["Python", "Jina AI"]
  },
  {
    title: "CodeSelect",
    year: "2024",
    description: "Created a browser-based tool using SolidJS and Tailwind CSS that streamlines code sharing with AI language models. Implemented client-side project structure processing using File System Access API, serving 100+ active users on Vercel.",
    githubUrl: "https://github.com/jcourson8/codeselect",
    projectUrl: null,
    technologies: ["SolidJS", "Tailwind CSS"]
  },
  {
    title: "Real ORNL CAN Dataset Dataloader",
    year: "2023",
    description: "Developed a customizable dataloader handling 26 million CAN packets, featuring configurable batch sizes and flexible feature processing options.",
    githubUrl: "https://github.com/jcourson8/ornl-can-dataloader",
    projectUrl: null,
    technologies: ["Python"]
  },
  {
    title: "Full-Stack Rust-Leptos Web Application",
    year: "2023",
    description: "Built a full-stack web application using Rust and Leptos, compiled to WebAssembly. Implemented comprehensive user authentication including signup, login, and secure session management.",
    githubUrl: "https://github.com/jcourson8/rust-leptos-web-application",
    projectUrl: null,
    technologies: ["Rust", "Leptos"]
  },
  {
    title: "Openstack Cloud Deployment",
    year: "2023",
    description: "Led team deployment of virtualized servers managed by Ceph, using Kolla-Ansible for OpenStack configuration, creating a scalable cloud infrastructure.",
    githubUrl: "https://github.com/jcourson8/openstack-cloud-deployment",
    projectUrl: null,
    technologies: ["OpenStack", "Ceph"]
  }
];

const ResumePage: React.FC = () => {
  useTheme('light');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.tech-tag')) {
        setSelectedTech(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto p-4 sm:p-8 leading-tight overflow-x-hidden"
    >
      <Link 
        href="/chat" 
        prefetch={false}
        className="inline-flex items-center gap-3 text-sm font-light text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="tracking-wide">Back to Home</span>
      </Link>

      {/* Header */}
      <motion.header className="mb-12">
        <h1 className="text-4xl font-normal tracking-tight mb-4 text-foreground break-words">James B. Courson</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm font-light">
          <a href="mailto:jcourson@proton.me" className="text-foreground hover:text-muted transition-colors">
            <span className="flex items-center gap-2">
              <FaEnvelope className="w-3 h-3" /> jcourson@proton.me
            </span>
          </a>
          <span className="text-muted hidden sm:inline">|</span>
          <a href="https://github.com/jcourson8" className="text-foreground hover:text-muted transition-colors">
            <span className="flex items-center gap-2">
              <FaGithub className="w-3 h-3" /> github.com/jcourson8
            </span>
          </a>
          <span className="text-muted hidden sm:inline">|</span>
          <span className="text-foreground">U.S. Citizen</span>
        </div>
      </motion.header>

      {/* Education Section */}
      <motion.section className="mb-12">
        <h2 className="text-2xl font-normal tracking-tight mb-6 text-foreground">Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-12 mb-4">
            <div className="flex justify-between items-baseline border-b border-border pb-2">
              <h3 className="text-xl font-normal tracking-tight text-foreground">Auburn University</h3>
              <span className="text-sm font-light text-muted">2018—2024</span>
            </div>
          </div>

          {/* Graduate & Undergraduate sections - similar pattern */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-1">Graduate Degree</p>
              <h4 className="font-normal mb-1 text-foreground">M.S.E. Cybersecurity Engineering</h4>
              <p className="text-sm font-light text-muted-foreground">GPA 3.90 · May 2024</p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-2">Coursework</p>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {[
                  "Cloud Computing",
                  "Artificial Intelligence",
                  "Evolutionary Computing",
                  "Cybersecurity Threats",
                  "Digital Forensics",
                  "Advanced OS",
                  "Network Security",
                  "Reverse Engineering"
                ].map((course) => (
                  <span key={course} className="font-light">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Undergraduate Degree */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">Undergraduate Degree</p>
              <h4 className="font-normal mb-1">B.S.E. Computer Science</h4>
              <p className="text-sm font-light text-muted-foreground">Mathematics Concentration · GPA 3.55 · May 2022</p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Coursework</p>
              <div className="grid grid-cols-2 gap-1 text-sm">
                {[
                  "Algorithms",
                  "Machine Learning",
                  "Cryptography",
                  "Data Compression",
                  "Operating Systems",
                  "Computer Networks",
                  "Graph Theory"
                ].map((course) => (
                  <span key={course} className="font-light">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Employment Section */}
      <motion.section className="mb-12">
        <h2 className="text-2xl font-normal tracking-tight mb-6">Employment</h2>
        
        {/* Software Engineer at Military REACH */}
        <div className="border-b border-neutral-200 pb-2 mb-6">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-xl font-normal tracking-tight">Software Engineer</h3>
              <p className="text-sm font-light text-neutral-500">Military REACH Program</p>
            </div>
            <span className="text-sm font-light text-muted">2023—Present</span>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Framework Modernization</p>
            <p className="text-sm font-light">Led the migration to Next.js App Router architecture, implementing TanStack Query for efficient search result caching and improved application performance.</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">AI-Enhanced Search</p>
            <p className="text-sm font-light">Developed an AI-powered search tool using OpenAI embeddings, improving retrieval efficiency across 10,000+ documents.</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Content Management</p>
            <p className="text-sm font-light">Automated migration of static content to Markdown format, streamlining content management and deployment cycles.</p>
          </div>
        </div>

        {/* Research & Teaching Positions */}
        <div className="border-b border-neutral-200 pb-2 mb-6">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="text-xl font-normal tracking-tight">Graduate Research & Teaching Assistant</h3>
              <p className="text-sm font-light text-neutral-500">Auburn University</p>
            </div>
            <span className="text-sm font-light text-muted">2022—Present</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Research</p>
            <p className="text-sm font-light">Deployed an IDS for Controller Area Networks achieving 0.99 F1 Score. Created novel 3D attack pattern visualizations and assisted in vulnerability assessments for bus manufacturers.</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Teaching</p>
            <p className="text-sm font-light">Managed coursework and grading for Software Construction, Software Engineering, and Software Modeling courses. Developed automation tools to streamline grading processes.</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Course Support</p>
            <p className="text-sm font-light">Facilitated labs, provided programming support, and ensured student comprehension of core concepts across multiple courses focusing on C++, Python, and Java.</p>
          </div>
        </div>
      </motion.section>

      {/* Technical Experience Section */}
      <motion.section className="mb-12">
        <h2 className="text-2xl font-normal tracking-tight mb-6">Technical Experience</h2>
        
        <div className="grid grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className={`col-span-12 md:col-span-6 min-h-[200px] flex flex-col
                ${selectedTech && project.technologies.includes(selectedTech) ? 'opacity-100' : selectedTech ? 'opacity-40' : 'opacity-100'}
                transition-opacity duration-200`}
            >
              <div className="border-b border-neutral-200 pb-2 mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-normal">{project.title}</h3>
                  <span className="text-sm font-light text-muted">{project.year}</span>
                </div>
              </div>
              
              <p className="text-sm font-light mb-4 flex-grow">{project.description}</p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <button 
                      key={techIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTech(tech === selectedTech ? null : tech);
                      }}
                      className={`tech-tag text-xs font-light transition-colors
                        ${tech === selectedTech 
                          ? 'text-neutral-900' 
                          : 'text-neutral-500'}`}
                    >
                      {tech}{techIndex < project.technologies.length - 1 ? " ·" : ""}
                    </button>
                  ))}
                </div>

                <div className="h-6 flex items-center"> {/* Fixed height container */}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-light hover:text-neutral-500 transition-colors"
                    >
                      <span className="flex items-center gap-1">
                        <FaGithub className="w-3 h-3" /> View Repository
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Additional Section - Redesigned */}
      <motion.section className="mb-12">
        <h2 className="text-2xl font-normal tracking-tight mb-6">Additional</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Languages</p>
            <div className="flex flex-wrap gap-x-2 text-sm font-light">
              <span>Python</span>
              <span className="text-neutral-300">·</span>
              <span>TypeScript</span>
              <span className="text-neutral-300">·</span>
              <span>Java</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Technologies</p>
            <p className="text-sm font-light">
              OpenAI API · PyTorch · Flask · LangChain · NextJS · Leptos · Git · Linux · IDA · Docker · Ansible · Openstack · Ceph · Kubernetes
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Other</p>
            <p className="text-sm font-light">CyberCorps SFS Recipient</p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ResumePage;
