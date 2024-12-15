import { Patient } from '@/types/patientTypes'
import Reactc from 'react'
import UpcomingOrPastAppointmentCard from './UpcomingOrPastAppointmentCard';

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
      <ul>
        {patient.appointments.map((appointment, index) => (
          <li key={index} className='px-3 pb-4'>
            <UpcomingOrPastAppointmentCard appointment={appointment}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PatientAppointmentCard;
