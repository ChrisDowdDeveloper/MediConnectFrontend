"use client";

import PastAppointmentCard from '@/app/components/patientComponents/PastAppointmentCard';
import PatientAppointmentCard from '@/app/components/patientComponents/PatientAppointmentCard';
import PatientHeader from '@/app/components/patientComponents/PatientHeader';
import Loader from '@/app/components/shared/Loader';
import { fetchPatientById } from '@/utils/api';
import React, { useEffect, useState } from 'react';

type ErrorState = {
  message: string;
};

const PatientHomePage = () => {
  const [patient, setPatient] = useState(null);
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

  if (loading === true) {
    return (
      <div>
        <Loader
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>

      <main className="container mx-auto py-8">
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <PatientAppointmentCard patient={patient}/>
        </section >

        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <PastAppointmentCard patient={patient}/>
        </section>
      </main>
    </div>
  );
};

export default PatientHomePage;
