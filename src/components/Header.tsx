import React, { useState } from 'react'
import { GithubIcon } from './icons/GithubIcon'
import Link from 'next/link'
import { LinkedInIcon } from './icons/LinkedInIcon'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30S bg-background border-b border-border py-2">
      <div className="container flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="group ">
          <h1 className="text-lg font-normal tracking-tight text-foreground">James Courson</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/resume" className="text-sm font-light text-foreground hover:text-muted transition-colors">
            <span className="hover-underline-animation">Resume</span>
          </Link>
          <Link href="/projects" className="text-sm font-light text-foreground hover:text-muted transition-colors">
            <span className="hover-underline-animation">Projects</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LinkedInIcon linkedinUrl="..." altText="LinkedIn" minimal />
            <GithubIcon githubUrl="..." altText="GitHub" minimal />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
