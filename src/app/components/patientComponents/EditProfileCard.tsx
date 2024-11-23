"use client";

import React, { useState } from "react";
import { usePatient } from "@/context/PatientContext";

const EditPatientProfilePage = () => {
  const { patient } = usePatient(); // Access patient from context

  if (!patient) {
    return <p>No patient data available</p>;
  }

  const [firstName, setFirstName] = useState(patient.firstName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [gender, setGender] = useState(patient.gender);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth);

  const handleSave = () => {
    const updatedPatient = {
      ...patient,
      firstName,
      lastName,
      gender,
      phoneNumber,
      dateOfBirth,
    };

    console.log("Updated Patient:", updatedPatient);
    // Add logic to save changes
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center mb-6">
        <div className="flex items-center justify-center bg-blue-100 rounded-full w-24 h-24 md:w-32 md:h-32 text-4xl font-bold text-blue-500">
          {patient?.firstName?.[0]}
          {patient?.lastName?.[0]}
        </div>
        <div className="flex flex-col mt-4 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Profile: {patient?.firstName} {patient?.lastName}
          </h1>
          <p className="text-gray-500">
            Date of Birth:{" "}
            {patient?.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-gray-500">Gender: {patient?.gender}</p>
          <p className="text-gray-500">Contact: {patient?.phoneNumber}</p>
        </div>
      </div>

      {/* Form Section */}
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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
            Contact
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
        >
          Save Changes
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPatientProfilePage;
