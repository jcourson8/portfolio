import { useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme(pageTheme?: Theme) {
  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark')
    const isGoingLight = pageTheme === 'light'
    
    if (isCurrentlyDark && isGoingLight) {
      document.documentElement.classList.add('transitioning')
      
      // Remove transitioning class after animation completes
      const timer = setTimeout(() => {
        document.documentElement.classList.remove('transitioning')
      }, 400) // Match this with --theme-transition-duration

      document.documentElement.classList.remove('dark')
      
      return () => {
        clearTimeout(timer)
        // Reset to dark theme when component unmounts
        document.documentElement.classList.remove('transitioning')
        document.documentElement.classList.add('dark')
      }
    } else {
      // Instant transition for dark mode
      document.documentElement.classList.remove('transitioning')
      if (!pageTheme || pageTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // Always ensure we reset to dark on unmount
      return () => {
        document.documentElement.classList.remove('transitioning')
        document.documentElement.classList.add('dark')
      }
    }
  }, [pageTheme])
} 