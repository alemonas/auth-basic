interface InputProps {
  ariaLabel: string
  name: string
  type: string
  placeholder: string
  field: object
}

const Input = ({ariaLabel, name, type, placeholder, field}: InputProps) => (
  <input
    {...field}
    arial-label={ariaLabel}
    name={name}
    type={type}
    placeholder={placeholder}
  />
)

export default Input
