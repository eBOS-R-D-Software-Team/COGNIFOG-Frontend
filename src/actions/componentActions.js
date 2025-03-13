// src/actions/componentActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createComponent = createAsyncThunk(
  'components/createComponent',
  async ({ applicationId, payload }, { rejectWithValue }) => { // ✅ Use applicationId
    try {
      console.log('Creating component for applicationId:', applicationId); 
      console.log('Payload:', payload); 

      const response = await axios.post(
        `${process.env.REACT_APP_DEV_URL}components/${applicationId}/components`, 
        payload, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log("Response from API:", response.data); // ✅ Log unique component ID
      return response.data; 
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        return rejectWithValue(error.response.data); 
      } else {
        console.error('Error message:', error.message);
        return rejectWithValue(error.message); 
      }
    }
  }
);

export const fetchComponents = createAsyncThunk(
  'components/fetchComponents',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_DEV_URL + `components/${applicationId}/components`);
      return response.data; // Return the list of components
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return server error
      } else {
        return rejectWithValue(error.message); // Return generic error message
      }
    }
  }
);
