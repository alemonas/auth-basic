/** @jsxImportSource theme-ui */
import {Link} from 'react-router-dom'
import {Flex, Box} from 'theme-ui'
import {authSelector} from '../redux/authSlice'
import {useAppSelector} from '../redux/hooks'

function Navbar() {
  const {isAuthenticated} = useAppSelector(authSelector)
  return (
    <Flex as="nav" sx={{justifyContent: 'center'}}>
      <Flex p={2} variant="links.nav">
        <Link sx={{variant: 'styles.a'}} to="home">
          Home
        </Link>
      </Flex>
      {!isAuthenticated && (
        <Box p={2}>
          <Link sx={{variant: 'styles.a'}} to="signup">
            Signup
          </Link>
        </Box>
      )}
      {!isAuthenticated && (
        <Box p={2}>
          <Link sx={{variant: 'styles.a'}} to="login">
            Login
          </Link>
        </Box>
      )}
      {isAuthenticated && (
        <Box p={2}>
          <Link sx={{variant: 'styles.a'}} to="dashboard">
            Dashboard
          </Link>
        </Box>
      )}
    </Flex>
  )
}

export default Navbar
