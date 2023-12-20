// components/Header.js
import React, { useState, useEffect,useId  } from 'react';
import Image from 'next/image';
import logo from "../images/logo.png";
import "react-toastify/dist/ReactToastify.css";
import LanguageDropdown from './LanguageDropdown';
import ThemeDropdown from './ThemeDropdown';

const Header = ({ onSelectChange, handleThemeChange, theme, handleSubmit }) => {
  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-2 blue-glassmorphism'>
      <div className="md:flex-[1.0] flex-initial justify-center items-center">
        <Image src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul  className="text-white md:flex hidden justify-between items-center flex-initial ">
        <li>
          <button > 
            <span className='text-black transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'>
              Upload File
            </span>
          </button>
        </li>
        <li className="py-2 mx-2">
          <button onClick={handleSubmit}>
            <span className='text-black transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'>
              Run
            </span>
          </button>
        </li>
        <li className="py-2 mx-2">
          <LanguageDropdown onSelectChange={onSelectChange} />
        </li >
        <li className="py-2 mx-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </li>
      </ul>
    </nav>
  );
};
export default Header;
