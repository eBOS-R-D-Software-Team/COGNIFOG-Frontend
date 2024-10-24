// src/reducers/applicationReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchApplications, createApplication } from '../actions/applicationactions';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create application
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applicationSlice.reducer;
