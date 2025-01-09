"use client";

import PatientHeader from '@/app/components/patientComponents/PatientHeader';
import Loader from '@/app/components/shared/Loader';
import { Appointment } from '@/types/commonTypes';
import { fetchAppointmentById } from '@/utils/api';
import { useEffect, useState } from 'react';

const AppointmentPage = ({ params }: { params: { id: string } }) => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const appointmentData = await fetchAppointmentById(params.id);
        setAppointment(appointmentData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch appointment.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [params.id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  if (!appointment) return <p>No appointment found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>
      
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Appointment Details</h1>
        <p className="mb-2"><span className="font-semibold">Doctor:</span> Dr. {appointment.doctor.firstName} {appointment.doctor.lastName} ({appointment.doctor.specialty})</p>
        <p className="mb-2"><span className="font-semibold">Date & Time:</span> {new Date(appointment.appointmentDateTime).toLocaleString()}</p>
        <p className="mb-2"><span className="font-semibold">Status:</span> {appointment.appointmentStatus}</p>
        <p className="mb-4"><span className="font-semibold">Notes:</span> {appointment.notes}</p>
        <p className="mb-2"><span className="font-semibold">Office Address:</span> {appointment.doctor.officeAddress || 'N/A'}</p>
        <p className="mb-2"><span className="font-semibold">Phone Number:</span> {appointment.doctor.phoneNumber || 'N/A'}</p>
      </div>
    </div>
    
  );
};

export default AppointmentPage;