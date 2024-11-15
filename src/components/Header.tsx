import React from 'react'
import { GithubIcon } from './icons/GithubIcon'
import Link from 'next/link'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { Button } from './ui/button'

interface HeaderProps {
  toggleSidebar?: () => void;
  showMenuButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, showMenuButton = false }) => {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border py-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center w-full sm:w-auto justify-between">
          {showMenuButton && (
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="sm:hidden h-8 w-8"
            >
              <div className="flex flex-col space-y-1.5">
                <div className="w-5 h-0.5 bg-foreground rounded-full" />
                <div className="w-4 h-0.5 bg-foreground rounded-full" />
              </div>
            </Button>
          )}
          <Link href="/" className="group">
            <h1 className="text-lg font-normal">James Courson</h1>
          </Link>
          {/* Spacer div to maintain centering */}
          {showMenuButton && <div className="w-8 sm:hidden" />}
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/resume" className="text-sm font-light text-foreground">
            <span className="hover-underline-animation">Resume</span>
          </Link>
          <Link href="/projects" className="text-sm font-light text-foreground">
            <span className="hover-underline-animation">Projects</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LinkedInIcon linkedinUrl="https://www.linkedin.com/in/james-courson-447960161/" altText="LinkedIn" minimal />
            <GithubIcon githubUrl="https://github.com/jcourson8" altText="GitHub" minimal />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
