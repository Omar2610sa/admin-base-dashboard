import BreadCrumb from '@/components/BreadCrumb/BreadCrumb'
import { Shield } from 'lucide-react'
import React from 'react'

const Role = () => {
  return (
    <div className='flex flex-col'>
        {/* BreadCrumb */}
        <BreadCrumb path='Role' icon={Shield} />
    </div>
  )
}

export default Role