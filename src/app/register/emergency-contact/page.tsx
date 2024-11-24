"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerPatient } from '@/utils/api';
import { PatientFormState } from '@/types/formTypes';

const EmergencyContactForm = () => {
  const router = useRouter();
  const [emergencyContact, setEmergencyContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relationship: ''
  });

  const [patientInfo, setPatientInfo] = useState<PatientFormState | null>(null);

  useEffect(() => {
    const savedPatientInfo = localStorage.getItem('patientInfo');
    if (savedPatientInfo) {
      setPatientInfo(JSON.parse(savedPatientInfo));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmergencyContact({
      ...emergencyContact,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientInfo) {
      console.error("Patient information is missing.");
      return;
    }
    const finalData = {
      firstName: patientInfo?.firstName || '',
      lastName: patientInfo?.lastName || '',
      email: patientInfo?.email || '',
      address: patientInfo?.address || '',
      dateOfBirth: patientInfo?.dateOfBirth || '',
      gender: patientInfo?.gender || '',
      password: patientInfo?.password || '',
      registrationDate: new Date().toISOString(),
      emergencyContactFirstName: emergencyContact.firstName,
      emergencyContactLastName: emergencyContact.lastName,
      emergencyContactPhoneNumber: emergencyContact.phoneNumber,
    };
  
    try {
      await registerPatient(finalData);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emergency Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={emergencyContact.firstName}
            onChange={handleInputChange}
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-black placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="First Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={emergencyContact.lastName}
            onChange={handleInputChange}
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-black placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Last Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={emergencyContact.phoneNumber}
            onChange={handleInputChange}
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-black  placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Phone Number"
          />
        </div>
        
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg w-full font-bold transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-95"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default EmergencyContactForm;
