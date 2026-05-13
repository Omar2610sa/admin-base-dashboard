import { Switch } from './ui/switch'

const ActiveSwitcher = () => {
    return (
        <div className="flex items-center space-x-2">
            <Switch         className='focus-visible:border-sidebar-accent dark:focus-visible:border-sidebar-accent focus-visible:ring-green-600/20 data-[state=checked]:bg-sidebar-accent dark:focus-visible:ring-green-400/40 dark:data-[state=checked]:bg-sidebar-accent' />
        </div>
    )
}

export default ActiveSwitcher