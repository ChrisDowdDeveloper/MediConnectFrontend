const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (email: string, password: string) => {
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
  