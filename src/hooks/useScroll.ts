import { useState, useEffect } from 'react'

const useScroll = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        setIsNavVisible(true)
      } else {
        setIsNavVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return { isNavVisible }
}

export default useScroll