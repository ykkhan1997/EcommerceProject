import React from 'react'
import { Metadata } from 'next'
import Form from './Form'
export const metadata:Metadata={
    title:"Sign in"
}
const SignIn = () => {
  return (
    <Form/>
  )
}

export default SignIn