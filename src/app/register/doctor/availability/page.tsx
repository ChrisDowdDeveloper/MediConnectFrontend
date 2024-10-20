"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerDoctor } from '@/utils/api';
import { times } from '@/utils/times';
import { DoctorFormState } from '@/types/patientFormTypes';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const DoctorAvailabilityForm = () => {
  const router = useRouter();

  const [officeAvailability, setOfficeAvailability] = useState<Record<DayOfWeek, { open: string; close: string }>>({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });

  const [doctorInfo, setDoctorInfo] = useState<DoctorFormState | null>(null);

  useEffect(() => {
    const savedDoctorInfo = localStorage.getItem('doctorInfo');
    if (savedDoctorInfo) {
      setDoctorInfo(JSON.parse(savedDoctorInfo));
    }
  }, []);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>, day: DayOfWeek, timeType: 'open' | 'close') => {
    const { value } = e.target;
    setOfficeAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorInfo) {
      console.error("Doctor information is missing.");
      return;
    }

    /*FIXME - After adjustment to the backend and database
    //const availability = JSON.stringify(officeAvailability);
    */
    const availability = "none";
    const { availability: _, ...restDoctorInfo } = doctorInfo;

    const finalData = {
        availability,
        ...restDoctorInfo,
      };

    console.log(finalData)

    try {
      await registerDoctor(finalData);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Availability</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(officeAvailability).map((day) => (
          <div key={day} className="mb-4">
            <label className="block text-lg font-bold mb-2">{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
            <div className="flex space-x-4">
              <select
                value={officeAvailability[day as DayOfWeek].open}
                onChange={(e) => handleTimeChange(e, day as DayOfWeek, 'open')}
                className="p-2 rounded-lg bg-white"
              >
                <option value="">Select Open Time</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
              <select
                value={officeAvailability[day as DayOfWeek].close}
                onChange={(e) => handleTimeChange(e, day as DayOfWeek, 'close')}
                className="p-2 rounded-lg bg-white"
              >
                <option value="">Select Close Time</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg w-full font-bold transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 active:scale-95"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default DoctorAvailabilityForm;
