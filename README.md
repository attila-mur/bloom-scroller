# Bloom

A minimal, full-screen plant viewer. Scroll through beautiful nature photos from [iNaturalist](https://www.inaturalist.org), one plant at a time.

## Features

- Full-screen snap scroll — one observation per screen, swipe to move on
- Real photos and species data from the iNaturalist API
- Location-aware — shows plants near you if you allow location, falls back to worldwide
- Research-grade observations only
- Works great on mobile

## Stack

- React + Vite (static, no backend)
- iNaturalist public API
- Deployed on Render

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deploy

Configured for Render via `render.yaml`. Connect the repo on [render.com](https://render.com) and it deploys automatically.
