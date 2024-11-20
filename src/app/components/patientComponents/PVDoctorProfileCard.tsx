import { Doctor } from "@/types/doctorTypes";
import React from "react";

interface DoctorListCardProps {
  doctor: Doctor | null;
}

const PVDoctorProfileCard: React.FC<DoctorListCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col items-center space-y-6 w-auto mx-auto">

      <div className="flex items-center justify-center bg-green-100 rounded-full w-40 h-40 text-5xl font-bold text-green-500">
        {doctor?.firstName?.[0]}
        {doctor?.lastName?.[0]}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {doctor?.firstName} {doctor?.lastName}
        </h1>
        <p className="text-gray-500 mt-2">
          Specialty: {doctor?.specialty || "N/A"}
        </p>
        <p className="text-gray-500">Phone: {doctor?.phoneNumber || "N/A"}</p>
        <p className="text-gray-500">
          Experience:{" "}
          {doctor?.yearsOfExperience
            ? `${doctor.yearsOfExperience} years`
            : "N/A"}
        </p>
        <p className="text-gray-500">
          Address: {doctor?.officeAddress || "N/A"}
        </p>
      </div>

      <div className="flex flex-row">
        <button className="bg-green-600 hover:bg-green-700 text-white mx-2 py-2 px-6 rounded-lg font-semibold transition duration-200 w-full">
          View Schedule
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-200 w-full">
          Make Appointment
        </button>
      </div>
    </div>
  );
};

export default PVDoctorProfileCard;
