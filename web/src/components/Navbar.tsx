/** @jsxImportSource theme-ui */
import {Link, useLocation} from 'react-router-dom'
import {Flex, Box} from 'theme-ui'
import {authSelector, UserRoles} from '../redux/authSlice'
import {useAppSelector} from '../redux/hooks'

interface NavItemTypes {
  label: string
  path: string
  allowedRoles: string[]
  requiresAuthUser?: boolean
}

const navItems: NavItemTypes[] = [
  {
    label: 'Home',
    path: 'home',
    allowedRoles: ['user', 'admin'],
  },
  {
    label: 'Singup',
    path: 'signup',
    allowedRoles: ['user', 'admin'],
    requiresAuthUser: false,
  },
  {
    label: 'login',
    path: 'login',
    allowedRoles: ['user', 'admin'],
    requiresAuthUser: false,
  },
  {
    label: 'Dashboard',
    path: 'dashboard',
    allowedRoles: ['user', 'admin'],
    requiresAuthUser: true,
  },
  {
    label: 'Users',
    path: 'users',
    allowedRoles: ['admin'],
    requiresAuthUser: true,
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
  const {isAuthenticated, userInfo} = useAppSelector(authSelector)
  const role = userInfo?.role || UserRoles.USER

  return (
    <Flex as="nav" sx={{justifyContent: 'center'}}>
      {navItems.map((navItem) => {
        let authMiddleware = true // show all links by default
        if (navItem.requiresAuthUser === true) {
          authMiddleware = isAuthenticated // depends of isAuthenticated user
        }
        // for singup
        // if (true && true ) {
        //   authMiddleware = false
        // }
        if (navItem.requiresAuthUser === false && isAuthenticated) {
          authMiddleware = false // doesn't show the link for authenticated users
        }

        return (
          navItem.allowedRoles.includes(role) &&
          authMiddleware && (
            <NavItemContainer key={navItem.path}>
              <NavItem navItem={navItem} />
            </NavItemContainer>
          )
        )
      })}
    </Flex>
  )
}

export default Navbar
