import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer className={`flex justify-center items-center py-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Copyright © {new Date().getFullYear()} - {" "}
          <a
            href="https://github.com/Dickyrdiar/kapanlibur"
            className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
          >
            GitHub
          </a>{" "}
          and API from{" "}
          <a
            href="https://api-harilibur.vercel.app/"
            className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
          >
            API Harilibur
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;