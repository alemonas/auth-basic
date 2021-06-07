import {Link} from 'react-router-dom'
import {Flex, NavLink} from 'theme-ui'

function MainNav() {
  return (
    <Flex as="nav">
      <NavLink href="#!" p={2}>
        <Link to="home">Home</Link>
      </NavLink>
      <NavLink href="#!" p={2}>
        <Link to="signup">Signup</Link>
      </NavLink>
      <NavLink href="#!" p={2}>
        <Link to="dashboard">Dashboard</Link>
      </NavLink>
    </Flex>
  )
}

export default MainNav
