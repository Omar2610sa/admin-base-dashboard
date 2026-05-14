import React from 'react'

import { GiftIcon, Layout, User } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
    {
        name: 'All',
        value: 'all',
        icon: Layout,
        iconBg: "bg-red-500/30",
        iconColor: "text-red-500",

    },

    {
        name: 'Layouts',
        value: 'layouts',
        icon: GiftIcon,

    },
    {
        name: 'Users',
        value: 'users',
        icon: User,

    },
] as const

type TabValue = (typeof tabs)[number]['value']

type TablistProps = {
    value: TabValue
    onValueChange: (value: string) => void
}

const Tablist = ({ value, onValueChange }: TablistProps) => {
    return (
        <div className='w-full  max-w-md  '>
            <Tabs value={value} onValueChange={onValueChange} className='gap-6 '>
                <TabsList className=' w-full p-5 ' >
                    {tabs.map(({ icon: Icon, name, value }) => (
                        <TabsTrigger key={value} value={value} className='flex items-center gap-3 p-3.5  data-active:bg-sidebar-accent data-active:dark:bg-sidebar-accent data-active:text-white sm:px-3 text-sidebar-accent'>
                            <Icon />
                            {name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* {tabs.map(tab => (
                    <TabsContent key={tab.value} value={tab.value}>
                        <p className='text-muted-foreground text-sm'>{tab.content}</p>
                    </TabsContent>
                ))} */}
            </Tabs>
        </div>
    )
}

export default Tablist

