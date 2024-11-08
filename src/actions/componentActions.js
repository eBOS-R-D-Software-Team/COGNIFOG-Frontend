// src/actions/componentActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createComponent = createAsyncThunk(
  'components/createComponent',
  async ({ componentId, payload }, { rejectWithValue }) => {
    try {
      console.log('Creating component with componentId:', componentId); // Debug log
      console.log('Payload:', payload); // Debug log

      const response = await axios.post(
        process.env.REACT_APP_PRODUCTION_URL + `components/${componentId}/components`, 
        payload, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        return rejectWithValue(error.response.data); // Returns server-specific error
      } else {
        console.error('Error message:', error.message);
        return rejectWithValue(error.message); // Generic error message
      }
    }
  }
);

export const fetchComponents = createAsyncThunk(
  'components/fetchComponents',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_PRODUCTION_URL + `components/${applicationId}/components`);
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
