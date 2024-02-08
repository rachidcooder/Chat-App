import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebase';


const chatContext = createContext();
function ChatProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [])

  return (
    <chatContext.Provider value={{
      user, setUser

    }}
    >{children}</chatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(chatContext)
}

export default ChatProvider
