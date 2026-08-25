import React, { useState } from 'react'
import { LogIn, LogOut, Clock, ArrowRightLeft, Radio, Eye, History } from 'lucide-react'
import { useApp, buildAnnouncementText, GESTURE_META } from '../../store/appContext'

const TYPES = [
  { id: 'arrival', label: 'Arrival', Icon: LogIn, hover: 'hover:border-blue-400' },
  { id: 'departure', label: 'Departure', Icon: LogOut, hover: 'hover:border-green-400' },
  { id: 'delay', label: 'Delay', Icon: Clock, hover: 'hover:border-amber-400' },
  { id: 'platform', label: 'Platform Change', Icon: ArrowRightLeft, hover: 'hover:border-purple-400' },
]

export default function AnnouncementsTab() {
  const { trains, log, lang, announce, selectedTrainId, setSelectedTrainId } = useApp()
  const [type, setType] = useState('arrival')
  const [delayMin, setDelayMin] = useState(15)
  const [newPlatform, setNewPlatform] = useState(3)
  const [toast, setToast] = useState(false)

  const train = trains.find((t) => t.id === selectedTrainId)
  const preview = train
    ? buildAnnouncementText(lang, type, `${train.name} (${train.num})`, { platform: newPlatform, delayMin })
    : null

  const broadcast = () => {
    if (!train) return
    announce({ type, trainId: train.id, platform: newPlatform, delayMin })
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div className="relative">
      <h2 className="text-lg font-bold mb-3">Make Announcement</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <label className="block text-xs font-semibold mb-1">Select Train</label>
          <select
            value={selectedTrainId}
            onChange={(e) => setSelectedTrainId(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm mb-3"
          >
            {trains.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.num}) — PF {t.platform}</option>
            ))}
          </select>

          <label className="block text-xs font-semibold mb-1">Announcement Type</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {TYPES.map(({ id, label, Icon, hover }) => (
              <button
                key={id}
                onClick={() => setType(id)}
                className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${hover} ${type === id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700'}`}
              >
                <Icon className={`w-3.5 h-3.5 ${GESTURE_META[id].chip.replace('bg-', 'text-')}`} /> {label}
              </button>
            ))}
          </div>

          {type === 'delay' && (
            <div className="mb-3 slide-up">
              <label className="block text-xs font-semibold mb-1">Delay (minutes)</label>
              <input
                value={delayMin}
                onChange={(e) => setDelayMin(Math.max(1, Math.min(300, Number(e.target.value) || 1)))}
                type="number" min="1" max="300"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          )}
          {type === 'platform' && (
            <div className="mb-3 slide-up">
              <label className="block text-xs font-semibold mb-1">New Platform</label>
              <input
                value={newPlatform}
                onChange={(e) => setNewPlatform(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                type="number" min="1" max="12"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          )}

          <button
            onClick={broadcast}
            disabled={!train}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Radio className="w-4 h-4" /> Broadcast Announcement
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Eye className="w-4 h-4 text-slate-400" /> Preview</h3>
          <div className="bg-slate-950 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
            {preview ? (
              <p key={preview} className="slide-up text-slate-100 text-sm text-center leading-relaxed">{preview}</p>
            ) : (
              <p className="text-slate-500 text-xs text-center">Select a train and type to preview</p>
            )}
          </div>
          <h3 className="text-sm font-semibold mt-4 mb-2 flex items-center gap-1.5"><History className="w-4 h-4 text-slate-400" /> Recent Log</h3>
          <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
            {log.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No announcements yet</p>
            ) : (
              log.map((entry) => (
                <div key={entry.ts} className="flex items-start gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 rounded-lg px-2.5 py-1.5">
                  <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full ${GESTURE_META[entry.type].chip}`} />
                  <span className="font-mono text-[10px] text-slate-400 shrink-0 mt-0.5">{entry.time}</span>
                  <span className="truncate">{entry.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast-enter fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-2xl">
          <Radio className="w-4 h-4" /> Announcement broadcast to displays
        </div>
      )}
    </div>
  )
}
