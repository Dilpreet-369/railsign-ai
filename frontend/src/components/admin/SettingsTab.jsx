import React, { useState } from 'react'
import { useApp } from '../../store/appContext'

export default function SettingsTab() {
  const { settings, saveSettings } = useApp()
  const [station, setStation] = useState(settings.station)
  const [welcome, setWelcome] = useState(settings.welcome)
  const [saved, setSaved] = useState(false)

  const save = () => {
    saveSettings({ station, welcome })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Settings</h2>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 max-w-lg space-y-3">
        <div>
          <label className="block text-xs font-semibold mb-1">Station Name</label>
          <input
            value={station}
            onChange={(e) => setStation(e.target.value)}
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Welcome Message</label>
          <input
            value={welcome}
            onChange={(e) => setWelcome(e.target.value)}
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={save} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer">
            Save Settings
          </button>
          {saved && <span className="text-xs text-emerald-600 font-medium">Saved ✓</span>}
        </div>
      </div>
    </div>
  )
}
