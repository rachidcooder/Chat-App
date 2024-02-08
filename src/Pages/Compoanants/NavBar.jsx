import { signOut } from 'firebase/auth';
import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { auth } from '../../firebase';
import { ChatState } from '../../context/ChatProvider';
function NavBar() {
  const { user } = ChatState();

  return (
    <div className='flex p-3 text-white bg-navBarBg justify-between'>
      <span className="logo text-xl font-semibold">Chat App</span>
      <div className='flex justify-between items-center px-3 '>
        {/* <IoPersonCircleOutline size={25} /> */}
        <img src={user.photoURL}
          alt='log' className='h-8 w-8 rounded-full' />

        <span className='p-1 px-2 font-bold'>{user.displayName}</span>
        <button className='px-2 bg-backgr rounded '
          onClick={() => { signOut(auth) }}
        >Log out </button>
      </div>
    </div>
  )
}

export default NavBar