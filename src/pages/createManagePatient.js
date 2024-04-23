// CreateCHOApi.js
import baseUrl from '../apiConfig'; // Adjust the path accordingly

const createManagePatient= async (data,dataReset) => {
  console.log(data,"managepatientData")
   
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found in local storage');
      return;
    }

    const apiUrl = `${baseUrl}/api/doctors/comment`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      // Handle the data from the API response
      console.log(responseData, "responseData")
    
     alert('Patient Comment Created Successfully');
     dataReset();
    } else {
      // Handle errors here
    //   alert(response.errors)
      dataReset();
   alert('Failed to create Patient Comment:', response);
    //   throw new Error('Failed to create CHO');
 
    }
  } catch (error) {
   
    alert('An error occurred during the POST request:', error);
    dataReset();
    // throw error;
  }
};

export default createManagePatient;
