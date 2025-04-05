import React from 'react'

const ChatMessage = ({ message }) => {
  const { role, content } = message
  const isUser = role === 'user'
  
  return (
    <div className={`chat-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              U
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
              AI
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">{isUser ? 'You' : 'LLaMA 3'}</p>
          <div className="text-sm whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage 