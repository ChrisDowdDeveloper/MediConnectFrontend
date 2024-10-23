import React from 'react'

const PatientHeader = () => {
  return (
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
  )
}

export default PatientHeader