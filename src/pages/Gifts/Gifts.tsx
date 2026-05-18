import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { GiftIcon } from 'lucide-react'

const Gifts = () => {
    return (
        <div className='flex flex-col gap-5'>
{/* Breadcrumb */}
        <BreadCrumb path='Gifts' icon={GiftIcon} />
        </div>
    )
}

export default Gifts