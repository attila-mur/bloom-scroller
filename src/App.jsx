import { useState, useEffect } from 'react'
import Feed from './components/Feed'
import TaxonSelector from './components/TaxonSelector'

function App() {
  const [taxon, setTaxon] = useState(null) // { id, label } — null until selected
  const [location, setLocation] = useState(null)
  const [regionLabel, setRegionLabel] = useState('Global')
  const [locationReady, setLocationReady] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationReady(true)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        setLocation({ lat, lng })
        // Reverse geocode to get a human-readable region label
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            data.address?.state
          const country = data.address?.country_code?.toUpperCase()
          if (city && country) setRegionLabel(`${city}, ${country}`)
          else if (city) setRegionLabel(city)
        } catch {
          // reverse geocode failed, location still works
        }
        setLocationReady(true)
      },
      () => {
        setLocationReady(true)
      },
      { timeout: 8000 }
    )
  }, [])

  if (!taxon) return <TaxonSelector onSelect={setTaxon} />
  if (!locationReady) return null

  return <Feed location={location} regionLabel={regionLabel} taxon={taxon} />
}

export default App
