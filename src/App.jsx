import { useState } from 'react'
import Register from './Pages/Register'
import Login from './Pages/login'
import Home from './Pages/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ChatState } from './context/ChatProvider'


function App() {
  const { user } = ChatState();

  const ProtectRoute = ({ children }) => {

    if (user == undefined || user == null) {
      console.log(user)
      return <Navigate to={'/Login'} ></Navigate>
    }

    return children;
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectRoute> <Home /></ProtectRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
