export interface Appointment {
    id: number;
    patientId: string;
    doctorId: string;
    appointmentDateTime: Date;
    appointmentStatus: string;
    notes: string;
    creationDate: Date;
    lastUpdatedDate: Date;
}

export interface TimeSlot {
    id: number;
    doctorId: string;
    startDateTime: Date;
    endDateTime: Date;
    isBooked: boolean;
    appointmentId: string;
}