"use client";
import React, { useEffect, useState } from "react";
import { fetchAllTimeSlotsByDoctor, fetchAvailibilitiesById } from "@/utils/api";
import { TimeSlot } from "@/types/timeSlotTypes";
import { Doctor } from "@/types/doctorTypes";
import { Availabilities } from "@/types/availabilityTypes";
import { dayNames } from "@/utils/dayNames";
import { getWeekRange } from "@/utils/sharedFunctions";

interface TimeSlotCardProps {
  doctorId: string;
  doctor?: Doctor | null;
}

type ErrorState = {
  message: string;
};

const convertTo12HourFormat = (time: string): string => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ doctor, doctorId }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[] | null>(null);
  const [availabilities, setAvailabilities] = useState<Availabilities | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorAvailabilities = async () => {
      try {
        const slots = await fetchAllTimeSlotsByDoctor(doctorId);
        const availability = await fetchAvailibilitiesById(doctorId);
        setTimeSlots(slots);
        setAvailabilities(availability);
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
    fetchDoctorAvailabilities();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>Loading doctor time slots...</p>
      </div>
    );
  }

  console.log(availabilities);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Available Time Slots for Week: {getWeekRange()}</h2>
      <ul className="divide-y divide-gray-200">
        {availabilities?.map((availability) => (
            <li key={availability.id} className="py-4 flex justify-between">
              <span className="font-medium text-gray-600">
                {dayNames[availability.dayOfWeek as keyof typeof dayNames]}
              </span>
              <button>
                --
              </button>
            </li>
          ))}
        {/*{timeSlots?.map((slot) => (
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
                onClick={() => {
                  alert(`Booking time slot: ${slot.id}`);
                }}
              >
                Book
              </button>
            )}
          </li>
        ))}*/}
      </ul>
    </div>
  );
};

export default TimeSlotCard;
