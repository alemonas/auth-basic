import {Flex, NavLink} from 'theme-ui'

function MainNav() {
  return (
    <Flex as="nav">
      <NavLink href="#!" p={2}>
        Home
      </NavLink>
      <NavLink href="#!" p={2}>
        About us
      </NavLink>
      <NavLink href="#!" p={2}>
        Sign Up
      </NavLink>
    </Flex>
  )
}

export default MainNav
