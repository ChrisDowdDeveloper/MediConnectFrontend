import { Patient } from '@/types/patientTypes'
import React from 'react'

interface PatientAppointmentCardProps {
  patient: Patient | null;
}

const PastAppointmentCard: React.FC<PatientAppointmentCardProps> = ({ patient }) => {
  if (!patient) {
    return <div>No patient information available</div>;
  }

  if(patient.appointments.length == 0) {
    return (
      <div>
        <h2><b>Past Appointments for {patient.firstName} {patient.lastName}</b></h2>
        No past appointments available
      </div>
    )
  }

  return (
    <div>
      <h2>Past Appointments for {patient.firstName} {patient.lastName}</h2>
      <ul>
        {patient.pastAppointments.map((appointment, index) => (
          <li key={index}>
            {appointment.appointmentDateTime.toLocaleDateString()} with {appointment.doctorId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastAppointmentCard;