import { useState } from "react"
import { useTranslation } from 'react-i18next';

export const ControllerNavbar = () => {
  const [isOpen, setIsopen] = useState(false)
  const {i18n} = useTranslation()

  const handleOpenLang = () => {
    setIsopen(!isOpen)
  }

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng)
  }

  return {
    isOpen,
    handleOpenLang,
    i18n,
    handleChangeLang
  }
}