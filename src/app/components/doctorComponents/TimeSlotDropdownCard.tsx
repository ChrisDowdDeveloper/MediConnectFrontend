"use client";

import { TimeSlot } from '@/types/timeSlotTypes';
import { fetchTimeSlotsByAvailabilityId } from '@/utils/api';
import { convertTo12HourFormat } from '@/utils/sharedFunctions';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppointmentContext } from "@/context/AppointmentContext";

interface TimeSlotProps {
    availabilityId: number
    doctorId: string
}

type ErrorState = {
    message: string
}

const TimeSlotDropdownCard: React.FC<TimeSlotProps> = ({ availabilityId, doctorId }) => {
  const router = useRouter();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTimeSlotId, setDoctorId, setAppointmentTime } =
    useAppointmentContext();

  useEffect(() => {
    const fetchTimeSlotsByDay = async () => {
      try {
        const timeSlots = await fetchTimeSlotsByAvailabilityId(availabilityId);
        setTimeSlots(timeSlots);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: "An unknown error occurred" });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTimeSlotsByDay();
  }, [availabilityId]);

  const handleBook = (slot: any) => {
    setDoctorId(doctorId);
    setTimeSlotId(slot.id);
    setAppointmentTime(slot.startTime);
    router.push(`/patient/new-appointment/${doctorId}/availabilities/${slot.id}`);
  }

  return (
    <div>
        <ul>
            {timeSlots?.map((slot) => (
            <li key={slot.id} className="py-4 flex justify-between items-center">
                <div>
                <p className="font-medium text-gray-600">
                    {convertTo12HourFormat(slot.startTime)} -{" "}
                    {convertTo12HourFormat(slot.endTime)}
                </p>
                <p className="text-sm text-gray-500">
                    {slot.isBooked ? "Booked" : "Available"}
                </p>
                </div>
                {!slot.isBooked && (
                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md font-semibold transition duration-200"
                    onClick={() => handleBook(slot)}
                >
                    Book
                </button>
                )}
                {slot.isBooked && (
                    <button className='bg-gray-500 text-white py-1 px-3 rounded-md font-semibold transition duration-200' disabled>
                        Book
                    </button>
                )}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default TimeSlotDropdownCard;
