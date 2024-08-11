import React from 'react'

const ErrorMessage = ({children}: {children : React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default ErrorMessage