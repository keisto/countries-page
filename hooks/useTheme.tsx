import { useEffect, useState } from 'react'

export default () => {
  const key = 'my-theme' // Key for localstorage
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  useEffect(() => {
    window.localStorage.setItem(key, theme)
  }, [theme])

  // Get theme from localStorage || check preferences
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    const localPreference = window.localStorage.getItem(key)

    if (localPreference === 'dark' || mediaPrefersDark.matches) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  return { theme, toggleTheme }
}
