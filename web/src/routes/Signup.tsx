import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import {Heading, Container, Box, Button} from 'theme-ui'
import Layout from '../components/Layout'
import FormInput from '../components/common/FormInput'
import Label from '../components/common/Label'
import {publicFetch} from '../util/fetch'
import FormSuccess from '../components/common/FormSuccess'
import FormError from '../components/common/FormError'
import {useState} from 'react'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

// interface UserCredential {
//   fistName: string
//   lastName: string
//   password: string
//   email: string
// }

function Signup() {
  const [signupSuccess, setSignupSuccess] = useState('')
  const [signupError, setSignupError] = useState('')

  async function submitCredentials(credentials: any) {
    try {
      console.log(credentials)
      const {data} = await publicFetch.post(`signup`, credentials)
      console.log({data})
      setSignupSuccess(data.message)
    } catch (err) {
      console.log({err})
      const {data} = err.response
      setSignupError(data.message)
    }
  }

  return (
    <Layout>
      <Heading sx={{textAlign: 'center'}}>Signup Page</Heading>
      <Container p={4} bg="muted" mt={4}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => submitCredentials(values)}
          // onSubmit={(values) => {
          //   console.log(values)
          // }}
          validationSchema={SignupSchema}
        >
          {() => (
            <Form>
              {signupSuccess && (
                <FormSuccess text={signupSuccess || 'success'} />
              )}
              {signupError && <FormError text={signupError || 'error'} />}
              <Box>
                <Label text="First Name" htmlFor="firstName" />
                <FormInput
                  ariaLabel="First Name"
                  name="firstName"
                  type="text"
                />
              </Box>
              <Box>
                <Label text="Last Name" htmlFor="lastName" />
                <FormInput ariaLabel="Last Name" name="lastName" type="text" />
              </Box>
              <Box>
                <Label text="Email address" htmlFor="email" />
                <FormInput
                  ariaLabel="Email address"
                  name="email"
                  type="email"
                />
              </Box>
              <Box>
                <Label text="password" htmlFor="password" />
                <FormInput
                  ariaLabel="Password"
                  name="password"
                  type="password"
                />
              </Box>
              <Box mt={2}>
                <Button type="submit">Register</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Signup
