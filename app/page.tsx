"use client"
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { getToken } from "next-auth/jwt"
export default function Home() {
  const {data} = useSession()
  console.log(data)
  return (
    <div className='px-5 max-w-[1280px] mx-auto'>
    <Navbar/>
    <hr />
 
  </div>
  )
}
