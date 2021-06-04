import {Box, Alert} from 'theme-ui'

interface FormSucessProps {
  text: string
}

const FormSuccess = ({text}: FormSucessProps) => (
  <Box mb={2}>
    <Alert variant="success">{text}</Alert>
  </Box>
)

export default FormSuccess
