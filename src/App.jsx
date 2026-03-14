import { useState, useEffect } from 'react'
import Feed from './components/Feed'

function App() {
  const [location, setLocation] = useState(null)
  const [locationReady, setLocationReady] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationReady(true)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocationReady(true)
      },
      () => {
        setLocationReady(true)
      },
      { timeout: 5000 }
    )
  }, [])

  if (!locationReady) return null

  return <Feed location={location} />
}

export default App
