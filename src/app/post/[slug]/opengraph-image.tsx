import { env } from '@/env'
import type { GetPostParams } from '@/infra/types/post'
import { slugToTitle } from '@/shared/slug-to-title'
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const alt = 'rcmonteiro latest work'

export const contentType = 'image/png'

export default async function OgImage({ params }: GetPostParams) {
  const title = slugToTitle(params.slug)

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
            color: '#F2F2F2',
            fontSize: 72,
          }}
        >
          {title}
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
