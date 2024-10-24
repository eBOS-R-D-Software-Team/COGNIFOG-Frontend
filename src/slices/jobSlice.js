// src/slices/jobSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createJob } from '../actions/jobActions';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload); // Add the created job to the state
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
