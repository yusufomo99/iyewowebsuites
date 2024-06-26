// api.js
import baseUrl from '../../apiConfig'; // Adjust the path accordingly
import { useRouter } from 'next/router';

const myLogin = async (router, email, password, loadingComplete, role) => {
  if (role) {
    try {
      const apiUrl = `${baseUrl}/api/login`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: email,
          password: password,
          type: role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (role === 'cho') {
          router.push('/ManageCHO');
        } else if (role === 'doctor') {
          router.push('/doctors');
        } else if (role === 'lab') {
          router.push('/laboratory');
        } else if (role === 'nurse') {
          router.push('/nurse');
        } else if (role === 'finance') {
          router.push('/ManageFinance');
        } else if (role === 'pharmacy') {
          router.push('/pharmacy');
        } else if (role === 'hdo') {
          router.push('/healthdesk');
        }
        // Store the access token in local storage
        localStorage.setItem('access_token', data?.data?.access_token);
        // Store the user details in local storage
        localStorage.setItem('user_details', JSON.stringify(data?.data?.user));
      } else {
        // Handle errors here
        alert('Login failed');
        loadingComplete();
        const errorDetails = await response.json();
        console.error('Login failed:', errorDetails);
        return;
      }
    } catch (error) {
      loadingComplete();
      alert(error);
      console.error('An error occurred during login:', error);
      throw error;
    }
    return;
  }

  try {
    const apiUrl = `${baseUrl}/api/admin/login`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store the access token in local storage
      localStorage.setItem('access_token', data?.data?.access_token);
      // Store the user details in local storage
      localStorage.setItem('user_details', JSON.stringify(data?.data?.user));

      router.push('/');
    } else {
      // Handle errors here
      alert('Login failed');
      loadingComplete();
      const errorDetails = await response.json();
      console.error('Login failed:', errorDetails);
      throw new Error('Login failed');
    }
  } catch (error) {
    loadingComplete();
    alert(error);
    console.error('An error occurred during login:', error);
    throw error;
  }
};

export default myLogin;
