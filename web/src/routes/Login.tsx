import * as Yup from 'yup'
import {Formik, Form} from 'formik'
import {Heading, Container, Box, Button} from 'theme-ui'
import Layout from '../components/Layout'
import FormInput from '../components/common/FormInput'
import Label from '../components/common/Label'
import {publicFetch} from '../util/fetch'
import FormSuccess from '../components/common/FormSuccess'
import FormError from '../components/common/FormError'
import {Fragment, useState} from 'react'
import {Redirect} from 'react-router'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {
  const [onSuccess, setOnSuccess] = useState('')
  const [onError, setOnError] = useState('')
  const [redirectOnLogin, setRedirectOnLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function submitCredentials(credentials: any) {
    try {
      setIsLoading(true)
      const {data} = await publicFetch.post(`authenticate`, credentials)
      setOnSuccess(data.message)
      setOnError('')

      setTimeout(() => {
        setRedirectOnLogin(true)
      })
    } catch (err) {
      const {data} = err.response
      setOnError(data.message)
      setOnSuccess('')
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
              email: '',
              password: '',
            }}
            onSubmit={(values) => submitCredentials(values)}
            validationSchema={LoginSchema}
          >
            {() => (
              <Form>
                {onSuccess && <FormSuccess text={onSuccess || 'success'} />}
                {onError && <FormError text={onError || 'error'} />}
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
