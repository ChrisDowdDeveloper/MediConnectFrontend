import { Doctor } from '@/types/doctorTypes'
import React from 'react'

interface DoctorListCardProps {
    doctor: Doctor | null;
}

const DoctorListCard: React.FC<DoctorListCardProps> = ({ doctor }) => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-3xl text-center'>{doctor?.firstName} {doctor?.lastName}</h1>
        <h3 className='font-bold text-xl text-center'>{doctor?.specialty}</h3>
      </div>
      <div className='flex flex-col'>
        <button className='bg-blue-600 text-white p-3 rounded-full font-semibold mb-2'>See Availability</button>
        <button className='bg-green-500 text-white p-3 rounded-full font-semibold'>See Details</button>
      </div>
    </div>
  )
}

export default DoctorListCard