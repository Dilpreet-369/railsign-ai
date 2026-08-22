import { createContext, useContext } from 'react'

export const AppContext = createContext(null)

export const initialTrains = [
  { id: 1, num: '12301', name: 'Howrah Rajdhani', platform: 2, status: 'On Time', time: '16:10' },
  { id: 2, num: '12951', name: 'Mumbai Rajdhani', platform: 5, status: 'On Time', time: '16:45' },
  { id: 3, num: '12002', name: 'Bhopal Shatabdi', platform: 3, status: 'Delayed 15m', time: '17:20' },
  { id: 4, num: '12626', name: 'Kerala Express', platform: 1, status: 'On Time', time: '18:05' },
]

export const GESTURE_META = {
  arrival: { label: 'ARRIVAL', chip: 'bg-blue-500' },
  departure: { label: 'DEPARTURE', chip: 'bg-emerald-500' },
  delay: { label: 'DELAY', chip: 'bg-amber-500' },
  platform: { label: 'PLATFORM CHANGE', chip: 'bg-purple-500' },
}

const templates = {
  en: {
    arrival: (t, p) => `${t} arriving shortly at platform number ${p}`,
    departure: (t, p) => `${t} departing shortly from platform number ${p}`,
    delay: (t, m) => `${t} is delayed by ${m} minutes. Inconvenience is regretted.`,
    platform: (t, p) => `Attention please! ${t} will now arrive at platform number ${p}`,
  },
  hi: {
    arrival: (t, p) => `गाडी ${t} प्लेटफॉर्म नंबर ${p} पर कुछ ही समय में पहुँच रही है`,
    departure: (t, p) => `गाडी ${t} प्लेटफॉर्म नंबर ${p} से रवाना हो रही है`,
    delay: (t, m) => `गाडी ${t} ${m} मिनट विलंबित है। असुविधा के लिए खेद है।`,
    platform: (t, p) => `कृपया ध्यान दें! गाडी ${t} अब प्लेटफॉर्म नंबर ${p} पर आएगी`,
  },
  ta: {
    arrival: (t, p) => `ரயில் ${t} நடைமேடை எண் ${p} இல் விரைவில் வருகிறது`,
    departure: (t, p) => `ரயில் ${t} நடைமேடை எண் ${p} இலிருந்து புறப்படுகிறது`,
    delay: (t, m) => `ரயில் ${t} ${m} நிமிடங்கள் தாமதமாகும். சிரமத்திற்கு வருந்துகிறோம்.`,
    platform: (t, p) => `தயவுசெய்து கவனிக்கவும்! ரயில் ${t} இப்போது நடைமேடை எண் ${p} இல் வரும்`,
  },
}

export function buildAnnouncementText(lang, type, trainName, { platform, delayMin }) {
  const t = templates[lang] || templates.en
  return t[type](trainName, type === 'delay' ? delayMin : platform)
}

export function useApp() {
  return useContext(AppContext)
}
