import {tailwind} from '@theme-ui/presets'
import {Theme} from 'theme-ui'

const theme: Theme | any = {
  ...tailwind,
  styles: {
    ...tailwind.styles,
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
