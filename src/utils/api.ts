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

  const patientId = getIdFromToken();
  console.log(patientId);

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
  console.log(token)

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

/**
 * Doctor API Calls
*/
export const registerDoctor = async(doctorData: any) => {
  console.log(doctorData)
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