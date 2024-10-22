import React from 'react'

const PatientAppointmentCard = () => {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Dr. Jane Doe</p>
                <p className="text-gray-500">October 25, 2024 - 10:00 AM</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
    </div>
  )
}

export default PatientAppointmentCard