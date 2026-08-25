import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useApp } from '../../store/appContext'

const TRAIN_DB = {
  '12301': { name: 'Howrah Rajdhani', source: 'Howrah', dest: 'New Delhi' },
  '12951': { name: 'Mumbai Rajdhani', source: 'Mumbai Central', dest: 'New Delhi' },
  '12002': { name: 'Bhopal Shatabdi', source: 'New Delhi', dest: 'Bhopal' },
  '12626': { name: 'Kerala Express', source: 'New Delhi', dest: 'Thiruvananthapuram' },
  '22691': { name: 'Rajdhani Express', source: 'Bengaluru', dest: 'New Delhi' },
}

export default function TrainControl() {
  const { trains, addTrain } = useApp()
  const [num, setNum] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  const fetchTrain = () => {
    setAdded(false)
    const info = TRAIN_DB[num.trim()]
    if (info) {
      setResult({ num: num.trim(), ...info })
      setError('')
    } else {
      setResult(null)
      setError(`No train found for number "${num.trim()}". Try 12301, 12951, 12002, 12626 or 22691.`)
    }
  }

  const addFetchedTrain = () => {
    if (!result) return
    addTrain({
      id: Date.now(),
      num: result.num,
      name: result.name,
      platform: (trains.length % 6) + 1,
      status: 'On Time',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    })
    setAdded(true)
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-3">Train Control</h2>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 max-w-lg">
        <label className="block text-xs font-semibold mb-1">Train Number</label>
        <div className="flex gap-2 mb-3">
          <input
            value={num}
            onChange={(e) => setNum(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchTrain()}
            type="text"
            placeholder="e.g. 12301"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchTrain}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" /> Fetch
          </button>
        </div>
        {error && <p className="text-xs text-red-500 slide-up">{error}</p>}
        {result && (
          <div className="slide-up">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm font-semibold">{result.name} ({result.num})</p>
              <p className="text-xs text-slate-500 mt-1">{result.source} → {result.dest}</p>
              {added ? (
                <p className="mt-2 text-xs font-medium text-emerald-600">Added to board ✓</p>
              ) : (
                <button
                  onClick={addFetchedTrain}
                  className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition cursor-pointer"
                >
                  Add to Board
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
