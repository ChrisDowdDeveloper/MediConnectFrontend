import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

//const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendUrl = 'http://localhost:5051/api';

interface CustomJwtPayload extends JwtPayload {
  email?: string;
  nameid?: string;
}

export const getIdFromToken = () => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const decoded = jwtDecode<CustomJwtPayload>(token);
  return decoded.nameid;
}

export const login = async (userNameOrEmail: string, password: string) => {
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userNameOrEmail, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();

  const token = data.token;

  Cookies.set('token', token, {expires: 1});

  return data;
};

export const logout = () => {
  Cookies.remove('token');
}


/**
 * Patient API Calls
*/
export const registerPatient = async(patientData: any) => {
  const response = await fetch(`${backendUrl}/patient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });

  if(!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  return result;
}

export const fetchUpcomingAppointments = async(patientId: string) => {
  const token = Cookies.get('token');

  if(!token) {
    throw new Error('No token found, user is not authenticated');
  }

  const response = await fetch(`${backendUrl}/appointment/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if(!response.ok) {
    throw new Error('Failed to fetch upcoming appointments');
  }

  const data = await response.json();
  return data;
}

export const fetchPatientById = async() => {
  const token = Cookies.get('token');

  if(!token) {
    throw new Error('No token found');
  }

  const patientId = getIdFromToken();

  const response = await fetch(`${backendUrl}/patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch patient details');
  }

  const patientData = await response.json();
  return patientData;
}

export const updatePatient = async(updatedPatientData: any) => {
  const token = Cookies.get('token');

  if(!token) {
    throw new Error('No token found');
  }

  const patientId = getIdFromToken();

  const response = await fetch(`${backendUrl}/patient/${patientId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPatientData)
  });

  if(!response.ok) {
    throw new Error('Failed to update patient');
  }
  const patientData = await response.json();
  return patientData;

}

export const createAppointment = async(notes: string, doctorId: string, timeSlotId: number, appointmentDate: string, appointmentTime: string) => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const appointmentDateTime = `${appointmentDate}T${appointmentTime}`;

  const patientId = getIdFromToken();
  const appointmentData = {
    "patientId": patientId,
    "doctorId": doctorId,
    "appointmentDateTime": appointmentDateTime, 
    "notes": notes
  };
  
  const response = await fetch(`${backendUrl}/Appointment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointmentData)
  });
  if(!response.ok) {
    throw new Error('Failed to create the appointment')
  }

  const result = await response.json();
  return result;

}

/**
 * Doctor API Calls
*/
export const registerDoctor = async(doctorData: any) => {
  doctorData.availability = "none";
  const response = await fetch(`${backendUrl}/doctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doctorData),
  });

  if(!response.ok) {
    throw new Error('Registration failed');
  }

  const result = await response.json();
  return result;
}

export const fetchDoctors = async() => {
  const token = Cookies.get('token');

  if(!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${backendUrl}/doctor`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch doctors');
  }

  const doctors = await response.json();
  return doctors;
}

export const fetchDoctorById = async(doctorId: string) => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${backendUrl}/doctor/${doctorId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error(`Failed to fetch the doctor: ${doctorId}`);
  }

  const doctor = await response.json();
  return doctor;
}

export const fetchAvailibilitiesById = async(doctorId: string, date: Date) => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${backendUrl}/Availability/Doctor/${doctorId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch doctor availability');
  }

  const availability = await response.json();
  return availability;
}

export const fetchAllTimeSlotsByDoctor = async(doctorId: string) => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${backendUrl}/TimeSlot/Doctor/${doctorId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch time slots by doctor id');
  }

  const timeslots = await response.json();
  return timeslots;

}

export const fetchTimeSlotsByAvailabilityId = async(availabilityId: number) => {
  const token = Cookies.get('token');
  if(!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${backendUrl}/TimeSlot/Availability/${availabilityId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error('Failed to fetch time slots by availability id');
  }
  const timeslots = await response.json();
  return timeslots
}