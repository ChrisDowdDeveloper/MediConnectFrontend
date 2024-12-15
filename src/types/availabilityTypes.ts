import { TimeSlot } from "./timeSlotTypes";

export type Availabilities = {
    dayOfWeek: number;
    doctorId: string;
    endTime: string;
    id: number;
    isRecurring: boolean;
    startTime: string;
    timeSlot: TimeSlot[];
}[];