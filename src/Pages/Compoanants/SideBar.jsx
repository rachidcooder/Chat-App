import React from 'react'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import ChatsList from './ChatsList'

function SideBar() {
  return (
    <div className=' bg-sideBarBg h-full '>
      <NavBar />
      <SearchBar />
      <ChatsList />
    </div>
  )
}

export default SideBar
