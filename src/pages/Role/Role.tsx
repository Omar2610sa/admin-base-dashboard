import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Shield } from 'lucide-react'
import React from 'react'




// interface Role {

// }







const Role = () => {
  return (
    <div className='flex flex-col'>
        {/* BreadCrumb */}
        <BreadCrumb path='Role' icon={Shield} />

        {/* App Table */}
    </div>
  )
}

export default Role