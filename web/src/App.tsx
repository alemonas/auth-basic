import React, {Suspense, useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'theme-ui'

import Home from './routes/Home'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'
import theme from './theme'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import {useAppDisptach} from './redux/hooks'
import {fetchAuthUser} from './redux/authSlice'

function AppRoutes() {
  const dispatch = useAppDisptach()

  useEffect(() => {
    dispatch(fetchAuthUser())
  }, [dispatch])

  return (
    <>
      <Suspense fallback="loading...">
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
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
