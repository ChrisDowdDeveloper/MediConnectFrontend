"use client";
import React, { useEffect, useState } from "react";
import { fetchAvailibilitiesById } from "@/utils/api";
import { Availabilities } from "@/types/availabilityTypes";
import { dayNames } from "@/utils/dayNames";
import { convertTo12HourFormat } from "@/utils/sharedFunctions";

interface DoctorAvailabilityCardProps {
  doctorId: string;
}

type ErrorState = {
  message: string;
};

const AvailabilityCard: React.FC<DoctorAvailabilityCardProps> = ({
  doctorId,
}) => {
  const [availabilities, setAvailabilities] = useState<Availabilities | null>(
    null
  );
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorAvailabilities = async () => {
      try {
        const doctorAvailabilities = await fetchAvailibilitiesById(doctorId);
        setAvailabilities(doctorAvailabilities);
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
        <p>Loading doctor availabilities...</p>
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Office Hours</h2>
      <ul className="divide-y divide-gray-200">
        {availabilities?.map((availability) => (
          <li key={availability.id} className="py-4 flex justify-between">
            <span className="font-medium text-gray-600">
              {dayNames[availability.dayOfWeek as keyof typeof dayNames]}
            </span>
            <span className="text-gray-800">
              {convertTo12HourFormat(availability.startTime)} -{" "}
              {convertTo12HourFormat(availability.endTime)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityCard;
