'use client'

import { cn } from '@/lib/utils'
import { Home, Plus, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
    const pathname = usePathname()
    const routes = [
        {
            icon: Home,
            herf: "/",
            label: "Home",
            pro: false
        },
        {
            icon: Plus,
            herf: "/create",
            label: "Create",
            pro: true
        },
        {
            icon: Settings,
            herf: "/setting",
            label: "Setting",
            pro: false
        },
    ]

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
        <div className='p-3 flex flex-1 justify-center'>
            <div className='space-y-2'>
                {routes.map((route) => (
                    <div key={route.herf} className={cn("text-muted-foreground text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition", pathname === route.herf && "bg-primary/10 text-primary" )}>
                        <div className='flex flex-col gap-y-2 items-center flex-1'>
                            <route.icon className='h-5 w-5' />
                            {route.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
