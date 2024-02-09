import React from 'react'
import { useState } from 'react';
import { RiUserSearchLine } from "react-icons/ri";
import { ChatState } from '../../context/ChatProvider';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../firebase';

function SearchBar() {
  const [userName, setUserName] = useState("");
  const [userS, setUserS] = useState();
  const { user } = ChatState();
  const [err, setErr] = useState(false)



  const handlSearch = async () => {
    // Create a query against the collection.
    const q = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserS(doc.data());

      });

    } catch (err) {
      setErr(true);
      console.log(err);
    }


  }

  const handlerKey = (e) => {
    e.code == "Enter" && handlSearch();
  }

  const handlSelect = async () => {
    //check if chat existe if not create one
    const combineId = user.uid > userS.uid ? user.uid + userS.uid : userS.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combineId), { messages: [] });

        //create user chats :
        await updateDoc(doc(db, "user-chats", userS.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineId + ".date"]: serverTimestamp()

        })

        await updateDoc(doc(db, "user-chats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: userS.uid,
            displayName: userS.displayName,
            photoURL: userS.photoURL
          },
          [combineId + ".date"]: serverTimestamp()

        })


      }

    } catch (err) {
      console.log(err);
    }
    setUserS(null);
    setUserName("");

  }

  return (
    <div className='flex  text-white px-2 rounded flex-col'>
      <div className=' flex items-center  bg-gray700'>
        <RiUserSearchLine size={25} />
        <input
          type='text'
          placeholder='Find a user'
          className=' outline-none bg-transparent p-2 text-white '
          value={userName}
          onChange={(e) => { setUserName(e.target.value) }}
          onKeyDown={handlerKey}
        />
      </div>
      {err && <span className='text-xl  p-1 rpounded'> User not found </span>}
      {
        userS && (
          <a href='#' className='flex p-2 items-center hover:bg-hoverChats active:bg-hoverChats'
            onClick={() => handlSelect()}
          >
            <img src={userS.photoURL} alt="" className='rounded-full h-10 w-10' />
            <div className='text-white  px-3'>
              <h1 className='text-xl font-semibold px-1'>{userS.displayName}</h1>
              <h3 className=' text-gray300'></h3>
            </div>
          </a>
        )


      }

    </div>
  )
}

export default SearchBar
