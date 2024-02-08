import React, { useState } from 'react'
import { IoIosOptions } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { chatChangState } from '../../context/ChatContext';
import { v4 as uuid } from 'uuid'
import { ChatState } from '../../context/ChatProvider';




function InputSend() {
  const [text, setText] = useState("")
  const { data } = chatChangState()
  const { user } = ChatState();

  const handleSend = async () => {

    try {
      if (!text) return;
      else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messges: arrayUnion({
            id: uuid(),
            text: text,
            senderId: user.uid,
            date: Timestamp.now(),
          })
        })

        await updateDoc(doc(db, "user-chats", user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        })
        await updateDoc(doc(db, "user-chats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text
          },
          [data.chatId + ".date"]: serverTimestamp(),
        })


        setText("");
      }

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='bg-gray700 text-white p-2 flex justify-between text-center  '>
      <input type='text' className='p-1 bg-transparent outline-none ' placeholder='send messge'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='flex p-1 justify-end space-x-1'>
        <IoIosOptions size={25} className='mx-2' />
        <AiOutlinePicture size={25} className='mx-2' />
        <IoSend size={25} className=' text-backgr mx-2' onClick={() => handleSend()} />
      </div>

    </div>
  )
}

export default InputSend
