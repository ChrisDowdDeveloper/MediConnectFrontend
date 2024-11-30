"use client";
import AvailabilityCard from '@/app/components/doctorComponents/AvailabilityCard';
import PatientHeader from '@/app/components/patientComponents/PatientHeader';
import PVDoctorProfileCard from '@/app/components/patientComponents/PVDoctorProfileCard';
import Loader from '@/app/components/shared/Loader';
import { fetchDoctorById } from '@/utils/api'
import React, { useEffect, useState } from 'react'

type ErrorState = {
    message: string;
};

const DoctorProfilePage = ({ params }: { params: { id: string } }) => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async() => {
        try {
            const doctorData = await fetchDoctorById(params.id);
            setDoctor(doctorData);
        } catch (err) {
            if(err instanceof Error) {
                setError({ message: err.message });
            } else {
                setError({ message: 'An unknown error occured' });
            }
        } finally {
            setLoading(false);
        }
    };
    fetchDoctorData();
  }, [params.id]);

  if(loading === true) {
    return (
        <div>
            <Loader />
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>
  
      <div className="container mx-auto py-8">
        {error ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : doctor ? (
          <>
            <PVDoctorProfileCard doctor={doctor} buttonVisible={true}/>
            <AvailabilityCard doctorId={params.id}/>
          </>
        ) : (
          <p className="text-gray-500 text-center">No patient data available</p>
        )}
      </div>
    </div>
  )
}

export default DoctorProfilePage