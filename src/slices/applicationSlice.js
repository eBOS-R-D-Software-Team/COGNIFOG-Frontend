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
      builder
      .addCase(fetchAllApplicationsDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllApplicationsDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = Array.isArray(action.payload) ? action.payload : []; // ✅ Ensure it's always an array
      })
      .addCase(fetchAllApplicationsDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch application details";
        state.applications = []; // ✅ Ensure applications is reset to an empty array
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
