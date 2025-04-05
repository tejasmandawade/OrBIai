import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">OrBIai</h1>
            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">Beta</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-blue-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300">About</a></li>
              <li><a href="#" className="hover:text-blue-300">GitHub</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 