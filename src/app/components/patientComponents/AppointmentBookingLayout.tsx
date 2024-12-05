import React from "react";
import { AppointmentProvider } from "@/context/AppointmentContext";

const AppointmentBookingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppointmentProvider>
      {children}
    </AppointmentProvider>
  );
};

export default AppointmentBookingLayout;
