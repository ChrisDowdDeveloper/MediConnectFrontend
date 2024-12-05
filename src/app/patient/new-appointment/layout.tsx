import AppointmentBookingLayout from "@/app/components/patientComponents/AppointmentBookingLayout";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppointmentBookingLayout>{children}</AppointmentBookingLayout>;
};

export default Layout;
