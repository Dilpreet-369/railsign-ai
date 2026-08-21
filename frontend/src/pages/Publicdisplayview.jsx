import React from 'react'
import StationDisplay from '../components/Stationdisplay'
import AvatarPanel from '../components/Avatarpanel'

export default function PublicDisplayView() {
  return (
    <div className="flex h-full w-full bg-black text-white overflow-hidden font-sans">
      <StationDisplay />
      <AvatarPanel />
    </div>
  )
}