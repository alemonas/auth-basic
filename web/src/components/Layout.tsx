/** @jsxImportSource theme-ui */
import {Box, Container} from '@theme-ui/components'
import React from 'react'
import MainNav from './MainNav'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({children}: LayoutProps) {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        sx={{
          width: '100%',
          display: 'flex',
          color: 'primary',
          alignItems: 'center',
        }}
      >
        <MainNav />
      </header>
      <main
        sx={{
          width: '100%',
          flex: '1 1 auto',
        }}
      >
        <div
          sx={{
            maxWidth: 768,
            mx: 'auto',
            px: 3,
          }}
        >
          {children}
        </div>
      </main>
      <footer
        sx={{
          width: '100%',
          bg: 'grayDark',
          color: 'white',
          p: 2,
        }}
      >
        <Container>
          <Box sx={{textAlign: 'center'}}>Footer content</Box>
        </Container>
      </footer>
    </div>
  )
}

export default Layout
