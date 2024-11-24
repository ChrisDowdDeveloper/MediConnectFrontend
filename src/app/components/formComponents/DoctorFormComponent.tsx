import { DoctorFormState } from '@/types/formTypes';
import { states } from '@/utils/states';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface FormComponentProps {
  formState: DoctorFormState;
  addressFields: {
    street: string;
    city: string;
    state: string;
    zipCode: string; 
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  onSubmit: () => void;
}

const DoctorFormComponent: React.FC<FormComponentProps> = ({
  formState,
  addressFields,
  handleInputChange,
  handleSelectChange,
  handleAddressChange,
  buttonText,
  onSubmit,
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      
      {/* First Name and Last Name */}
      <div className='flex flex-row'>
        <div className="mr-2 mb-1">
          <label className="block text-white text-lg mb-1 font-bold">First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-1">
          <label className="block text-white text-lg mb-1 font-bold">Last Name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Specialty:</label>
        <input
          type="text"
          name="specialty"
          placeholder='Specialty'
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.specialty || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* UserName */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Username:</label>
        <input
          type="text"
          name="userName"
          placeholder='Username'
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.userName || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Years of Experience */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Years of Professional Experience:</label>
        <input
          type="number"
          name="yearsOfExperience"
          placeholder='Years of Experience'
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.yearsOfExperience || 0}
          onChange={handleInputChange}
        />
      </div>

      {/* Address Fields */}
      <div className="mb-4">
        <label className="block text-white text-lg mb-1 font-bold">Street Address:</label>
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={addressFields.street}
          onChange={handleAddressChange}
        />
      </div>

      <div className="flex flex-wrap gap-4">

        {/* City */}
        <div className="flex-1">
          <label className="block text-white text-lg mb-1 font-bold">City:</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={addressFields.city}
            onChange={handleAddressChange}
          />
        </div>

        {/* State */}
        <div className="flex-1 mb-1">
          <label className="block text-white text-lg mb-1 font-bold">State:</label>
          <select
            value={addressFields.state}
            name="state"
            onChange={handleSelectChange}
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 h-12"
          >
            {states.map((state) => (
              <option key={state.id} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* Zip Code */}
        <div className="flex-1">
          <label className="block text-white text-lg mb-1 font-bold">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={addressFields.zipCode}
            onChange={handleAddressChange}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.email}
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-white text-lg mb-1 font-bold">Password:</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formState.password}
            onChange={handleInputChange}
          />
          <span className='relative'>
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="absolute right-4 -bottom-0 text-gray-400 cursor-pointer"
            />
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg w-full font-bold transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-95"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default DoctorFormComponent;
