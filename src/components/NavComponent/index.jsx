import { Converty } from '../Converti';
import { ControllerNavbar } from '../../controller/controllerNavbar';

const NavbarComponent = (converty) => {
  const {
    isOpen,
    handleOpenLang,
    i18n,
    handleChangeLang
  } = ControllerNavbar()


  {converty ? (
    <Converty />
  ) : null}

  return (
    <nav className="flex fixed w-full items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <div className="relative inline-block">
        </div>
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => handleOpenLang()}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
            id="option-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {i18n.language}
          </button>   
        </span>

        <div className={`origin-top-right absolute right-0 mt-2 w-56      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
          ${isOpen ? 'block' : 'hidden'}
          `}
        >
          <div
            className='py-1'
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleChangeLang('en')}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => handleChangeLang('id')}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Indonesia
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent