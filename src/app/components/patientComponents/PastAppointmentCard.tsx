import { Patient } from '@/types/patientTypes'
import React from 'react'
import UpcomingOrPastAppointmentCard from './UpcomingOrPastAppointmentCard';

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

  console.log(patient)

  return (
    <>
      <ul>
        {patient.pastAppointments.map((appointment, index) => (
          <li key={index} className='px-3 pb-4'>
            <UpcomingOrPastAppointmentCard appointment={appointment} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PastAppointmentCard;