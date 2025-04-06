import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ChatMessage from './ChatMessage'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!inputText.trim()) return
    
    const userMessage = { role: 'user', content: inputText }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    
    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage]
      })
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: response.data.response }
      ])
    } catch (error) {
      console.error('Error calling API:', error)
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request. Please try again.' 
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-100 border-b">
        <h2 className="text-lg font-semibold">Chat with LLaMA 2</h2>
      </div>
      
      <div className="h-[60vh] overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl mb-2">Welcome to OrBIai</p>
            <p>Ask me anything using LLaMA 2!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="chat-bubble assistant-bubble">
            <div className="loading-dots">Thinking</div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading || !inputText.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface 