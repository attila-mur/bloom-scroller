const BASE = 'https://api.inaturalist.org/v1'
const PAGE_SIZE = 10

export async function fetchObservations({ page = 1, location = null, taxonId }) {
  const params = new URLSearchParams({
    taxon_id: taxonId,
    photos: 'true',
    quality_grade: 'research',
    per_page: PAGE_SIZE,
    page,
    order: 'desc',
    order_by: 'id',
    without_term_value_id: 19,
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
