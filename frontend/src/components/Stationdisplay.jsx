import React, { useState } from 'react'

export default function StationDisplay() {
  const [inputText, setInputText] = useState('Train 123 arriving platform 5')
  const [activeAnnouncement, setActiveAnnouncement] = useState(
    'Train 123 arriving platform 5'
  )

  const handlePlay = (e) => {
    e.preventDefault()
    setActiveAnnouncement(inputText)
  }

  return (
    <div className="w-1/2 h-full p-6 flex flex-col gap-6 border-r border-slate-800">
      <h1 className="text-2xl font-bold tracking-wide">
        Station Display — ISL Avatar
      </h1>

      {/* Input Form */}
      <form onSubmit={handlePlay} className="flex items-center gap-3">
        <label className="text-sm font-medium shrink-0">Announcement</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 bg-white text-black text-sm rounded outline-none font-normal"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-[#0099ff] hover:bg-[#0088ee] text-white text-sm font-semibold rounded transition cursor-pointer"
        >
          Play
        </button>
      </form>

      {/* Output Announcement Box */}
      {activeAnnouncement && (
        <div className="w-full p-4 bg-[#18181b] rounded-md border border-slate-800/60 text-slate-200 text-sm">
          {activeAnnouncement}
        </div>
      )}
    </div>
  )
}
