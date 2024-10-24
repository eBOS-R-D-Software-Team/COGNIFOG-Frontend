// src/actions/jobActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a new job with form-data, including the manifest file
export const createJob = createAsyncThunk(
  'jobs/createJob',
  async ({ formData, componentId }, { rejectWithValue }) => {
    try {
      console.log('Submitting formData to the server with componentId:', componentId);
      
      // Log the form data values to ensure they are correct
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // POST to the URL with the componentId included in the route
      const response = await axios.post(
        `http://localhost:3000/api/jobs/${componentId}/jobs`, // componentId is in the URL now
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Server response:', response.data); // Log the server response
      return response.data;
    } catch (error) {
      console.log('Error occurred:', error); // Log the error for debugging
      if (error.response && error.response.data) {
        console.log('Error response from server:', error.response.data); // Log server error
        return rejectWithValue(error.response.data); // Return server error
      } else {
        return rejectWithValue(error.message); // Return generic error message
      }
    }
  }
);
