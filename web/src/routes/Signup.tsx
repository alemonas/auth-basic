import * as Yup from 'yup'
import {Formik, Form, Field} from 'formik'
import {Heading, Container, Label, Input} from 'theme-ui'
import Layout from '../components/Layout'

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
  // async function submitCredentials(credentials: any) {
  //   try {
  //     console.log(credentials)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  return (
    <Layout>
      <Heading>Signup</Heading>
      <Container p={4} bg="muted">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          // onSubmit={(values) => submitCredentials(values)}
          onSubmit={(values) => {
            console.log(values)
          }}
          validationSchema={SignupSchema}
        >
          {({errors, touched}) => (
            <Form>
              <Field label="First Name" name="firstName" defaultValue="" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field label="Last Name" name="lastname" defaultValue="" />
              {errors.lastName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" mb={3} />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" mb={3} />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <button type="submit">submit</button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Signup
