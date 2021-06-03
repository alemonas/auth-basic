import {tailwind} from '@theme-ui/presets'
import {Theme} from 'theme-ui'

const theme: Theme | any = {
  ...tailwind,
  styles: {
    ...tailwind.styles,
  },
}

export default theme
