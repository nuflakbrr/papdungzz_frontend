import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'

import Logo from '../assets/PAPlogo.png'
import { categories } from '../utils/data'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 dark:text-white font-extrabold border-r-2 border-black dark:border-white transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({ user, closeToggle, darkTheme, setDarkTheme }) => {
  const handleCloseSideBar = () => {
      if(closeToggle) {
        closeToggle(false)
      }
  }

  return (
    <div className='flex flex-col justify-between bg-white dark:bg-gray-800 h-full overflow-y-scroll min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
            <Link to='/' className='flex p-5 gap-2 my-6 pt-1 w-190 items-center' onClick={() => handleCloseSideBar()}>
                <img src={ Logo } alt='Logo Brand' className='w-full bg-gray-300 dark:bg-white rounded' />
                {/* <h1 className='text-black text-3xl font-bold'>Papdungzz</h1> */}
            </Link>
            <div className='flex flex-col gap-5'>
                <NavLink to='/' className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={() => handleCloseSideBar()}>
                    <RiHomeFill className='w-5 h-5 mr-2' />
                    Home
                </NavLink>
                <h3 className='mt-3 px-5 text-base dark:text-gray-500 2x:text-xl'>Discover Categories</h3>
                { categories.slice(0, categories.length-1).map((category) => (
                    <NavLink key={category.name} to={`/category/${category.name}`} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={() => handleCloseSideBar()}>
                        {category.name}
                    </NavLink>
                )) }
            </div>
        </div>
        <button type='button' className='flex my-5 p-2 items-center bg-white dark:bg-gray-600 dark:text-white rounded-lg shadow-md mx-3' onClick={ () => setDarkTheme(!darkTheme) }>
            { darkTheme ? '☀️ Light' : '🌙 Dark' }
        </button>
        { user && (
            <Link to={`/user-profile/${user._id}`} className='flex mb-3 gap-2 p-2 items-center bg-white dark:bg-gray-600 rounded-lg shadow-lg mx-3' onClick={() => handleCloseSideBar()}>
                <img src={ user.image } alt='User Avatar' className='w-10 h-10 rounded-full' />
                <p className='dark:text-white'>{user.userName}</p>
                <IoIosArrowForward className='dark:text-white' />
            </Link>
        )}
    </div>
  )
}

export default Sidebar