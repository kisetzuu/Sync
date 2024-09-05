'use client';

import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu} 
        className="p-2 flex items-center justify-center rounded-full hover:bg-opacity-10 hover:bg-white transition-all duration-300"
      >
        <RxHamburgerMenu className="text-2xl" />
      </button>

      {/* Sliding Banner */}
      <div
        className={`fixed top-0 left-0 h-full w-64 text-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-[linear-gradient(to_bottom,_#75277E,_#81245D,_#82245C)]`}
        style={{ zIndex: 999 }}
      >
        {/* Close Button inside the menu */}
        <div className="flex items-center w-auto py-4 mx-3.5">
          <button 
            onClick={toggleMenu} 
            className="p-2 flex items-center justify-center rounded-full hover:bg-opacity-10 hover:bg-white transition-all duration-300"
          >
            <RxHamburgerMenu className="text-2xl" />
          </button>
          <h1 onClick={toggleMenu} className="text-2xl font-bold mx-2 cursor-pointer">Sync</h1>
          <div className="w-[100%] bg-transparent h-[38px] flex items-center justify-center"></div>
        </div>
        <div className="p-4">
          {/* Add your menu items here */}
          <div className="space-y-1">
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4 ">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4 ">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4">Home</a>
            </div>
            <div className="p-2 flex rounded-lg hover:bg-opacity-10 hover:bg-white transition-all duration-300">
                <IoHomeOutline className="text-2xl" />
                <a href="/home" className="block mx-4">Your Projects</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for closing the banner */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
        style={{ zIndex: 998 }}
      />
    </>
  );
};

export default HamburgerMenu;