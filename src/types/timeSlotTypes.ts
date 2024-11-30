export interface TimeSlot {
    id: number;
    doctorId: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    appointmentId?: string;
}[];