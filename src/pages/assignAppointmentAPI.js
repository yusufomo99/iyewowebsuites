// CreateCHOApi.js
import baseUrl from '../apiConfig'; // Adjust the path accordingly

const assignAppointmentAPI = async (AppointmentData, OnDataSuccess, dataReset,appointmentUuid) => {
 
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found in local storage');
      return;
    }

    const apiUrl = `${baseUrl}/api/admin/appointments/${appointmentUuid}/assign`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(AppointmentData),
    });

    if (response.ok) {
      const responseData = await response.json();
      // Handle the data from the API response
      OnDataSuccess();
     
    } else {
      // Handle errors here
      alert("Error Submitting Apointment")
      dataReset();
      console.error('Failed :', response);
    //   throw new Error('Failed to create CHO');
 
    }
  } catch (error) {
   
    console.error('An error occurred during the POST request:', error);
    dataReset();
    throw error;
  }
};

export default assignAppointmentAPI;
