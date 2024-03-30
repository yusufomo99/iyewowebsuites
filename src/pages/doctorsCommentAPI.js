// CreateCHOApi.js
import baseUrl from '../apiConfig'; // Adjust the path accordingly

const doctorsCommentAPI = async (commentData) => {
 
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      alert('Access token not found in local storage');
      return;
    }

    const apiUrl = `${baseUrl}/api/doctors/comment`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const responseData = await response.json();
      // Handle the data from the API response
    //   OnDataSuccess();
    alert("Data Successfully submitted")
     
    } else {
      // Handle errors here
      alert("Error Submitting Apointment")
    //   dataReset();
    alert("There was error submitting Data")
      console.error('Failed :', response);
    //   throw new Error('Failed to create CHO');
 
    }
  } catch (error) {
   alert(error)
    console.error('An error occurred during the POST request:', error);
    // dataReset();
    throw error;
  }
};

export default doctorsCommentAPI;
