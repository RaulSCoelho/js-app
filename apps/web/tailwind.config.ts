import { heroui } from '@heroui/react'
import { tailwindScrollbar } from '@raulscoelho/tailwind-scrollbar'
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/.pnpm/@heroui+theme*/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [tailwindScrollbar(), heroui()]
} satisfies Config
