import { useState } from 'react'
import Chat from './components/Chat'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Chat />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>ORBIai - Powered by LLaMA 2</p>
      </footer>
    </div>
  )
}

export default App 