import { createSlice } from '@reduxjs/toolkit';
import { fetchAllApplicationsDetails, fetchApplications, createApplication, getApplicationInformation } from '../actions/applicationactions';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {}, // ✅ Keeping this in case we add manual reducers in the future
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        console.log("🔄 Fetching Applications - Pending...");
        state.status = 'loading';
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        console.log("✅ Applications Loaded: ", action.payload);
        state.status = 'succeeded';
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        console.error("❌ Fetch Applications Failed:", action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch applications';
      })
      // Fetch All Applications with Details
      .addCase(fetchAllApplicationsDetails.pending, (state) => {
        console.log("🔄 Fetching All Application Details...");
        state.status = 'loading';
      })
      .addCase(fetchAllApplicationsDetails.fulfilled, (state, action) => {
        console.log("✅ Application Details Loaded:", action.payload);
        state.status = 'succeeded';
        state.applications = action.payload;
      })
      .addCase(fetchAllApplicationsDetails.rejected, (state, action) => {
        console.error("❌ Fetch Application Details Failed:", action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch application details';
      })
      // Fetch Single Application
      .addCase(getApplicationInformation.pending, (state) => {
        console.log("🔄 Fetching Application Info...");
        state.status = 'loading';
      })
      .addCase(getApplicationInformation.fulfilled, (state, action) => {
        console.log("✅ Application Info Loaded:", action.payload);
        state.status = 'succeeded';
        state.applications = action.payload;
      })
      .addCase(getApplicationInformation.rejected, (state, action) => {
        console.error("❌ Fetch Application Info Failed:", action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch application info';
      })
      // Create Application
      .addCase(createApplication.pending, (state) => {
        console.log("🔄 Creating Application...");
        state.status = 'loading';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        console.log("✅ Application Created:", action.payload);
        state.status = 'succeeded';
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        console.error("❌ Create Application Failed:", action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Failed to create application';
      });
  }
});

export default applicationSlice.reducer;
