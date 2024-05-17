import { env } from '@/env'
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const alt = 'rcmonteiro latest work'

export const contentType = 'image/png'

export default async function OgImage() {
  const title = "Here's what I'm currently working on"

  const poppinsRegular = fetch(`${env.APP_URL}/Poppins-Regular.ttf`).then(
    (res) => res.arrayBuffer(),
  )

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#131827',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 60px',
        }}
      >
        <div
          style={{
            marginBottom: '30px',
            marginTop: '60px',
            width: '187px',
            height: '27px',
            backgroundImage: `url(${env.APP_URL}/rcmonteiro-logo.svg)`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '60px',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              position: 'relative',
              marginTop: '30px',
              width: '200px',
              height: '200px',
              borderRadius: '9999px',
              border: '4px solid #97EB34',
              backgroundSize: 'cover',
              backgroundImage: `url(${env.APP_URL}/rcmonteiro-avatar.png)`,
              backgroundPosition: '0 0',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div
            style={{
              color: '#F2F2F2',
              fontSize: 72,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Poppins',
          data: await poppinsRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
