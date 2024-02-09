import React from 'react'
import SideBar from './Compoanants/SideBar'
import Chat from './Compoanants/Chat'
import Navchat from './Compoanants/Navchat'
import Messages from './Compoanants/Messages'
import InputSend from './Compoanants/InputSend'

function Home() {
  return (
    <div className='h-screen bg-backgr flex flex-col items-center pt-5 overflow-hidden'>

      <div className="  bg-backgr min-h-[800px] min-w-[900px]   rounded-xl overflow-hidden">
        <div className="  h-3/4   bg-gray500  rounded-xl grid grid-cols-3 ">
          <div className=' col-span-1 '>
            <SideBar />
          </div>
          <div className='col-span-2 bg-gray500 h-[100%]  '>
            <Chat />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
