import React, { useState } from 'react'
import { GithubIcon } from './icons/GithubIcon'
import Link from 'next/link'
import { LinkedInIcon } from './icons/LinkedInIcon'

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="sticky top-0 bg-neutral-900 flex items-center justify-between py-5 px-8">
      <a href="/" className="text-primary my-auto relative group">
        <h1 className="text-lg font-bold">James Courson</h1>
      </a>
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
      {/* <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-neutral-700 text-white px-4 py-2 rounded-md w-48 focus:outline-none focus:ring ring-neutral-500"
        >
          Select Repo
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-neutral-900 shadow-lg rounded-md z-50">
            <ul className="text-neutral-400">
              <li className="p-2 hover:bg-neutral-800 cursor-pointer">Repo 1</li>
              <li className="p-2 hover:bg-neutral-800 cursor-pointer">Repo 2</li>
              <li className="p-2 hover:bg-neutral-800 cursor-pointer">Repo 3</li>
              <li className="p-2 hover:bg-neutral-800 cursor-pointer">More...</li>
            </ul>
          </div>
        )}
      </div> */}
    </div>
  )
}

export default Header
