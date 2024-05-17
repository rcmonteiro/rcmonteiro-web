import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      default: 'Poppins, sans-serif',
      mono: 'var(--font-mono)',
    },
    colors: {
      white: '#fff',
      black: '#000',
      default: '#F2F2F2',
      highlight: '#97EB34',
      main: '#368DF7',
      danger: '#EB5757',
      dark: {
        100: '#8E8C96',
        800: '#1B284A',
        900: '#1F1F1F',
      },
    },
  },
  plugins: [],
}
export default config

/**
 colors: {
    white: '#fff',
    black: '#000',
    default: '#F2F2F2',
    highlight: '#97EB34',
    main: '#335EEA',
    danger: '#EB5757',
    dark: {
      100: '#869AB8',
      800: '#1B284A',
      900: '#131827',
    },
  },
 */
