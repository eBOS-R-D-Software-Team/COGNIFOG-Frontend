// src/actions/applicationActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch applications from the backend
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_DEV_URL + 'applications');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllApplicationsDetails = createAsyncThunk(
  'applications/fetchAllApplicationsDetails',
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔍 Fetching applications...");
      const response = await axios.get(process.env.REACT_APP_DEV_URL + 'applications/getAllApplicationDetails');
      console.log("✅ API Raw Response:", response);
      console.log("✅ API Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch an application information from the backend with an ID parameter
export const getApplicationInformation = createAsyncThunk(
  'applications/getApplicationInformation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_DEV_URL + `applications/getApplicationInformation/${id}`);
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
        console.log("process.env.PRODUCTION_URL: ", process.env.REACT_APP_DEV_URL);
        console.log('Payload being sent to API:', applicationData);  // Log payload
        const response = await axios.post(process.env.REACT_APP_DEV_URL + 'applications/createApp', applicationData);
        console.log('Response from API:', response.data);  // Log successful response
        return response.data;
      } catch (error) {
        console.error('Error from API:', error.message);  // Log error
        return rejectWithValue(error.message);
      }
    }
  );

// Delete an application by ID
export const deleteApplication = createAsyncThunk(
  'applications/deleteApplication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(process.env.REACT_APP_DEV_URL + `applications/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
