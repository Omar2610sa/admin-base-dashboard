import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Building2Icon } from 'lucide-react'

const Cities = () => {
    return (
        <div className='flex flex-col'>
            {/* BreadCrumb */}
            <BreadCrumb path='Role' icon={Building2Icon} />
        </div>
    )
}

export default Cities