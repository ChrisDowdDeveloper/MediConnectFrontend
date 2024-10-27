import { Patient } from '@/types/patientTypes';
import React from 'react';

interface PatientProfileCardProps {
  patient: Patient
}

const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row md:items-center">

      <div className="flex items-center justify-center bg-blue-100 rounded-full w-24 h-24 md:w-32 md:h-32 text-4xl font-bold text-blue-500">
        {patient?.firstName?.[0]}{patient?.lastName?.[0]}
      </div>

      <div className="flex flex-col mt-4 md:mt-0 md:ml-6">
        <h1 className="text-3xl font-bold text-gray-800">{patient?.firstName} {patient?.lastName}</h1>
        <p className="text-gray-500">
            Date of Birth: {patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-gray-500">Gender: {patient?.gender}</p>
        <p className="text-gray-500">Contact: {patient?.phoneNumber}</p>
      </div>

      <div className="flex flex-col md:ml-auto md:justify-end space-y-3 mt-4 md:mt-0">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-200">
          Edit Profile
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200">
          Create Appointment
        </button>
      </div>
    </div>
  );
};

export default PatientProfileCard;
