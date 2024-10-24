"use client";

import DoctorListCard from '@/app/components/doctorComponents/DoctorListCard';
import PatientHeader from '@/app/components/patientComponents/PatientHeader'
import { Doctor } from '@/types/doctorTypes';
import { fetchDoctors } from '@/utils/api';
import React, { useEffect, useState } from 'react'

type ErrorState = {
    message: string;
}

const NewAppointmentPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<ErrorState | null>(null);  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAllDoctors = async() => {
        try {
            const doctorsList = await fetchDoctors();
            setDoctors(doctorsList);
        } catch(err) {
            if(err instanceof Error) {
                setError({ message: err.message });
            } else {
                setError({ message:  'An unknown error occured' });
            }
        } finally {
            setLoading(false);
        }
    };

    fetchAllDoctors();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-6 shadow-md">
            <PatientHeader />
        </header>

        <div className='container mx-auto py-8'>
            <h1 className='mb-3 text-3xl font-bold'>List of Available Doctors</h1>
            {doctors.map(doctor => (
                <div key={doctor.id} className='bg-white p-6 rounded-xl shadow-lg mb-3'>
                    <DoctorListCard doctor={doctor}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NewAppointmentPage;