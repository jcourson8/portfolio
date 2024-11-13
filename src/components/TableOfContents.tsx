'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers = new Map();
    
    // Setup observers for each heading
    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(id);
              }
            });
          },
          {
            rootMargin: '-20% 0% -35% 0%',
            threshold: 1.0,
          }
        );
        
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  return (
    <nav className="space-y-1 text-sm">
      <p className="text-sm font-medium tracking-wider text-muted-foreground mb-4 uppercase">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className={cn(
            'block py-1 text-sm transition-colors duration-200',
            'hover:text-foreground',
            item.level === 2 && 'pl-4',
            activeId === item.id
              ? 'text-foreground font-medium'
              : 'text-muted-foreground font-light',
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}