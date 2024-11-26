"use client";

import React, { useState } from "react";
import { usePatient } from "@/context/PatientContext";
import EditProfileCard from "@/app/components/patientComponents/EditProfileCard";
import { UpdatePatientFormState } from "@/types/formTypes";
import { useRouter } from "next/navigation";
import { updatePatient } from "@/utils/api";

const EditPatientProfilePage = () => {
  const router = useRouter();
  const { patient } = usePatient();

  if (!patient) {
    return <p>No patient data available</p>;
  }

  const [addressFields, setAddressFields] = useState({
    street: patient.address?.split(", ")[0] || "",
    city: patient.address?.split(", ")[1] || "",
    state: patient.address?.split(" ")[4] || "",
    zipCode: patient.address?.split(" ")[5] || "",
  });

  const [formState, setFormState] = useState<UpdatePatientFormState>({
    firstName: patient.firstName || "",
    lastName: patient.lastName || "",
    phoneNumber: patient.phoneNumber || "",
    address: patient.address || "",
    dateOfBirth: patient.dateOfBirth
      ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: patient.gender || "",
    emergencyContactFirstName: patient.emergencyContactFirstName || "",
    emergencyContactLastName: patient.emergencyContactLastName || "",
    emergencyContactPhoneNumber: patient.emergencyContactPhoneNumber || "",
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const combinedAddress = `${addressFields.street}, ${addressFields.city}, ${addressFields.state} ${addressFields.zipCode}`;

    const finalData = {
      ...formState,
      address: combinedAddress,
    };

    try {
      await updatePatient(finalData);
      router.push('/patient/dashboard');
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-6 mb-8 flex flex-col md:flex-col md:items-center">
        <div className="flex items-center justify-center bg-blue-100 rounded-full w-24 h-24 md:w-32 md:h-32 text-4xl font-bold text-blue-500">
          {patient.firstName[0]}
          {patient.lastName[0]}
        </div>

        <div className="flex flex-col mt-4 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {patient.firstName} {patient.lastName}
          </h1>
          <div className="text-center">
            <p className="text-gray-500">
            Date of Birth:{" "}
            {patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString()
              : "N/A"}
            </p>
            <p className="text-gray-500">Gender: {patient.gender}</p>
            <p className="text-gray-500">Phone Number: {patient.phoneNumber}</p>
          </div>
          
        </div>
      </div>
      <EditProfileCard
        formState={formState}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleAddressChange={handleAddressChange}
        addressFields={addressFields}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditPatientProfilePage;
