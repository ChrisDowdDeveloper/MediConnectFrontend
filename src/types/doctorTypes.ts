import { Appointment } from "./commonTypes";

export interface Doctor {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    specialty: string;
    yearsOfExperience: number;
    officeAddress: string;
    appointments: Appointment[];
    pastAppointments: Appointment[];
}