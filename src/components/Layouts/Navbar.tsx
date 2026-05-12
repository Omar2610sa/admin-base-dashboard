import { Bell, Globe, LogOut, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ModeToggle } from '../ui/mode-toggle'
import { Button } from '../ui/button'
const Navbar = () => {
    return (
        <nav className='flex py-4 px-6 items-center justify-between border border-b'>
            <div className='flex justify-between items-center gap-5'>


                {/* Input serach */}
                <div className="relative" data-slot="popover-anchor"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute start-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                    <Input placeholder="Search..." className="flex rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ps-10 w-64 bg-background/50 h-10" cmdk-input="" aria-autocomplete="list" role="combobox" aria-expanded="true" aria-controls="radix-«ro»" aria-labelledby="radix-«rp»" id="radix-«rq»" type="text" value="" /></div>
                {/* Dark toggle */}
            </div>
            <div className='flex justify-between items-center gap-5'>

                {/* Dark toggle */}
                <ModeToggle />

                {/* Languages */}
                <Button size="lg" variant="ghost">
                    <Globe className="size-4" />
                </Button>

                {/* Notifiactions */}
                <Button size="lg" variant="ghost">
                    <Bell className="size-4" />
                </Button>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='flex justify-center items-center bg-sidebar-accent'>
                            SA
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                <h2>Super Admin</h2>
                                <p>admin@info.com</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem><User className='h-[1.2rem] w-[1.2rem] mr-2' /> Profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive'><LogOut className='h-[1.2rem] w-[1.2rem] mr-2' /> Logout</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export default Navbar