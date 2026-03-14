const BASE = 'https://api.inaturalist.org/v1'
const PLANTS_TAXON_ID = 47126
const PAGE_SIZE = 10

export async function fetchObservations({ page = 1, location = null }) {
  const params = new URLSearchParams({
    taxon_id: PLANTS_TAXON_ID,
    photos: 'true',
    quality_grade: 'research',
    per_page: PAGE_SIZE,
    page,
    order: 'desc',
    order_by: 'votes',
  })

  if (location) {
    params.set('lat', location.lat)
    params.set('lng', location.lng)
    params.set('radius', 200)
  }

  const res = await fetch(`${BASE}/observations?${params}`)
  if (!res.ok) throw new Error('iNaturalist fetch failed')
  const data = await res.json()
  return data.results
}
