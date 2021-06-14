import {tailwind} from '@theme-ui/presets'
import {Theme} from 'theme-ui'

console.log({tailwind})

const theme: Theme | any = {
  ...tailwind,
  styles: {
    ...tailwind.styles,
    a: {
      ...tailwind.styles.a,
      current: {
        color: 'background',
        bg: 'primary',
      },
    },
  },
  alerts: {
    success: {
      bg: 'success',
    },
    error: {
      bg: 'danger',
    },
  },
}

export default theme
