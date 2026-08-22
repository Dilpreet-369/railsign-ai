import React from 'react'
import { LayoutDashboard, TrainFront, Megaphone, Settings } from 'lucide-react'
import { useApp } from '../store/appContext'
import Dashboard from '../components/admin/Dashboard'
import TrainControl from '../components/admin/TrainControl'
import AnnouncementsTab from '../components/admin/AnnouncementsTab'
import SettingsTab from '../components/admin/SettingsTab'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'trains', label: 'Train Control', Icon: TrainFront },
  { id: 'announce', label: 'Announcements', Icon: Megaphone },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function AdminView() {
  const { adminTab, setAdminTab, settings } = useApp()

  return (
    <div className="h-full flex">
      <aside className="w-48 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-3 overflow-y-auto">
        <div className="px-3 mb-2"><p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</p></div>
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setAdminTab(id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium text-left transition mx-2 rounded-lg cursor-pointer ${adminTab === id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
        <div className="mt-auto px-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 px-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">SM</div>
            <div>
              <p className="text-xs font-medium leading-tight">Station Master</p>
              <p className="text-[10px] text-slate-400">{settings.station}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {adminTab === 'dashboard' && <Dashboard />}
        {adminTab === 'trains' && <TrainControl />}
        {adminTab === 'announce' && <AnnouncementsTab />}
        {adminTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  )
}
