import React, { useState, useRef, useEffect } from 'react'
import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import Pins from './Pins'
import { client } from '../client'
import { userQuery } from '../utils/data'
import Logo from '../assets/PAPlogo.png'

const Home = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState()
  const scrollRef = useRef(null)

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
  useEffect(() => {
    const query = userQuery(userInfo?.googleId)

    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  })

  return (
    <div className={ darkTheme ? '' : 'dark' }>
      <div className='flex bg-gray-50 dark:bg-gray-700 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={ user && user } darkTheme={ darkTheme } setDarkTheme={ setDarkTheme } />
        </div>
        <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md dark:bg-gray-800'>
            <BiMenu fontSize={40} className="cursor-pointer dark:text-white" onClick={() => setToggleSidebar(true)} />
            <Link to='/'>
              <img src={ Logo } alt='Logo Brand' width='200px' className='dark:bg-white dark:rounded' />
              {/* <h1 className='text-black text-3xl font-bold'>Papdungzz</h1> */}
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
            </Link>
          </div>
          { toggleSidebar && (
              <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                <div className='absolute w-full flex justify-end items-center p-2'>
                    <AiOutlineClose fontSize={ 30 } className='cursor-pointer dark:text-white' onClick={ () => setToggleSidebar(false) } />
                </div>
                <Sidebar user={ user && user } closeToggle={ setToggleSidebar } darkTheme={ darkTheme } setDarkTheme={ setDarkTheme } />
              </div>
            )
          }
        </div>
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={ scrollRef }>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile />} />
            <Route path='/*' element={<Pins user={ user && user } />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Home