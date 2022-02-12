import React, { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import Pins from './Pins'
import { client } from '../client'
import { userQuery } from '../utils/data'
// import Logo from '../assets/logo.png'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  // const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    // scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
          <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <h1 className='text-black text-3xl font-bold'>Papdungzz</h1>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
      </div>
    </div>
  )
}

export default Home