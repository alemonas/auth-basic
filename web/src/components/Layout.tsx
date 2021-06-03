/** @jsxImportSource theme-ui */
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
          bg: 'seconday',
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
        }}
      >
        Footer content
      </footer>
    </div>
  )
}

export default Layout
