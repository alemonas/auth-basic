import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import {Heading, Container, Box, Button} from 'theme-ui'
import Layout from '../components/Layout'
import FormInput from '../components/common/FormInput'
import Label from '../components/common/Label'
import FormSuccess from '../components/common/FormSuccess'
import FormError from '../components/common/FormError'
import {Fragment, useState} from 'react'
import {Redirect} from 'react-router'
import {signupUser, authSelector, clearState} from '../redux/authSlice'
import {useAppDisptach, useAppSelector} from '../redux/hooks'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Signup() {
  const [signupSuccess, setSignupSuccess] = useState('')
  const [signupError, setSignupError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function submitCredentials(credentials: any) {
    try {
      setIsLoading(true)
      // const {data} = await publicFetch.post(`signup`, credentials)
      // const user = useAppDisptach(signupUser(credentials))
      setSignupSuccess(data.message)
      setSignupError('')

      setTimeout(() => {
        setRedirectOnLogin(true)
      })
    } catch (err) {
      const {data} = err.response
      setSignupError(data.message)
      setSignupSuccess('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Fragment>
      {redirectOnLogin && <Redirect to="/dashboard" />}
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
                  <FormInput
                    ariaLabel="Last Name"
                    name="lastName"
                    type="text"
                  />
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant={!isLoading ? 'simple' : 'disabled'}
                  >
                    {isLoading ? 'Loading...' : 'Register'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Layout>
    </Fragment>
  )
}

export default Signup
