import { Patient } from '@/types/patientTypes'
import React from 'react'

interface PatientAppointmentCardProps {
  patient: Patient | null;
}

const PatientAppointmentCard: React.FC<PatientAppointmentCardProps> = ({ patient }) => {
  if (!patient) {
    return <div>No patient information available</div>;
  }

  if(patient.appointments.length == 0) {
    return (
      <div>
        <h2><b>Appointments for {patient.firstName} {patient.lastName}</b></h2>
        No appointments scheduled yet
      </div>
    )
  }

  return (
    <>
      <h2>Future Appointments for {patient.firstName} {patient.lastName}</h2>
      <ul>
        {patient.appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.appointmentDateTime.toLocaleDateString()} with {appointment.doctorId}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PatientAppointmentCard;
