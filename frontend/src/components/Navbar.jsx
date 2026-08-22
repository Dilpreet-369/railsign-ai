import React from 'react'
import { Moon, Sun, Navigation } from 'lucide-react'
import { useApp } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { view, switchView, lang, setLang, dark, toggleDark } = useApp()

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
        </div>
        <div>
          <h1 className="text-base font-bold leading-tight">RailSign AI</h1>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Inclusive Railway Announcements</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => switchView('admin')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${view === 'admin' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
          >
            Admin
          </button>
          <button
            onClick={() => switchView('public')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${view === 'public' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
          >
            Display
          </button>
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="text-xs bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-2 py-1.5 cursor-pointer"
        >
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="ta">தமிழ்</option>
        </select>
        <button onClick={toggleDark} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
          <Moon className={`w-4 h-4 ${dark ? 'hidden' : ''}`} />
          <Sun className={`w-4 h-4 ${dark ? '' : 'hidden'}`} />
        </button>
      </div>
    </nav>
  )
}
