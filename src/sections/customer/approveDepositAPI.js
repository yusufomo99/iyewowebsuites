// CreateCHOApi.js
import baseUrl from '../../apiConfig'; // Adjust the path accordingly

const approveDepositAPI = async (depositUuid, depositSuccess, errorSubmit) => {
 
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      alert('Access token not found in local storage');
      return;
    }

    const apiUrl = `${baseUrl}/api/admin/deposits/${depositUuid}/approve`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      depositSuccess()
     
    } else {
      // Handle errors here
    alert("Error Approving")
    errorSubmit()
      console.error('Failed :', response);
    //   throw new Error('Failed to create CHO');
 
    }
  } catch (error) {
   
   alert('An error occurred during the POST: Deposit:', error);
   errorSubmit()
    throw error;
  }
};

export default approveDepositAPI;
