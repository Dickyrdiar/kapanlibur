/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"

export const controllerNavbar = () => {
  const [selectedLAnguage, setSelectedLanguage] = useState("ID")
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const language = ['ID', 'EN']

  const handleLanguage = (lang) => {
    setSelectedLanguage(lang)
    setIsOpen(false)
  }

  useEffect(() => {
    const usePrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme) {
      setIsDark(storedTheme === 'dark')
    } else {
      setIsDark(usePrefersDark)
    }
  }, [])

  const ToggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark)

    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return { 
    selectedLAnguage,
    isOpen,
    language,
    handleLanguage,
    ToggleTheme,
    setIsOpen
  }
}