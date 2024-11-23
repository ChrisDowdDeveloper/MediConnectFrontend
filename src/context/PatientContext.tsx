"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Patient } from "@/types/patientTypes";
import { fetchPatientById } from "@/utils/api";

interface PatientContextType {
  patient: Patient | null;
  setPatient: (patient: Patient | null) => void;
}

type ErrorState = {
  message: string;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatient = () => {
  const context = useContext(PatientContext);
  console.log("Context value in usePatient:", context);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    const fetchPatientData = async() => {
      try {
        const patientData = await fetchPatientById();
        setPatient(patientData);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
