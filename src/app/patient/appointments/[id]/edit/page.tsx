"use client";

import PatientHeader from '@/app/components/patientComponents/PatientHeader';
import Loader from '@/app/components/shared/Loader';
import { Availabilities } from '@/types/availabilityTypes';
import { Appointment } from '@/types/commonTypes';
import { TimeSlot } from '@/types/timeSlotTypes';
import { fetchAppointmentById, fetchAvailibilitiesById, fetchTimeSlotsByAvailabilityId, rescheduleAppointmentById } from '@/utils/api';
import { dayNames } from '@/utils/dayNames';
import { convertTo12HourFormat } from '@/utils/sharedFunctions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AppointmentReschedulePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [availableDays, setAvailableDays] = useState<Availabilities | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const appointmentData = await fetchAppointmentById(params.id);
        setAppointment(appointmentData);

        const availableDaysData = await fetchAvailibilitiesById(
          appointmentData.doctor.id,
          new Date()
        );
        setAvailableDays(availableDaysData);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const fetchTimeSlots = async (availabilityId: number) => {
    try {
      const response = await fetchTimeSlotsByAvailabilityId(availabilityId);
      setTimeSlots(response);
    } catch (err) {
      console.error('Failed to fetch time slots:', err);
      setError('Failed to fetch time slots for the selected day.');
    }
  };

  const handleDayChange = (dayOfWeek: string) => {
    const dayOfWeekNumber = parseInt(dayOfWeek, 10);
  
    const selectedAvailability = availableDays?.find(day => day.dayOfWeek === dayOfWeekNumber);
    if (!selectedAvailability) {
      setSelectedDay(null);
      setTimeSlots(null);
      return;
    }
  
    setSelectedDay(dayOfWeek);
    fetchTimeSlots(selectedAvailability.id);
    setSelectedTime(null);
  };
  

  const rescheduleAppointment = async () => {
    if (!selectedTime) {
      alert('Please select a new time slot.');
      return;
    }
  
    const rescheduledAppointment = {
      newTime: selectedTime,
    };
  
    try {
      await rescheduleAppointmentById(Number(params.id), rescheduledAppointment);
      alert('Appointment rescheduled successfully.');
      router.push('/patient/dashboard');
    } catch (error: any) {
      console.error('Failed to reschedule appointment:', error);
      alert(error.message || 'Failed to reschedule appointment.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 mb-4">Error: {error}</p>;
  if (!appointment) return <p>No appointment found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <PatientHeader />
      </header>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Reschedule Appointment</h1>
        <p className="mb-2"><span className="font-semibold">Doctor:</span> Dr. {appointment.doctor.firstName} {appointment.doctor.lastName} ({appointment.doctor.specialty})</p>
        <p className="mb-2"><span className="font-semibold">Current Date & Time:</span> {new Date(appointment.appointmentDateTime).toLocaleString()}</p>

        <div className="mb-4">
          <label htmlFor="day-selector" className="block text-gray-700 font-medium">
            Select New Day
          </label>
          <select
            id="day-selector"
            value={selectedDay || ''}
            onChange={(e) => handleDayChange(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a day</option>
            {availableDays?.map((day) => (
              <option key={day.id} value={day.dayOfWeek.toString()}>
                {dayNames[day.dayOfWeek as keyof typeof dayNames]}
              </option>
            ))}
          </select>
        </div>

        {selectedDay && (
          <div className="mb-4">
            <label htmlFor="time-slot" className="block text-gray-700 font-medium">
              Select New Time
            </label>
            <select
              id="time-slot"
              value={selectedTime || ''}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select a time slot</option>
              {timeSlots?.map((slot) => (
                <option key={slot.id} value={slot.startTime}>
                  {convertTo12HourFormat(slot.startTime)} -{" "}
                  {convertTo12HourFormat(slot.endTime)}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={rescheduleAppointment}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mt-4"
        >
          Confirm Reschedule
        </button>
      </div>
    </div>
  );
};

export default AppointmentReschedulePage;
