import { Appointment } from "./commonTypes";

export interface Doctor {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    specialty: string;
    availability: string;
    yearsOfExperience: number;
    officeAddress: string;
    appointments: Appointment[];
    pastAppointments: Appointment[];
}