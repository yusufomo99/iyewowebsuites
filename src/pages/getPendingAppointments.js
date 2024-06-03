import baseUrl from '../apiConfig';
import { useRouter } from 'next/router';

const getPendingAppointments = async (fetchCHO,page, reloginContext) => {
  try {
    // alert(page)
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      alert('Access token not found in local storage');
      return;
    }

 let apiUrl = `${baseUrl}/api/admin/appointments?status=pending&page=${page}&per_page=10`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      fetchCHO(data)
      // Handle the data from the API response
     console.log('Pending Appointments:', data);
    } else {
      // Handle errors here
      reloginContext()
      alert('Authentication-Network Error. Sign out & Sign in again: Failed to fetch pending appointments');
    //   throw new Error('Failed to fetch pending appointments');
    }
  } catch (error) {
    console.error('An error occurred during the GET request:', error);
    throw error;
  }
};

export default getPendingAppointments;
