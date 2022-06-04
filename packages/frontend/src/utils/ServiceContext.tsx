import React, { createContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { getToastTitle } from './toastTitle'
import { useNavigate } from 'react-router-dom'
import { AbsolutePaths } from './paths'
import { ChildProp } from '../types/childProp'

export enum ErrorTypes {
  GENERAL = 'general',
  AUTHENTICATION = 'authentication',
  ADMIN = 'admin'
}

export interface MessageOptions {
  toast?: boolean
  toastStatus?: 'success' | 'error' | 'warning' | 'info' | undefined
  type?: ErrorTypes
  toHomePage?: boolean
}

export type ServiceContextType = {
  displayMessage: (message: string, options?: MessageOptions) => void
  clearError: () => void
  error?: string
  errorType: ErrorTypes
}

export const ServiceContext = createContext<ServiceContextType>({
  displayMessage: () => {},
  clearError: () => {},
  errorType: ErrorTypes.GENERAL
})

export const ServiceProvider: React.FC<ChildProp> = ({ children }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [errorType, setErrorType] = useState<ErrorTypes>(ErrorTypes.GENERAL)
  const toast = useToast()
  const navigate = useNavigate()
  const displayMessage = (message: string, options?: MessageOptions) => {
    if (options?.toast) {
      if (!toast.isActive(message)) {
        toast({ status: options.toastStatus || 'info', title: getToastTitle(options.toastStatus), description: message, id: message })
      }
      if (options.toHomePage) navigate('/')
    } else {
      setError(message)
      setErrorType(options?.type || ErrorTypes.GENERAL)
    }
  }
  useEffect(() => {
    if (error !== undefined) navigate(errorType === ErrorTypes.ADMIN ? AbsolutePaths.ADMIN_ERROR : AbsolutePaths.ERROR)
  }, [error, errorType])
  const clearError = () => {
    setError(undefined)
    setErrorType(ErrorTypes.GENERAL)
  }
  return (
    <ServiceContext.Provider value={{ displayMessage: displayMessage, clearError: clearError, error: error, errorType: errorType }}>
      {children}
    </ServiceContext.Provider>
  )
}
