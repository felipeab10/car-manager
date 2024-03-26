'use client'
import { useEffect, useState } from 'react'
import config from '../../../tailwind.config'

export const useMobile = () => {
  const [currentScreenWidth, setCurrentScreenWidth] = useState(0)

  function isMobile() {
    return currentScreenWidth <= parseInt(config.theme.screens.mobile.max)
    //   return Object.keys(config.theme.screens).reduce((acc, current) => {
    //     const key = current as keyof typeof config.theme.screens

    //     const smallScreen = config.theme.screens['mobile'].max

    //     return (acc = currentScreenWidth <= parseInt(smallScreen))
    //   }, false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentScreenWidth(window.innerWidth)

      window.addEventListener('resize', () =>
        setCurrentScreenWidth(window.innerWidth),
      )
    }

    return () => {
      window.removeEventListener('resize', () =>
        setCurrentScreenWidth(window.innerWidth),
      )
    }
  }, [])

  return { isMobile }
}
