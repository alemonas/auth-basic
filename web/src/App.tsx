import React, {Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'theme-ui'

import Home from './routes/Home'
import Signup from './routes/Signup'
import theme from './theme'

function AppRoutes() {
  return (
    <>
      <Suspense fallback="loading...">
        <Switch>
          <Route path="/signup">
            <Signup />
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
    <Router>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Router>
  )
}

export default App
