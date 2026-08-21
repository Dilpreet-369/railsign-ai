import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import PublicDisplayView from './pages/Publicdisplayview'

export default function App() {
  return (
    <div className="dark h-screen w-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Optional Navbar can be un-commented when ready */}
      {/* <Navbar /> */}

      {/* Main Routing Container */}
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<PublicDisplayView />} />
        </Routes>
      </main>
    </div>
  )
}