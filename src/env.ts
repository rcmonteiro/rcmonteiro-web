import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url().default('https://rcmonteiro.com'),
  },

  client: {
    NEXT_PUBLIC_GA4: z.string(),
  },

  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_GA4: process.env.NEXT_PUBLIC_GA4,
  },
})
