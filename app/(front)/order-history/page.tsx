import React from 'react'
import MyOrder from "./MyOrder";
import { Metadata } from 'next';
export const metadata:Metadata={
    title:"Order History"
}
export default function OrderHistory(){

    return(
        <>
        <h1 className='text-2xl py-2'>Order History</h1>
        <MyOrder/>
        </>
    )
}
