'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdSearch } from 'react-icons/io';
import HamburgerMenu from './side-bar';
import { CgProfile } from 'react-icons/cg';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaMoon, FaArrowLeft } from 'react-icons/fa';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isSignUpPage = pathname === '/signup';
  const [isClicked, setIsClicked] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleCard = (cardType: string) => {
    setActiveCard((prevState) => (prevState === cardType ? null : cardType));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (cardRef.current && !cardRef.current.contains(target) && !target?.closest('.profile-button')) {
        setActiveCard(null);
      }
    };

    if (activeCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCard]);

  return (
    <div
      className={`top-0 left-0 right-0 w-full ${isLanding ? 'bg-transparent text-white' : 'bg-transparent text-white'} py-4`}
      style={{ zIndex: 1000 }}
    >
      <div className={`flex items-center ${isLanding || isSignUpPage ? 'justify-center' : 'justify-between'} w-full`}>
        {!isLanding && !isSignUpPage && (
          <div className="flex flex-col items-center justify-between w-full mx-3">
            <div className="flex items-center w-full">
              {/* Side bar icon */}
              <HamburgerMenu />

              {/* Sync icon and Search bar */}
              <div className="flex items-center w-full ml-6">
                <h1 className="text-2xl font-bold font-poppins">Sync</h1>
                <div className="relative w-full max-w-xs ml-4">
                  <div
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer transition-transform transition-opacity duration-300 ease-in-out ${isClicked ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'}`}
                    style={{ transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out' }}
                  >
                    <IoMdSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Sync"
                    className={`border border-gray-300 rounded-xl px-2 py-2 text-black text-sm pl-9 w-full transition-all duration-300 ${isClicked ? 'pl-3' : 'pl-9'}`}
                    onFocus={() => setIsClicked(true)}
                    onBlur={() => setIsClicked(false)}
                  />
                </div>
              </div>

              {/* Profile Button */}
              <button
                className="profile-button p-2 rounded-full bg-white text-gray-800 flex items-center justify-center mr-16 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 active:scale-95 transition duration-200"
                onClick={() => toggleCard('profile')}
              >
                <CgProfile className="text-2xl" />
              </button>
            </div>

            {/* Profile Card */}
            {activeCard && (
              <div ref={cardRef} className="relative w-full mx-3 transition ease-in-out">
                <div className="flex justify-end w-full">
                  <div className="absolute rounded-xl flex-col space-y-1 py-2 px-2 bg-gradient-to-tr from-[#82245C] to-[#3D50B5] w-[13%] mt-2 top-0 right-0 z-10 mr-20 border border-[#4F1869] h-auto">
                    {activeCard === 'profile' && (
                      <>
                        <a href="/account" className="flex flex-row w-full px-2 hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2">
                          <CgProfile className="text-2xl" />
                          <h1 className="text-sm font-regular text-white font-poppins ml-2">Account</h1>
                        </a>
                        <a href="/settings" className="flex flex-row w-full px-2 hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2 justify-between">
                          <div className="flex flex-row items-center">
                            <IoSettingsSharp className="text-2xl" />
                            <h1 className="text-sm font-regular text-white font-poppins ml-2">Settings</h1>
                          </div>
                        </a>
                        <a onClick={() => toggleCard('display')} className="flex flex-row w-full px-2 cursor-pointer hover:bg-opacity-10 hover:bg-white transition-all duration-300 rounded-lg items-center py-2 justify-between">
                          <div className="flex flex-row items-center">
                            <FaMoon className="text-2xl" />
                            <h1 className="text-sm font-regular text-white font-poppins ml-2">Display</h1>
                          </div>
                          <IoIosArrowForward />
                        </a>
                      </>
                    )}
                    {activeCard === 'display' && (
                      <div className="flex flex-col">
                        <div className="flex flex-row w-full items-center">
                          <button onClick={() => toggleCard('profile')}
                            className="relative p-2 rounded-full transition-transform duration-300 transform hover:bg-white hover:bg-opacity-10"
                          >
                            <FaArrowLeft className="text-xl" />
                          </button>
                          <h1 className="text-lg font-regular text-white font-poppins ml-2">Display</h1>
                        </div>
                        <div className="flex flex-row w-full mx-auto space-x-2 justify-center mt-4 mb-4">
                          <button className="p-4 rounded-full bg-white border-2 border-[#C2C2C2]" />
                          <button className="p-4 rounded-full bg-[#313131] border-2 border-[#313131]" />
                          <button className="p-4 rounded-full bg-gradient-to-tr from-[#82245C] to-[#3D50B5] border-2 border-[#4F1869]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {(isLanding || isSignUpPage) && (
          <h1 className="text-2xl font-bold font-poppins">{isSignUpPage ? 'Sync' : 'Sync'}</h1>
        )}
      </div>
    </div>
  );
};

export default Header;
