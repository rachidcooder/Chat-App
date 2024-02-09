import React, { useState, useEffect } from 'react'
import { chatChangState } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ChatState } from '../../context/ChatProvider';

function Messages() {
  const [messages, setMessages] = useState();
  const { data } = chatChangState();
  const { user } = ChatState();

  useEffect(() => {

    console.log(data);

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messges);

    });
    return () => {
      unSub();
    }
  }, [data.chatId])

  const arrObj = [

    {
      text: "hi ,bro !",
      you: true
    },
    {
      text: "hello ,how are you doing !",
      you: false
    },
    {
      text: "im goooood",
      you: true
    },
    {
      text: "alhamdolillah!",
      you: false
    },
    {
      text: "hi ,bro !",
      you: true
    },
    {
      text: "hello ,how are you doing !",
      you: false
    },
    {
      text: "im goooood",
      you: true
    },
    {
      text: "alhamdolillah!",
      you: false
    },



  ]
  //item.senderId === user.uid ? user.photoURL : data.userInfo.photoURL
  return (


    <div className='  p-2  min-h-96 flex flex-col items-stretch  '>

      {messages ? (messages.map((item, i) => {
        return (
          <div className={`p-3 flex text-center ${item.senderId === user.uid ? 'justify-start' : 'justify-end '}`} key={i}>
            <img src={item.senderId === user.uid ? user.photoURL : data && data.user.photoURL} alt='ic'
              className='rounded-full h-10 w-10' />
            <p className={`'rounded-xl ${item.senderId === user.uid ? 'bg-gray700' : 'bg-sideBarBg'} text-white p-2 text-xl text-center rounded-xl '`}>{item.text}</p>
          </div>
        )
      })) : (
        !data &&
        (<div className=' flex-col self-center flex justify-center items-center text-white h-full  p-4 font-semibold text-center '>
          <h1 className=' text-4xl font-bold p-1'> Search for users</h1>
          <h2 className=' text-3xl font-semibold p-1'> by name or select a chat !</h2>
        </div>)
      )
      }

    </div>
  )
}

export default Messages
