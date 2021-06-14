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
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {authSelector, login, Status} from '../redux/authSlice'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {
  const dispatch = useAppDispatch()
  const {status, error} = useAppSelector(authSelector)
  const isLoading = status === Status.PENDING
  const isError = status === Status.REJECTED
  const isSuccess = status === Status.RESOLVED
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)

  async function submitCredentials(credentials: any) {
    dispatch(login(credentials))
  }

  setTimeout(() => {
    if (isSuccess) {
      setRedirectOnLogin(true)
    }
  }, 200)

  return (
    <Fragment>
      {redirectOnLogin && <Redirect to="/dashboard" />}
      <Layout>
        <Heading sx={{textAlign: 'center'}}>Signup Page</Heading>
        <Container p={4} bg="muted" mt={4}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => submitCredentials(values)}
            validationSchema={LoginSchema}
          >
            {() => (
              <Form>
                {isSuccess && <FormSuccess text={'user logged in'} />}
                {isError && <FormError text={error || 'error'} />}
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
                    {isLoading ? 'Loading...' : 'Login'}
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

export default Login
