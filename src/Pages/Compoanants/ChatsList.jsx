import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { chatChangState } from '../../context/ChatContext';

function ChatsList() {
  const [chats, setChats] = useState();
  const { user } = ChatState();
  const { dispatch } = chatChangState();

  useEffect(() => {
    const getChats = () => {

      const unsub = onSnapshot(doc(db, "user-chats", user.uid), (doc) => {
        setChats(Object.entries(doc.data()))
      });

      return () => {
        unsub()
      }
    }

    //getChats 
    user.uid &&
      getChats();
  }, [user.uid])

  const handleSelect = (u) => {
    dispatch({ type: "USER_CHANGE", payload: u })
  }

  return (
    <div>

      {chats?.map((item, i) => {

        return (<a key={i} href='#' className='flex p-2 items-center hover:bg-hoverChats active:bg-hoverChats'
          onClick={() => handleSelect(item[1].userInfo)}>
          <img src={item[1].userInfo.photoURL} alt="" className='rounded-full h-10 w-10' />
          <div className='text-white  px-3'>
            <h1 className='text-xl font-semibold px-1'>{item[1].userInfo.displayName}</h1>
            <h3 className=' text-gray300'>{item[1].lastMessage?.text}</h3>
          </div>
        </a>)
      })}
    </div>
  )
}

export default ChatsList
