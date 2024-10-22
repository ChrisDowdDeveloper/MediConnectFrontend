"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PatientFormState } from '@/types/patientFormTypes';
import PatientFormComponent from '../components/formComponents/PatientFormComponent';

const RegisterPage = () => {
  const router = useRouter();
  
  const [formState, setFormState] = useState<PatientFormState>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    email: '',
    password: '',
    emergencyContactFirstName: '',
    emergencyContactLastName: '',
    emergencyContactPhoneNumber: ''
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
    console.log(name + ' ' + value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value);
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
    const fullAddress = `${street}, ${city}, ${state} ${zipCode}`;
  
    const finalFormState = {
      ...formState,
      address: fullAddress,
    };
    localStorage.setItem('patientInfo', JSON.stringify(finalFormState));
    router.push('register/emergency-contact');
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
        <PatientFormComponent
          formState={formState}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleAddressChange={handleAddressChange}
          addressFields={addressFields}
          onSubmit={handleRegister}
          buttonText='Register'
        />
        <p className="mt-4 text-white"><a href='/login' className="text-blue-300 hover:underline"><b>Already have an account?</b></a></p>
        <p className='mt-4 text-white text-xs'><a href='/register/doctor' className='hover:underline'>Need to register as a doctor?</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
