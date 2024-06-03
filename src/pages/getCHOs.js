import baseUrl from '../apiConfig';
import { useRouter } from 'next/router';

const getCHOs = async (fetchAllCHOs,searchQuery) => {
  try {
    // alert(page)
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // Handle the case where the access token is not available
      alert('Access token not found in local storage');
      return;
    }
    let apiUrl;
if(searchQuery){
  apiUrl = `${baseUrl}/api/admin/cho?search=${searchQuery}`;
}else{
  apiUrl = `${baseUrl}/api/admin/cho`;

}
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
        // console.log('cho data:', data?.data);
    fetchAllCHOs(data?.data)
      // Handle the data from the API response
    //    console.log('Pending Deposits:', data);
    } else {
      // Handle errors here
      alert('Authentication-Network Error. Sign out & Sign in again: Failed to fetch Doctors');
    //   throw new Error('Failed to fetch pending appointments');
    }
  } catch (error) {
    console.error('An error occurred during the GET request:', error);
    throw error;
  }
};

export default getCHOs;
