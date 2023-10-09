import idTranslation from './translation/id.json'
import enTranslation from './translation/en.json'
import i18n from 'i18next'

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'id',
  resources: {
    id: {
      translation: idTranslation
    },
    en: {
      translation: enTranslation
    }
  },
})

export default i18n