import React, {Suspense, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import {ThemeProvider} from 'theme-ui'

import Home from './routes/Home'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'
import Users from './routes/Users'
import theme from './theme'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {useAppDispatch, useAppSelector} from './redux/hooks'
import {authSelector, fetchAuthUser} from './redux/authSlice'

interface RouteProps {
  children: React.ReactNode
  path: string
}

function AuthenticatedRoute({children, ...rest}: RouteProps) {
  const {isAuthenticated} = useAppSelector(authSelector)
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <div>{children}</div> : <Redirect to="/login" />
      }
    />
  )
}

function AdminRoute({children, ...rest}: RouteProps) {
  const {isAdmin, isAuthenticated} = useAppSelector(authSelector)
  console.log({isAdmin, isAuthenticated})
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && isAdmin ? (
          <div>{children}</div>
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  )
}

function AppRoutes() {
  const dispatch = useAppDispatch()
  const {fetchAuthUserCompleted} = useAppSelector(authSelector)
  console.log({fetchAuthUserCompleted})
  // console.log({authState})

  useEffect(() => {
    dispatch(fetchAuthUser())
    // fetchAuthUserResponse.then((r) => console.log({r}))
    // console.log({fetchAuthUserResponse})
  }, [dispatch])

  return (
    <>
      {fetchAuthUserCompleted && (
        <Suspense fallback="loading...">
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <AuthenticatedRoute path="/dashboard">
              <Dashboard />
            </AuthenticatedRoute>
            <Route path="/login">
              <Login />
            </Route>
            <AdminRoute path="/users">
              <Users />
            </AdminRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Suspense>
      )}
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
