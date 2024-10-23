import { Appointment } from "./commonTypes";

export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    address: string;
    phoneNumber: string;
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;
    appointments: Appointment[];
    pastAppointments: Appointment[];
}