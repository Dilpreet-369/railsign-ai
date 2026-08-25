import React from 'react'
import { useApp } from '../../store/appContext'

export default function Dashboard() {
  const { trains, log, setAdminTab, setSelectedTrainId } = useApp()
  const delays = trains.filter((t) => t.status.startsWith('Delayed')).length

  const stats = [
    { label: 'Active Trains', value: trains.length, color: 'text-blue-600' },
    { label: 'Announcements', value: log.length, color: 'text-emerald-600' },
    { label: 'Delays', value: delays, color: 'text-amber-500' },
    { label: 'Platforms', value: 6, color: 'text-purple-600' },
  ]

  const statusChip = (status) =>
    status.startsWith('Delayed')
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Live Train Status</h3>
          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />LIVE
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-slate-500">Train</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-500">Platform</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-500">Status</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-500">Time</th>
                <th className="text-left px-4 py-2 font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-4 py-2 font-medium">{t.name} <span className="text-slate-400">({t.num})</span></td>
                  <td className="px-4 py-2">PF {t.platform}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusChip(t.status)}`}>{t.status}</span></td>
                  <td className="px-4 py-2 font-mono">{t.time}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => { setSelectedTrainId(t.id); setAdminTab('announce') }}
                      className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition cursor-pointer"
                    >
                      Announce
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
