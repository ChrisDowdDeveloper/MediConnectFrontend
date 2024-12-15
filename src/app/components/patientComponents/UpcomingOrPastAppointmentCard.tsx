import { Appointment } from '@/types/commonTypes'
import { normalizeDate, normalizeTime } from '@/utils/sharedFunctions';
import React from 'react'

interface UpcomingOrPastAppointmentProps {
    appointment: Appointment | null;
}

const UpcomingOrPastAppointmentCard: React.FC<UpcomingOrPastAppointmentProps> = ({ appointment }) => {
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
                    Dr. {appointment?.doctor.firstName} {appointment?.doctor.lastName}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Specialty:</strong> {appointment?.doctor.specialty}
                </p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                View Details
            </button>
        </div>
  )
}

export default UpcomingOrPastAppointmentCard;