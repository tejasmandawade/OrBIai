import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ChatInterface />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>OrBIai - Powered by LLaMA 3</p>
      </footer>
    </div>
  )
}

export default App 