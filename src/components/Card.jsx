import { forwardRef, useState } from 'react'
import './Card.css'

const Card = forwardRef(function Card({ observation }, ref) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const photo = observation.photos[0]
  const imgUrl = photo.url.replace('/square.', '/large.')
  const commonName = observation.taxon?.preferred_common_name
  const sciName = observation.taxon?.name
  const observer = observation.user?.login

  return (
    <div className="card" ref={ref}>
      <div className={`card-img-wrap ${imgLoaded ? 'loaded' : ''}`}>
        <img
          src={imgUrl}
          alt={sciName}
          className="card-img"
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className="card-overlay">
        <div className="card-names">
          {commonName && <h1 className="card-common">{commonName}</h1>}
          <p className="card-sci">{sciName}</p>
        </div>
        {observer && <p className="card-observer">© {observer}</p>}
      </div>
    </div>
  )
})

export default Card
