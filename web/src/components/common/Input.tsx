import {Input as MyInput} from 'theme-ui'

interface InputProps {
  ariaLabel: string
  name: string
  type: string
  placeholder: string
  field: object
}

const Input = ({ariaLabel, name, type, placeholder, field}: InputProps) => (
  <MyInput
    {...field}
    arial-label={ariaLabel}
    name={name}
    type={type}
    placeholder={placeholder}
  />
)

export default Input
