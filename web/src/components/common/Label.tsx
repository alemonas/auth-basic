import {Label as MyLabel} from 'theme-ui'

interface LabelProps {
  text: string
  htmlFor: string
}

const Label = ({text, htmlFor}: LabelProps) => (
  <MyLabel htmlFor={htmlFor}>{text}</MyLabel>
)

export default Label
