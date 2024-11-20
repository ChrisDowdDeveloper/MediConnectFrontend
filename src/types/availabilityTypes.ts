import { TimeSlot } from "./commonTypes";

export type Availabilities = {
    dayOfWeek: number;
    doctorId: string;
    endTime: string;
    id: number;
    isRecurring: boolean;
    startTime: string;
    timeSlot: TimeSlot[];
}[];