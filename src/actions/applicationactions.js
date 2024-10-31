// src/actions/applicationActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch applications from the backend
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/applications');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch an application information from the backend with an ID parameter
export const getApplicationInformation = createAsyncThunk(
  'applications/getApplicationInformation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/applications/getApplicationInformation/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a new application
export const createApplication = createAsyncThunk(
    'applications/createApplication',
    async (applicationData, { rejectWithValue }) => {
      try {
        console.log('Payload being sent to API:', applicationData);  // Log payload
        const response = await axios.post('http://localhost:3000/api/applications/createApp', applicationData);
        console.log('Response from API:', response.data);  // Log successful response
        return response.data;
      } catch (error) {
        console.error('Error from API:', error.message);  // Log error
        return rejectWithValue(error.message);
      }
    }
  );