import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchObservations } from '../api/inaturalist'
import Card from './Card'
import './Feed.css'

export default function Feed({ location, regionLabel, taxon }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loadingRef = useRef(false)
  const pageRef = useRef(1)
  const prefetchedRef = useRef(null)

  const appendResults = useCallback((results) => {
    const valid = results.filter(r => r.photos?.length > 0 && r.taxon)
    if (valid.length === 0) {
      setHasMore(false)
    } else {
      setItems(prev => {
        const ids = new Set(prev.map(i => i.id))
        return [...prev, ...valid.filter(i => !ids.has(i.id))]
      })
    }
  }, [])

  const prefetch = useCallback((pageNum) => {
    if (prefetchedRef.current?.page === pageNum) return
    prefetchedRef.current = {
      page: pageNum,
      promise: fetchObservations({ page: pageNum, location, taxonId: taxon.id }),
    }
  }, [location, taxon])

  const load = useCallback(async (pageNum) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)
    try {
      let results
      if (prefetchedRef.current?.page === pageNum) {
        results = await prefetchedRef.current.promise
        prefetchedRef.current = null
      } else {
        results = await fetchObservations({ page: pageNum, location, taxonId: taxon.id })
      }
      appendResults(results)
      prefetch(pageNum + 1)
    } catch (e) {
      console.error(e)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [location, taxon, appendResults, prefetch])

  useEffect(() => {
    load(1)
  }, [load])

  const lastCardRef = useCallback((node) => {
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          pageRef.current += 1
          load(pageRef.current)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, load])

  return (
    <div className="feed">
      <div className="feed-region">{regionLabel}</div>
      {items.map((item, idx) => (
        <Card
          key={item.id}
          observation={item}
          ref={idx === items.length - 1 ? lastCardRef : null}
        />
      ))}
      {loading && (
        <div className="feed-loader">
          <span>· · ·</span>
        </div>
      )}
    </div>
  )
}
