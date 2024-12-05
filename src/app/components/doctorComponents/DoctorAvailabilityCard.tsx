"use client";
import React, { useEffect, useState } from "react";
import { fetchAvailibilitiesById } from "@/utils/api";
import { Doctor } from "@/types/doctorTypes";
import { Availabilities } from "@/types/availabilityTypes";
import { dayNames } from "@/utils/dayNames";
import { getWeekRange } from "@/utils/sharedFunctions";
import TimeSlotDropdownCard from "./TimeSlotDropdownCard";
import { useAppointmentContext } from "@/context/AppointmentContext";

interface DoctorAvailabilityProps {
  doctorId: string;
  doctor?: Doctor | null;
}

type ErrorState = {
  message: string;
};

const DoctorAvailabilityCard: React.FC<DoctorAvailabilityProps> = ({
  doctor,
  doctorId,
}) => {
  const { appointmentDate, setAppointmentDate } = useAppointmentContext();
  const [availabilities, setAvailabilities] = useState<Availabilities | null>(
    null
  );
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedAvailability, setExpandedAvailability] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchDoctorAvailabilities = async () => {
      try {
        const availability = await fetchAvailibilitiesById(doctorId, currentDate);
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
  }, [doctorId, currentDate]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>Loading doctor time slots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const toggleExpand = (availabilityId: number, dayOfWeek: number) => {
    setExpandedAvailability((prev) => (prev === availabilityId ? null : availabilityId));

    const weekStartDate = new Date(currentDate);
    const selectedDate = new Date(weekStartDate);
    selectedDate.setDate(
      weekStartDate.getDate() + (dayOfWeek - weekStartDate.getDay())
    );

    setAppointmentDate(selectedDate);
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousWeek}
          className="text-blue-600 hover:underline px-7"
        >
          ← Previous Week
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Available Time Slots for Week: {getWeekRange(currentDate)}
        </h2>
        <button
          onClick={handleNextWeek}
          className="text-blue-600 hover:underline px-7"
        >
          Next Week →
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {availabilities?.map((availability) => (
          <li key={availability.id} className="py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600">
                {dayNames[availability.dayOfWeek as keyof typeof dayNames]}
              </span>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => toggleExpand(availability.id, availability.dayOfWeek)}
              >
                {expandedAvailability === availability.id ? (
                  <img src="/angle-small-down.png" />
                ) : (
                  <img src="/angle-small-right.png" />
                )}
              </button>
            </div>
            {expandedAvailability === availability.id && (
              <div className="mt-4">
                <TimeSlotDropdownCard
                  doctorId={doctorId}
                  availabilityId={availability.id}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAvailabilityCard;
