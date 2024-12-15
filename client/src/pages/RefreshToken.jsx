import React, { useEffect } from 'react';
import axios from 'axios';
import { REFRESH_ROUTE } from '@/utils/constants';

const RefreshToken = () => {
  const fetchNewToken = async () => {
    try {
      const response = await axios.post(REFRESH_ROUTE,null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const newToken = response.data.token; // Extract new token from response
      localStorage.setItem('token', newToken); // Save the new token in local storage
      console.log('Token refreshed:', newToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      // Handle token refresh failure (e.g., redirect to login or show an error)
    }
  };

  useEffect(() => {
    fetchNewToken();
  }, []);

  return <div>Refreshing Token...</div>;
};

export default RefreshToken;

