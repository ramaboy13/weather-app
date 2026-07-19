import { ImageResponse } from 'next/og'
 
export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 192, height: 192 },
      id: '192',
    },
    {
      contentType: 'image/png',
      size: { width: 512, height: 512 },
      id: '512',
    },
    {
      contentType: 'image/x-icon',
      size: { width: 32, height: 32 },
      id: 'favicon',
    }
  ]
}
 
export default function Icon({ id }: { id: string }) {
  const size = id === '192' ? 192 : id === '512' ? 512 : 32
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: size === 32 ? '8px' : '22%',
          color: 'white',
          fontSize: `${size * 0.5}px`,
          fontWeight: 700,
          fontFamily: 'sans-serif',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
        }}
      >
        A
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )
}
