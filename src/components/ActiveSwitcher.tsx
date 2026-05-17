import { Switch } from './ui/switch'

type Props = {
    isChecked: boolean
    onChange: (value: boolean) => void
}

const ActiveSwitcher = ({ isChecked, onChange }: Props) => {

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={isChecked}
                onCheckedChange={onChange}
                className='focus-visible:border-sidebar-accent dark:focus-visible:border-sidebar-accent focus-visible:ring-green-600/20 data-[state=checked]:bg-sidebar-accent dark:focus-visible:ring-green-400/40 dark:data-[state=checked]:bg-sidebar-accent'
            />
        </div>
    )
}

export default ActiveSwitcher