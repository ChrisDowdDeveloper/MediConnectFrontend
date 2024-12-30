"use client";
import PastAppointmentCard from '@/app/components/patientComponents/PastAppointmentCard';
import PatientAppointmentCard from '@/app/components/patientComponents/PatientAppointmentCard';
import PatientHeader from '@/app/components/patientComponents/PatientHeader';
import PatientProfileCard from '@/app/components/patientComponents/PatientProfileCard';
import Loader from '@/app/components/shared/Loader';
import { Patient } from '@/types/patientTypes';
import { fetchPatientById } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ErrorState = {
  message: string;
};

const PatientProfilePage: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await fetchPatientById();
        setPatient(patientData);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>
  
      <div className="container mx-auto py-8">
        {error ? (
          <p className="text-red-500 text-center">{error.message}</p>
        ) : patient ? (
          <>
            <PatientProfileCard patient={patient} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
                  <ul className="space-y-2">
                    {patient?.appointments?.length ? (
                      patient.appointments.map((appointment, index) => (
                        <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                          <div>
                            <p className="text-gray-700 font-semibold">Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(appointment.appointmentDateTime).toLocaleDateString()} at {new Date(appointment.appointmentDateTime).toLocaleTimeString()}.
                            </p>
                          </div>
                          <button className="text-blue-500 hover:underline" onClick={() => router.push(`appointments/${appointment.id}`)}>View Details</button>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">No upcoming appointments.</p>
                    )}
                  </ul>
                </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Appointments</h2>
                <ul className="space-y-2">
                  {patient?.pastAppointments?.length ? (
                    patient.pastAppointments.map((entry, index) => (
                      <li key={index} className="text-gray-600">{new Date(entry.appointmentDateTime).toLocaleString()}</li>
                    ))
                  ) : (
                    <p className="text-gray-500">No medical history available.</p>
                  )}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">No patient data available</p>
        )}
      </div>
    </div>
  );
}
  

export default PatientProfilePage;
