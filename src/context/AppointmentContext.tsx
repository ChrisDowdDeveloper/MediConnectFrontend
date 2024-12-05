"use client";

import React, { createContext, useContext, useState } from "react";

type AppointmentContextType = {
  doctorId: string;
  timeSlotId: number;
  appointmentDate: Date;
  appointmentTime: string;
  notes: string;
  setDoctorId: (id: string) => void;
  setTimeSlotId: (id: number) => void;
  setAppointmentDate: (date: Date) => void;
  setAppointmentTime: (time: string) => void;
  setNotes: (notes: string) => void;
};

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointmentContext must be used within AppointmentProvider"
    );
  }
  return context;
};

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [doctorId, setDoctorId] = useState("");
  const [timeSlotId, setTimeSlotId] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppointmentContext.Provider
      value={{
        doctorId,
        timeSlotId,
        appointmentDate,
        appointmentTime,
        notes,
        setDoctorId,
        setTimeSlotId,
        setAppointmentDate,
        setAppointmentTime,
        setNotes,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
