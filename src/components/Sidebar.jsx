import React from 'react';
import { useState } from 'react';
import  {NavLink} from 'react-router-dom';
import {RiCloseLine} from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <NavLink
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
      onClick={() => handleClick && handleClick()}
      >
        <item.icon className='w-6 h-6 mr-2' />
        {item.name}
      </NavLink>
    ))}
  </div>
)

export default function Sidebar() {

  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  return (
    <>

      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        <NavLinks />
      </div>

      {/* mobile menu */}
      <div className='absolute md:hidden block top-6 right-3 z-50'>

        { mobileMenuOpen ? 

        (
          <RiCloseLine 
            onClick={() => setmobileMenuOpen(false)} 
            className='w-6 h-6 text-white mr-2 cursor-pointer' 
          />
        ) : 
        (
          <HiOutlineMenu 
            onClick={() => setmobileMenuOpen(true)} 
            className='w-6 h-6 text-white mr-2 cursor-pointer' 
          />
        )

        }

      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-black backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'} `}>


        <NavLinks 
          handleClick={() => setmobileMenuOpen(false)} 
        />

      </div>

    </>
  )
}
