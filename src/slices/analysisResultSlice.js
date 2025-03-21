// src/slices/analysisResultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch analysis result using applicationId
export const fetchAnalysisResult = createAsyncThunk(
  'analysisResult/fetchAnalysisResult',
  async (applicationId, thunkAPI) => {
    const response = await axios.get(process.env.REACT_APP_DEV_URL + `analysisresult/${applicationId}`);
    return response.data;
  }
);

const analysisResultSlice = createSlice({
  name: 'analysisResult',
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysisResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalysisResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalysisResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default analysisResultSlice.reducer;
