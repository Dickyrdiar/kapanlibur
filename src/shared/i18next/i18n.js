import idTranslation from './translation/id.json'
import enTranslation from './translation/en.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resource = {

  id: {
    translation: idTranslation,
  },
  en: {
    translation: enTranslation
  }
}

i18n.use(initReactI18next)
    .init({
      resource,
      lng: 'id',
      fallback: 'en',
      interpolitation: {
        escapeValue: false
      }
    })

export default i18n