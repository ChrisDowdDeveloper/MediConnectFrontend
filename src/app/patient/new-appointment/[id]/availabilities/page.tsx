"use client";

import React, { useEffect, useState } from "react";
import PatientHeader from "@/app/components/patientComponents/PatientHeader";
import { useRouter } from "next/navigation";
import AvailabilityCard from "@/app/components/doctorComponents/AvailabilityCard";
import { fetchDoctorById } from "@/utils/api";
import { Doctor } from "@/types/doctorTypes";
import TimeSlotCard from "@/app/components/doctorComponents/TimeSlotCard";
import DoctorListCard from "@/app/components/doctorComponents/DoctorListCard";
import PVDoctorProfileCard from "@/app/components/patientComponents/PVDoctorProfileCard";

interface DoctorAvailabilityPageProps {
  params: { doctorId: string };
}

type ErrorState = {
  message: string;
};

const DoctorAvailabilityPage = ({ params }: { params: { id: string } }) => {
  const [doctor, setDoctor] = useState<Doctor | null> (null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>

      <div className="container mx-auto py-8">
        <h1 className="mb-3 text-3xl font-bold">Doctor {doctor?.lastName}'s Availability</h1>

        {loading ? (
          <p className="text-gray-500">Loading availabilities...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          <div>
            <PVDoctorProfileCard doctor={doctor} buttonVisible={false}/>
            <div className="flex justify-center items-center">
              <TimeSlotCard doctorId={params.id} doctor={doctor} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAvailabilityPage;
