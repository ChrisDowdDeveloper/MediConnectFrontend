"use client";

import { useAppointmentContext } from '@/context/AppointmentContext';
import { createAppointment } from '@/utils/api';
import { useRouter } from 'next/navigation';

const CreateNewAppointmentPage: React.FC = () => {
  const router = useRouter();
  const {
    doctorId,
    timeSlotId,
    appointmentDate,
    appointmentTime,
    notes,
    setNotes,
  } = useAppointmentContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedDate = appointmentDate instanceof Date 
      ? appointmentDate.toISOString().split("T")[0]
      : appointmentDate;
      await createAppointment(notes, doctorId, timeSlotId, formattedDate, appointmentTime);
      alert("Appointment booked successfully!");
      router.push("/patient/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to book the appointment");
    }
  };

  const handleCancel = () => {
    router.back();
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Describe the Symptoms
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="notes"
              className="block text-gray-700 font-semibold mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Write your notes here..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewAppointmentPage