"use client";

import { Appointment } from '@/types/commonTypes'
import { cancelAppointmentById } from '@/utils/api';
import { normalizeDate, normalizeTime } from '@/utils/sharedFunctions';
import { useRouter } from 'next/navigation';
import React from 'react'

interface UpcomingOrPastAppointmentProps {
    appointment: Appointment | null;
}

const UpcomingOrPastAppointmentCard: React.FC<UpcomingOrPastAppointmentProps> = ({ appointment }) => {
  const router = useRouter();

  const cancelAppointment = async (appointmentId: number) => {
    await cancelAppointmentById(appointmentId);
    location.reload();
  }

  const isPastAppointment = appointment?.appointmentStatus === 'CANCELED' || appointment?.appointmentStatus === 'FINISHED';

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          <strong>Date:</strong> {normalizeDate(appointment?.appointmentDateTime)}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Time:</strong> {normalizeTime(appointment?.appointmentDateTime)}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {/* Dr. {appointment?.doctor.firstName} {appointment?.doctor.lastName} */}
        </p>
        <p className="text-sm text-gray-600">
          {/* <strong>Specialty:</strong> {appointment?.doctor.specialty} */}
        </p>
        {appointment?.appointmentStatus === 'BOOKED' ? (
          <p className="text-sm font-semibold text-green-500">
            {appointment?.appointmentStatus}
          </p>
        ) : (
          <p className="text-sm font-semibold text-red-500">
            {appointment?.appointmentStatus}
          </p>
        )}
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => router.push(`/patient/appointments/${appointment?.id}`)}
        >
          View Details
        </button>
        {!isPastAppointment && (
          <>
            <button
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => cancelAppointment(Number(appointment?.id))}
            >
              Cancel Appointment
            </button>
            <button
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => router.push(`/patient/appointments/${appointment?.id}/edit`)}
            >
              Reschedule
            </button>
          </>
        )}
      </div>
    </div>
  );
};


export default UpcomingOrPastAppointmentCard;