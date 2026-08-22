import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppProvider from './store/AppProvider'
import { useApp } from './store/appContext'
import Navbar from './components/Navbar'
import AdminView from './pages/Adminview'
import PublicDisplayView from './pages/Publicdisplayview'

function Shell() {
  const { view, dark } = useApp()
  return (
    <div className={`${dark ? 'dark' : ''} h-screen w-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors`}>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={view === 'admin' ? <AdminView /> : <PublicDisplayView />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
