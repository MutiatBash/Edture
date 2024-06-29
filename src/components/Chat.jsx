import React from 'react'
import ChatHistory from './ChatHistory'
import NewChat from './NewChat'

const Chat = () => {
  return (
    <div className="flex min-h-screen top-0">
      <ChatHistory/>
      <NewChat/>
    </div>
  )
}

export default Chat
