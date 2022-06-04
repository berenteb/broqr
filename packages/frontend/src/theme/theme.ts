import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    theme: {
      50: '#89cdf1',
      100: '#71c2ee',
      200: '#59b8eb',
      300: '#41aee8',
      400: '#2aa4e5',
      500: '#129AE2',
      600: '#108bcb',
      700: '#0e7bb5',
      800: '#0d6c9e',
      900: '#0b5c88'
    }
  },
  maxWidth: '900px',
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.100',
        minHeight: '100vh',
        width: '100vw',
        margin: '0'
      },
      h1: {
        fontSize: '40px',
        width: 'fit-content'
      },
      h2: {
        fontSize: '30px',
        width: 'fit-content'
      },
      p: {
        fontSize: '20px',
        margin: '0 0 20px 0'
      }
    }
  }
})
