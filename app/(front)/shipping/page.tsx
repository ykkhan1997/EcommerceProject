import React from 'react'
import Form from './Form'
import { Metadata } from 'next'
export const metadata:Metadata={
    title:'Shipping Address'
}
export default async function ShippingPage(){

    return <Form/>
}