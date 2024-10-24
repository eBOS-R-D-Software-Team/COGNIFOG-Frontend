// src/slices/applicationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchApplications, createApplication } from '../actions/applicationactions';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // If you have additional synchronous actions, you can handle them here
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications = action.payload; // Populate applications array
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch applications';
      })

      // Create application
      .addCase(createApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications.push(action.payload); // Add new application to array
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create application';
      });
  }
});

export default applicationSlice.reducer;
