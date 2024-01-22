import { Menu } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Sidebar } from '@/components/Sidebar'
  


export const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4'>
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary w-40">
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}
