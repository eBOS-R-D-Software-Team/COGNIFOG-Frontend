// src/actions/componentActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a new component
export const createComponent = createAsyncThunk(
  'components/createComponent',
  async ({ applicationId, componentData }, { rejectWithValue }) => {
    try {
      // Construct the URL correctly with the applicationId
      const response = await axios.post(
        `http://localhost:3000/api/components/${applicationId}/components`,
        componentData,
        {
          headers: {
            'Content-Type': 'application/json', // Make sure it's JSON
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
