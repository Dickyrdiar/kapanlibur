// import { I18NextReactProvider } from 'i18next-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { ThemeProvider } from './context/themeContext.jsx'
import './index.css'
// import i18n from './shared/i18next/i18n.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
   {/* <I18NextReactProvider i18n={i18n}>
   
   </I18NextReactProvider> */}
    <App />
  </React.StrictMode>,
)

// ServiceWorkerRegistration.unregister()
