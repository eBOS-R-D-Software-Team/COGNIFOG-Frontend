// src/slices/componentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createComponent, fetchComponents } from '../actions/componentActions';

const componentSlice = createSlice({
  name: 'components',
  initialState: {
    components: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComponent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComponent.fulfilled, (state, action) => {
        state.loading = false;
        state.components.push(action.payload);
      })
      .addCase(createComponent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComponents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComponents.fulfilled, (state, action) => {
        state.loading = false;
        state.components = action.payload; // Store the fetched components
      })
      .addCase(fetchComponents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default componentSlice.reducer;
