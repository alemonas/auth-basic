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
import {signup, authSelector, Status} from '../redux/authSlice'
import {useAppDisptach, useAppSelector} from '../redux/hooks'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Signup() {
  const dispatch = useAppDisptach()
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const {status, error} = useAppSelector(authSelector)
  const isLoading = status === Status.PENDING
  const isError = status === Status.REJECTED
  const isSuccess = status === Status.RESOLVED

  async function submitCredentials(credentials: any) {
    dispatch(signup(credentials))
  }

  console.log({isSuccess})

  if (isSuccess) {
    setTimeout(() => {
      setRedirectOnLogin(true)
    }, 1500)
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
                {isSuccess && <FormSuccess text="User Created!" />}
                {isError && <FormError text={error || 'error'} />}
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
