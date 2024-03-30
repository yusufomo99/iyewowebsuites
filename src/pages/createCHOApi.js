// CreateCHOApi.js
import baseUrl from '../apiConfig'; // Adjust the path accordingly

const createCHOApi = async (data, CreateCHOLoaded, dataReset) => {
    console.log(data,"data json")
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found in local storage');
      return;
    }

    const apiUrl = `${baseUrl}/api/admin/cho`;

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
      CreateCHOLoaded();
      console.log('Create CHO API response:', responseData);
    } else {
      // Handle errors here
    //   alert(response.errors)
      dataReset();
      console.error('Failed to create CHO:', response);
      throw new Error('Failed to create CHO');
 
    }
  } catch (error) {
   
    console.error('An error occurred during the POST request:', error);
    dataReset();
    throw error;
  }
};

export default createCHOApi;
