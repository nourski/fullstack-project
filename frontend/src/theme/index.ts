import baseStyled from '@emotion/styled'
import { css } from '@emotion/react'

export const Theme = {
  breakpoints: ['500px', '740px', '900px', '1080px', '1200', '1440px'],
  colors: {
    black: '#000000',
    grey: '#d2d2d2',
    pink: '#d43852',
    teal: '#4fa9bf',
  },
  fonts: {
    primary: 'roboto',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 128, 256],
  fontSizes: ['14px', '16px', '20px', '24px', '30px'],
}

export const GlobalStyles = css`
  body {
    position: relative;
    font-family: ${Theme.fonts.primary};
  }
`

export type Themetype = typeof Theme
export type ThemeColors = keyof typeof Theme.colors
export const styled = baseStyled
