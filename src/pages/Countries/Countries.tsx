import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Flag } from 'lucide-react'

const Countries = () => {
    return (
        <div className='flex flex-col'>
            {/* BreadCrumb */}
            <BreadCrumb path='Countries' icon={Flag} />
        </div>
    )
}

export default Countries