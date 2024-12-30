import React from 'react'

const PatientHeader = () => {
  return (
    <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold"><a href='/patient/dashboard'>MediConnect</a></h1>
        <nav>
        <ul className="flex space-x-6">
            <li><a href="/patient/profile" className="hover:underline">Profile</a></li>
            <li><a href="/patient/dashboard" className="hover:underline">Dashboard</a></li>
        </ul>
        </nav>
    </div>
  )
}

export default PatientHeader