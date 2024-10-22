"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DoctorFormState, PatientFormState } from '@/types/patientFormTypes';
import DoctorFormComponent from '@/app/components/formComponents/DoctorFormComponent';

const DoctorRegisterPage = () => {
  const router = useRouter();
  
  const [formState, setFormState] = useState<DoctorFormState>({
    firstName: '',
    lastName: '',
    officeAddress: '',
    specialty: '',
    userName: '',
    availability: '',
    email: '',
    password: '',
    yearsOfExperience: 0
  });

  const [addressFields, setAddressFields] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressFields({
      ...addressFields,
      [name]: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    setAddressFields({
      ...addressFields,
      [name]: value
    })
  };

  const handleRegister = async() => {
    const { street, city, state, zipCode } = addressFields;
    const officeAddress = `${street}, ${city}, ${state} ${zipCode}`;
  
    const finalFormState = {
      ...formState,
      officeAddress,
    };
    localStorage.setItem('doctorInfo', JSON.stringify(finalFormState));
    router.push('/register/doctor/availability');
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-evenly"
      style={{ backgroundImage: 'url("/bg-image-login.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center font-extrabold z-10">
        <h1 className="text-3xl text-white">Welcome to</h1>
        <h1 className="text-4xl text-white">MediConnect</h1>
      </div>
      <div className="relative bg-blue-800 bg-opacity-40 backdrop-blur-lg rounded-3xl p-11 text-center z-10 max-w-md mx-auto">
        <DoctorFormComponent
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleAddressChange={handleAddressChange}
          addressFields={addressFields}
          onSubmit={handleRegister}
          buttonText='Register'
        />
        <p className="mt-4 text-white"><a href='/login' className="text-blue-300 hover:underline"><b>Already have an account?</b></a></p>
        <p className='mt-4 text-white text-xs'><a href='/register' className='hover:underline'>Need to register as a patient?</a></p>
      </div>
    </div>
  );
};

export default DoctorRegisterPage;
