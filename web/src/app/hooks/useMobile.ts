'use client'
import config from '../../../tailwind.config'

export const useMobile = () => {
  function isMobile() {
    return Object.keys(config.theme.screens).reduce((acc, current) => {
      const key = current as keyof typeof config.theme.screens
      let windowScreen = 414

      if (typeof window !== 'undefined') {
        windowScreen = window?.innerWidth
      }

      const localScreens = config.theme.screens[key]
      return (acc =
        windowScreen < parseInt(localScreens.min?.replace('px', '')))
    }, false)
  }

  return { isMobile }
}
