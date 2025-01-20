import React from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io"; // Replace with actual imports
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../themeSlice"; // Adjust the import path

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <nav
      className={`flex fixed w-full items-center justify-between p-6 z-30 lg:px-8 ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-black"
      }`}
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <div className="relative inline-block">
          {/* Your logo or other elements */}
        </div>
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end z-10 cursor-pointer relative"> {/* Add z-index and relative positioning */}
        <button
          className="z-50 cursor-pointer relative" // Add z-index and relative positioning
          onClick={() => {
            console.log("Theme toggle button clicked"); // Debugging
            dispatch(toggleTheme());
          }}
        >
          {theme === 'light' ? 
            <IoMdSunny className='h-5 w-5 cursor-pointer' /> :
            <IoMdMoon className='h-5 w-5 cursor-pointer' />
          }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;