import React, { useState } from 'react'
import { GithubIcon } from './icons/GithubIcon'
import Link from 'next/link'
import { LinkedInIcon } from './icons/LinkedInIcon'

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// <div className="sticky top-0 flex items-center justify-between py-5 px-8 border-b border-border bg-background backdrop-blur bg-opacity-10">
  return (
    
    <header 
        className="sticky top-0 n py-4 px-8 border-b border-border"
      >
      <div className="container flex items-center justify-between">
      <Link href="/" className="text-primary my-auto relative group">
        <h1 className="text-lg font-bold">James Courson</h1>
      </Link>
      <div className="flex space-x-4 items-center">
        <Link href="/resume" className="text-primary my-auto relative group">
          <span className="hover-underline-animation">Resume</span>
        </Link>
        <LinkedInIcon
          linkedinUrl="https://www.linkedin.com/in/james-courson-447960161/"
          altText="LinkedIn"
          minimal
        />
        <GithubIcon githubUrl="https://github.com/jcourson8" altText="GitHub" minimal />
        </div>
      </div>
    </header>
  )
}

export default Header
