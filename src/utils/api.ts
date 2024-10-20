//const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendUrl = 'http://localhost:5051/api';

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
  return data;
};
  
  export const fetchAppointments = async (token: string) => {
    const response = await fetch('/api/appointments', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
  
    const data = await response.json();
    return data;
  };



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