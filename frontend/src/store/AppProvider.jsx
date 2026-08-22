import React, { useRef, useState } from 'react'
import { AppContext, initialTrains, buildAnnouncementText } from './appContext'

export default function AppProvider({ children }) {
  const [view, setView] = useState('admin')
  const [dark, setDark] = useState(true)
  const [lang, setLang] = useState('en')
  const [adminTab, setAdminTab] = useState('dashboard')
  const [settings, setSettings] = useState({ station: 'New Delhi', welcome: 'Welcome to Indian Railways' })
  const [trains, setTrains] = useState(initialTrains)
  const [log, setLog] = useState([])
  const [current, setCurrent] = useState(null)
  const [signing, setSigning] = useState(false)
  const [selectedTrainId, setSelectedTrainId] = useState(initialTrains[0].id)
  const signTimer = useRef(null)

  const switchView = (v) => setView(v)
  const toggleDark = () => setDark((d) => !d)

  const announce = ({ type, trainId, platform, delayMin }) => {
    const train = trains.find((tr) => tr.id === trainId)
    if (!train) return
    const text = buildAnnouncementText(lang, type, `${train.name} (${train.num})`, { platform, delayMin })
    const entry = {
      ts: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      trainName: train.name,
      text,
    }
    setCurrent(entry)
    setLog((l) => [entry, ...l].slice(0, 20))
    setSigning(true)
    if (signTimer.current) clearTimeout(signTimer.current)
    signTimer.current = setTimeout(() => setSigning(false), 8000)
    if (type === 'delay') {
      setTrains((ts) => ts.map((tr) => (tr.id === trainId ? { ...tr, status: `Delayed ${delayMin}m` } : tr)))
    } else if (type === 'platform') {
      setTrains((ts) => ts.map((tr) => (tr.id === trainId ? { ...tr, platform } : tr)))
    }
  }

  const addTrain = (train) => setTrains((ts) => [...ts, train])
  const saveSettings = (s) => setSettings(s)

  return (
    <AppContext.Provider
      value={{
        view, switchView,
        dark, toggleDark,
        lang, setLang,
        adminTab, setAdminTab,
        settings, saveSettings,
        trains, addTrain,
        log, current, signing, announce,
        selectedTrainId, setSelectedTrainId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
