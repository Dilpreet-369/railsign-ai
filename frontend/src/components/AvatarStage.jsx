import React from 'react'
import { useApp, GESTURE_META } from '../store/appContext'

function Hand({ side }) {
  return (
    <div
      className={`hand-${side} absolute top-[58px] w-3.5 h-[88px] bg-blue-800 rounded-full origin-top ${side === 'left' ? 'left-[-12px] -rotate-12' : 'right-[-12px] rotate-12'}`}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#f0b98d]" />
    </div>
  )
}

function Figure() {
  return (
    <div className="absolute inset-x-0 bottom-8 flex justify-center">
      <div className="relative w-44 h-48">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-14 h-14 rounded-full bg-[#f0b98d]">
          <div className="absolute top-6 left-3.5 w-1.5 h-1.5 rounded-full bg-slate-800" />
          <div className="absolute top-6 right-3.5 w-1.5 h-1.5 rounded-full bg-slate-800" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-slate-700 rounded-b-full" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-16 h-4 bg-blue-900 rounded-t-full" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[74px] h-1.5 bg-blue-950 rounded-full" />
        <Hand side="left" />
        <Hand side="right" />
        <div className="absolute left-1/2 -translate-x-1/2 top-[52px] w-24 h-[92px] bg-blue-800 rounded-t-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-10 bg-blue-900" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-widest text-white/80">SM</div>
        </div>
        <div className="absolute left-[62px] top-[142px] w-5 h-10 bg-slate-800 rounded-b-md" />
        <div className="absolute right-[62px] top-[142px] w-5 h-10 bg-slate-800 rounded-b-md" />
      </div>
    </div>
  )
}

export default function AvatarStage() {
  const { current, signing } = useApp()
  const meta = current ? GESTURE_META[current.type] : null

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-1 shadow-2xl">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 relative">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">RailSign ISL</span>
            </div>
            <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Raju – Station Master</p>
            <p className="text-[8px] text-slate-500">Indian Sign Language Translator</p>
          </div>

          <div
            className={`relative rounded-lg mb-3 overflow-hidden bg-gradient-to-b from-sky-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 avatar-float ${signing && current ? `gesture-${current.type}` : ''}`}
            style={{ minHeight: 280 }}
          >
            <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-300 dark:bg-slate-700 border-t-4 border-amber-400/70" />
            <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow text-[10px] font-bold text-blue-700 dark:text-blue-300">
              PF {current?.type === 'platform' ? '' : ''}
              <span className="holo-flicker">•</span>
            </div>

            <Figure />

            {signing && current && (
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded-full signing-active">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> SIGNING
              </div>
            )}
            {current && (
              <div key={current.ts} className={`pop-in absolute bottom-2 left-2 text-[9px] font-bold px-2 py-1 rounded-md text-white ${meta.chip}`}>
                {meta.label}
              </div>
            )}
          </div>

          <p className="text-[11px] text-center text-slate-600 dark:text-slate-300 min-h-[32px] leading-snug">
            {current ? current.text : 'Awaiting announcements…'}
          </p>
        </div>
      </div>
    </div>
  )
}
