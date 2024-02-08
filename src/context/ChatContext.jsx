import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebase';
import { ChatState } from './ChatProvider';


const chatChangeContext = createContext();
function ChatContext({ children }) {

  const { user } = ChatState();

  const INIAL_STATE = {
    chatId: "null",
    user: {}
  }

  const chatReducer = (state, action) => {

    switch (action.type) {
      case "USER_CHANGE":
        return {
          user: action.payload,
          chatId: user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid
        }
      default: return state;

    }

  }


  const [state, dispatch] = useReducer(chatReducer, INIAL_STATE);

  return (
    <chatChangeContext.Provider value={{
      data: state, dispatch,
    }}
    >{children}</chatChangeContext.Provider>
  )
}
export const chatChangState = () => {
  return useContext(chatChangeContext)
}

export default ChatContext
