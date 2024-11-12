'use client'

import { useState, useEffect } from 'react'

export type TOCItem = {
  id: string
  text: string
  level: number
}

type Props = {
  items: TOCItem[]
}

export default function TableOfContents({ items }: Props) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Add offset for better UX

      // Find the last section that has been scrolled past
      const active = items
        .slice()
        .reverse()
        .find(item => {
          const element = document.getElementById(item.id)
          if (element) {
            return scrollPosition >= element.offsetTop
          }
          return false
        })

      if (active && active.id !== activeSection) {
        setActiveSection(active.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items, activeSection])

  return (
    <nav className="space-y-1 max-w-[200px]">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block py-1 text-sm transition-colors break-words ${
            activeSection === item.id
              ? 'text-primary font-medium'
              : 'text-muted-foreground hover:text-primary'
          }`}
          style={{
            marginLeft: `${(item.level - 2) * 12}px`,
            paddingRight: '8px',
          }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
