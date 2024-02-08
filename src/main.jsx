import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatProvider from './context/ChatProvider.jsx'
import ChatContext from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <ChatContext>

      <React.StrictMode>
        <App />
      </React.StrictMode>

    </ChatContext>
  </ChatProvider>

)
