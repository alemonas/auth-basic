import {Link} from 'react-router-dom'
import {Flex, Box} from 'theme-ui'

function MainNav() {
  return (
    <Flex as="nav">
      <Box p={2} variant="links.nav">
        <Link to="home">Home</Link>
      </Box>
      <Box p={2}>
        <Link to="signup">Signup</Link>
      </Box>
      <Box p={2}>
        <Link to="login">Login</Link>
      </Box>
      <Box p={2}>
        <Link to="dashboard">Dashboard</Link>
      </Box>
    </Flex>
  )
}

export default MainNav
