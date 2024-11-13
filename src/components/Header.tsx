import React, { useState } from 'react'
import { GithubIcon } from './icons/GithubIcon'
import Link from 'next/link'
import { LinkedInIcon } from './icons/LinkedInIcon'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 py-4 px-8 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="group">
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
