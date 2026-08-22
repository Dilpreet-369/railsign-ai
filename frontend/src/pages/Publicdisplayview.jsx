import React from 'react'
import { useApp, GESTURE_META } from '../store/appContext'
import Ticker from '../components/Ticker'
import AvatarStage from '../components/AvatarStage'
import { ISLDisplaySimple } from '../components/ISLDisplay'

export default function PublicDisplayView() {
  const { current, log, settings } = useApp()

  return (
    <div className="h-full flex flex-col">
      <Ticker />
      <div className="flex-1 flex overflow-hidden">
        {/* <div className="w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
          <AvatarStage />
        </div> */}

        <div className="w-1/2 bg-slate-950 text-white flex flex-col p-6 gap-4 overflow-hidden">
          {/* ISL Display Section */}
          {current && (
            <div className="slide-up bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-slate-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                ISL Translation
              </h3>
              <ISLDisplaySimple
                text={current.text}
                wordDuration={2500}
                showFullTextDuration={3000}
                loop={true}
                imageHeight="250px"
                className="w-full"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-wide">Announcement Board</h2>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{settings.station}</span>
          </div>

          {current ? (
            <div key={current.ts} className="slide-up bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md text-white ${GESTURE_META[current.type].chip}`}>
                  {GESTURE_META[current.type].label}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{current.time}</span>
              </div>
              <p className="text-xl font-bold leading-snug">{current.text}</p>
              <p className="mt-2 text-xs text-slate-400">{current.trainName}</p>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-slate-500 text-sm">Awaiting announcements…</p>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5">
            {log.slice(1).map((entry) => (
              <div key={entry.ts} className="flex items-start gap-2 text-xs bg-slate-900 rounded-lg px-3 py-2 border border-slate-800">
                <span className={`shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${GESTURE_META[entry.type].chip}`} />
                <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-0.5">{entry.time}</span>
                <span className="truncate text-slate-300">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
