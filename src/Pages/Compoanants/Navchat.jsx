import React from 'react'
import { SlCamrecorder } from "react-icons/sl";
import { IoPersonAddOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { chatChangState } from '../../context/ChatContext';



function Navchat() {
  const { data } = chatChangState()

  return (
    <div className='flex p-3 text-white bg-sideBarBg justify-between'>
      <span className="logo text-xl font-semibold">{data.user?.displayName}</span>
      <div className='flex justify-between items-center px-3 '>
        <button className='p-1 px-2 font-bold'><SlCamrecorder size={25} /></button>
        <button className='px-2'><IoPersonAddOutline size={25} /> </button>
        <button className='px-2  '><SlOptions size={25} /> </button>
      </div>
    </div>
  )
}

export default Navchat
