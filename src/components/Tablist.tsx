import React from 'react'


import { GiftIcon, HeartIcon, Layout, User } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const tabs = [
    {
        name: 'Layout',
        value: 'layout',
        icon: Layout,
        iconBg: "bg-red-500/30",
        iconColor: "text-red-500",
        content: (
            <>
                Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending topics, and hidden gems
                curated just for you. Start exploring and let your curiosity lead the way!
            </>
        )
    },
    {
        name: 'Users',
        value: 'users',
        icon: User,
        content: (
            <>
                All your <span className='text-foreground font-semibold'>favorites</span> are saved here. Revisit articles,
                collections, and moments you love, any time you want a little inspiration.
            </>
        )
    },
    {
        name: 'Products',
        value: 'products',
        icon: GiftIcon,
        content: (
            <>
                <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something unexpected—a fun fact, a
                quirky tip, or a daily challenge. Come back for a new surprise every day!
            </>
        )
    }
]

const Tablist = () => {
    return (
        <div className='w-full  max-w-md  '>
            <Tabs defaultValue='layout' className='gap-6 '>
                <TabsList className=' w-full p-5 ' >
                    {tabs.map(({ icon: Icon, name, value }) => (
                        <TabsTrigger key={value} value={value} className='flex items-center gap-3 p-3.5  data-active:bg-sidebar-accent data-active:text-white sm:px-3 text-sidebar-accent'>
                            <Icon  />
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