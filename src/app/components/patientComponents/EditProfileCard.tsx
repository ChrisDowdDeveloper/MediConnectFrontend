"use client";

import React from "react";
import { UpdatePatientFormState } from "@/types/formTypes";
import { states } from "@/utils/states";

interface FormComponentProps {
  formState: UpdatePatientFormState;
  addressFields: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EditProfileCard: React.FC<FormComponentProps> = ({
  formState,
  addressFields,
  handleInputChange,
  handleSelectChange,
  handleAddressChange,
  handleSubmit,
}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-3xl mx-auto">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formState.gender}
                  onChange={handleSelectChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formState.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={addressFields.street}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressFields.city}
                  onChange={handleAddressChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    value={addressFields.state}
                    onChange={handleSelectChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    {states.map((state) => (
                      <option key={state.id} value={state.state}>
                        {state.state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={addressFields.zipCode}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Emergency Contact
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="emergencyContactFirstName"
                  value={formState.emergencyContactFirstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="emergencyContactLastName"
                  value={formState.emergencyContactLastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="emergencyContactPhoneNumber"
                  value={formState.emergencyContactPhoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileCard;
