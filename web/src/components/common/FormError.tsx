import {Box, Alert} from 'theme-ui'

interface FormErrorProps {
  text: string
}

function FormError({text}: FormErrorProps) {
  return (
    <Box mb={2}>
      <Alert variant="error">{text}</Alert>
    </Box>
  )
}

export default FormError
