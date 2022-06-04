import React from 'react'
import { MainPage } from './components/pages/MainPage'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import { theme } from './theme/theme'
import { ServiceProvider } from './utils/ServiceContext'
import { AuthProvider } from './utils/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { Paths } from './utils/paths'
import { LoginPage } from './components/pages/LoginPage'
import { IndexLayout } from './components/layout/IndexLayout'
import { AdminWrapper } from './components/layout/AdminWrapper'
import { RegisterPage } from './components/pages/RegisterPage'
import { ErrorPage } from './components/pages/ErrorPage'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ServiceProvider>
          <AuthProvider>
            <ScrollToTop />
            <IndexLayout>
              <Routes>
                <Route path="/">
                  <Route path="admin/*" element={<AdminWrapper />} />
                  <Route path={Paths.LOGIN}>
                    <Route index element={<LoginPage />} />
                  </Route>
                  <Route path={Paths.REGISTER}>
                    <Route index element={<RegisterPage />} />
                  </Route>
                  <Route path={Paths.ERROR} element={<ErrorPage />} />
                  <Route index element={<MainPage />} />
                </Route>
              </Routes>
            </IndexLayout>
          </AuthProvider>
        </ServiceProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
