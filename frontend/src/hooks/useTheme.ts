import { useTheme as EmotionUseTheme } from '@emotion/react'

import { Themetype } from '../theme'

export function useTheme() {
  const theme = EmotionUseTheme()

  return theme as Themetype
}
