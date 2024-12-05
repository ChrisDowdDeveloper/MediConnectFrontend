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