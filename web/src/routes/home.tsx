import {Container, Heading} from 'theme-ui'
import Layout from '../components/Layout'

function Home() {
  return (
    <Layout>
      <Container>
        <Heading as="h1" sx={{textAlign: 'center'}}>
          Home Page
        </Heading>
      </Container>
    </Layout>
  )
}

export default Home
