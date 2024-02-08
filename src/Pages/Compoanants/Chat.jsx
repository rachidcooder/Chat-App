import React from 'react'
import Messages from './Messages'
import Navchat from './Navchat'
import InputSend from './InputSend'

function Chat() {
  return (
    <div className='flex flex-col  h-[100%]  relative  '>
      <Navchat />

      <div className=' h-[80%] overflow-y-scroll'>
        <Messages />
      </div>

      <div className=' w-full absolute bottom-0 h-[50px] bg-gray700 '>
        <InputSend />
      </div>

    </div>
  )
}

export default Chat
