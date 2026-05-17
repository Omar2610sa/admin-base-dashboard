import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Edit, Sliders } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom';


const EditSliders = () => {
    const { id } = useParams();

    return (
        <div>
            {/* BreadCrumb */}
            <BreadCrumb path='Sliders' pathEdit='Edit Slider' icon={Sliders} iconEdit={Edit} />
            
        </div>
    )
}

export default EditSliders