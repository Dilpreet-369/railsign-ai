import React from 'react'
import { useApp } from '../store/appContext'

export default function Ticker() {
  const { current, settings } = useApp()
  const text = `${settings.welcome} — RailSign AI — ${current ? current.text : 'कृपया प्लेटफॉर्म नंबर की जांच करें'}`

  return (
    <div className="bg-slate-900 dark:bg-black px-4 py-1.5 overflow-hidden shrink-0 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider shrink-0 bg-amber-400/10 px-2 py-0.5 rounded">LIVE</span>
        <div className="overflow-hidden flex-1">
          <p key={text} className="ticker-text text-xs text-slate-300 whitespace-nowrap font-mono">{text}</p>
        </div>
      </div>
    </div>
  )
}
