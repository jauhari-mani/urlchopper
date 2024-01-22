import Link from 'next/link'
import React from 'react'
import { Menu, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/ui/ModeToggle'
import { MobileSidebar } from '@/components/MobileSidebar'

export const Navbar = () => {
  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border border-primary/10 bg-secondary h-16'>
        <div className='flex items-center'>
          <MobileSidebar />
            <Link href="/">
                <h1 className='hidden md:block text-xl md:text-3xl font-bold text-primary'>Url Chopper</h1>
            </Link>
        </div>
        <div className='flex items-center gap-x-3'>
            <Button variant="premium">Upgrade <Sparkles className='h-4 w-4 fill-white text-white ml-2' /></Button>
            <ModeToggle />
            <UserButton />
        </div>
    </div>
  )
}
