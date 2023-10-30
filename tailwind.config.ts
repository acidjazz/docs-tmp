import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      spacing: {
        128: '32rem',
        256: '64rem',
      },
      minWidth: {
        52: '13rem',
      },
      fontFamily: {
        sans: ['Inter', 'Inter fallback', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'logo-a': '#6667ab',
        'logo-b': '#9c9ae3',
        'logo-c': '#f0edff',
        'logo-d': '#00c893',
        'logo-a-dark': '#48497c',
        pantone: {
          '50': '#f2f5fb',
          '100': '#e8ecf7',
          '200': '#d5dcf0',
          '300': '#bbc6e6',
          '400': '#9fa9da',
          '500': '#868ece',
          '600': '#6e71bd',
          '700': '#6667ab',
          '800': '#4d4f86',
          '900': '#43466c',
          '950': '#27283f',
        }
      }
    }
  }
}

