import React from 'react';

const PatientHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">MediConnect</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/profile" className="hover:underline">Profile</a></li>
              <li><a href="/appointments" className="hover:underline">Appointments</a></li>
              <li><a href="/notifications" className="hover:underline">Notifications</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/*
            !*FIXME - API call to get the doctor
        */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Your Primary Doctor:</h2>
          <div className="flex items-center space-x-4">
            <img src="/doctor-placeholder.jpg" alt="Doctor's Photo" className="w-16 h-16 rounded-full" />
            <div>
              <p className="text-lg font-semibold">Dr. Jane Doe</p>
              <p className="text-gray-500">Cardiologist</p>
              <p className="text-gray-500">Email: jane.doe@example.com</p>
            </div>
          </div>
        </section>

        {/* !
            *FIXME - API call to get upcoming appointments
        */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {/* 
                !*FIXME - Move this to a separate card
            */}
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
        </section>
      </main>
    </div>
  );
};

export default PatientHomePage;
