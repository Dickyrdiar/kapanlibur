import { motion, AnimatePresence } from 'framer-motion';
import { controllerNavbar } from "/src/controller/controllerNavbar";

const NavbarComponent = () => {
  const {
    selectedLAnguage,
    isOpen,
    isDark,
    ToggleTheme,
    setIsOpen,
    language,
    handleLanguage

  } = controllerNavbar()

  return (
    <nav className="flex fixed w-full items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <div className="relative inline-block">
          <button
            className={`bg-gray-200 dark:bg-gray-800 w-12 h-6 rounded-full p-1 focus:outline-none transition-transform transform ${
              isDark ? 'translate-x-6 bg-blue-500' : ''
            }`}
            onClick={ToggleTheme}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-md transform ${
                isDark ? 'translate-x-4' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
       <span className="rounded-md shadow-sm">
         <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
          id="options-menu"
          aria-haspopup="listbox"
          aria-expanded="true"
         >
           {selectedLAnguage}
           <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
         </button>
       </span>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="origin-top-right absolute absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div 
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {language.map((lang) => (
                  <a 
                    key={lang}
                    href="#"
                    onClick={() => handleLanguage(lang)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {lang}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default NavbarComponent