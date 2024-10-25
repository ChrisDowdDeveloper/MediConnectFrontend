import { PatientFormState } from '@/types/patientFormTypes';
import { states } from '@/utils/states';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface FormComponentProps {
  formState: PatientFormState;
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

const PatientFormComponent: React.FC<FormComponentProps> = ({
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

      {/* Date of Birth */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.dateOfBirth || ''}
          onChange={handleInputChange}
        />
      </div>

      {/* Gender */}
      <div className="mb-1">
        <label className="block text-white text-lg mb-1 font-bold">Gender:</label>
        <select
          className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formState.gender}
          name="gender"
          onChange={handleSelectChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="preferNotSay">Prefer Not Say</option>
          <option value="other">Other</option>
        </select>
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
        <div className='relative'>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg w-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={formState.password}
            onChange={handleInputChange}
          />
          <span className=''>
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className='absolute right-4 top-4 text-gray-400 cursor-pointer'/>
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

export default PatientFormComponent;
