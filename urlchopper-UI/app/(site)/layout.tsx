import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import React from 'react'

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
      <div className='hidden md:flex mt-16 w-20 flex-col fixed inset-y-0'>
        <Sidebar />
      </div>
        <Navbar />
        <main className='md:pl-20 pt-16 h-full'>
            {children}
        </main>
    </div>
  )
}

export default Layout