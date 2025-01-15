import { nextui, ThemeColors } from '@nextui-org/react'
import { tailwindScrollbar } from '@raulscoelho/tailwind-scrollbar'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  plugins: [
    tailwindScrollbar(),
    nextui({
      themes: {
        light: {
          colors: {
            info: {
              DEFAULT: '#CAFDF5',
              foreground: '#000000'
            }
          } as Partial<ThemeColors>
        },
        dark: {
          colors: {
            info: {
              DEFAULT: '#00B8D9',
              foreground: '#FFFFFF'
            }
          } as Partial<ThemeColors>
        }
      }
    })
  ]
}
export default config
