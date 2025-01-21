import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux

  return (
    <footer className={`flex justify-center mt-[-40px] items-center pt-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <typography color="gray">
        <p className={`text-md ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
          Copyright © {new Date().getFullYear()} -{" "}
          <a
            href="https://github.com/Dickyrdiar/kapanlibur"
            className="no-underline hover:no-underline"
          >
            GitHub
          </a>{" "}
          and API from{" "}
          <a
            href="https://api-harilibur.vercel.app/"
            className="no-underline hover:no-underline"
          >
            api harilibur
          </a>
        </p>
      </typography>
    </footer>
  );
};

export default Footer;