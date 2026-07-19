import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aura Weather App',
    short_name: 'Aura',
    description: 'A premium, modern weather application with real-time data and detailed forecasts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0C15',
    theme_color: '#0B0C15',
    icons: [
      {
        src: '/icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
