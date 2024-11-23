"use client";

import React from "react";
import { usePatient } from "@/context/PatientContext";
import EditProfileCard from "@/app/components/patientComponents/EditProfileCard";

const EditPatientProfilePage = () => {
  const { patient } = usePatient();

  if (!patient) {
    return <p>No patient data available</p>;
  }

  return (
    <div>
      <EditProfileCard />
    </div>
  );
};

export default EditPatientProfilePage;
