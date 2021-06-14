/** @jsxImportSource theme-ui */
import {Link, useLocation} from 'react-router-dom'
import {Flex, Box} from 'theme-ui'
import {authSelector} from '../redux/authSlice'
import {useAppSelector} from '../redux/hooks'

interface NavItemTypes {
  label: string
  path: string
  allowedRoles: string[]
}

const navItems: NavItemTypes[] = [
  {
    label: 'Home',
    path: 'home',
    allowedRoles: ['user'],
  },
  {
    label: 'Singup',
    path: 'signup',
    allowedRoles: ['user'],
  },
  {
    label: 'login',
    path: 'login',
    allowedRoles: ['user'],
  },
  {
    label: 'Dashboard',
    path: 'dashboard',
    allowedRoles: ['user', 'admin'],
  },
]

interface NavItemProps {
  navItem: NavItemTypes
}

interface NavItemContainerProps {
  children: React.ReactNode
}

const NavItem = ({navItem}: NavItemProps) => {
  const location = useLocation()
  console.log({location})
  const isCurrentRoute = location.pathname === `/${navItem.path}`
  return (
    <Link
      sx={{variant: isCurrentRoute ? 'styles.a.current' : 'styles.a'}}
      to={navItem.path}
    >
      {navItem.label}
    </Link>
  )
}

const NavItemContainer = ({children}: NavItemContainerProps) => (
  <Box p={2}>{children}</Box>
)

function Navbar() {
  // const {isAuthenticated} = useAppSelector(authSelector)
  return (
    <Flex as="nav" sx={{justifyContent: 'center'}}>
      {navItems.map((navItem) => {
        return (
          <NavItemContainer key={navItem.path}>
            <NavItem navItem={navItem} />
          </NavItemContainer>
        )
      })}
    </Flex>
  )
}

export default Navbar
