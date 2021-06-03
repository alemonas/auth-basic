import {Box} from 'theme-ui'

interface FormErrorProps {
  text: string
}

function FormError({text}: FormErrorProps) {
  return <Box sx={{p: 2}}>{text}</Box>
}

export default FormError
