import { Doctor } from '@/types/doctorTypes';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DoctorListCardProps {
  doctor: Doctor | null;
}

const DoctorListCard: React.FC<DoctorListCardProps> = ({ doctor }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-4">

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-500">
          {doctor?.firstName?.[0]}{doctor?.lastName?.[0]}
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-2xl">{doctor?.firstName} {doctor?.lastName}</h1>
          <h3 className="text-lg text-gray-600">{doctor?.specialty}</h3>
          <p className="text-sm text-gray-500">Office Number: {doctor?.phoneNumber}</p>
          <p className="text-sm text-gray-500 truncate">📍 {doctor?.officeAddress}</p>
          <div className='flex flex-row justify-between'>
            <p className='text-sm text-gray-500'>Office Hours: </p>
            <p className="text-sm text-green-500">{doctor?.availability}</p>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col space-y-2 text-center">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
          onClick={() => router.push(`/patient/new-appointment/${doctor?.id}/availabilities`)}
        >
          See Availability
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
          onClick={() => router.push(`/doctors/${doctor?.id}`)}
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default DoctorListCard;
