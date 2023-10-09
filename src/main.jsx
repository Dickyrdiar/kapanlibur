// import { I18NextReactProvider } from 'i18next-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App.jsx'
// import { ThemeProvider } from './context/themeContext.jsx'
import './index.css'
import i18n from './shared/i18next/i18n.js'
// import i18n from './shared/i18next/i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
   <I18nextProvider i18n={i18n}>
      <App />
   </I18nextProvider>
  </React.StrictMode>,
)

// ServiceWorkerRegistration.unregister()
