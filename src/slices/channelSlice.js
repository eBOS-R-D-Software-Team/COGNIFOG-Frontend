// src/slices/channelSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createChannel, getChannels, getChannelById, updateChannel, deleteChannel } from '../actions/channelActions';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    channel: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Handle createChannel action
    builder.addCase(createChannel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createChannel.fulfilled, (state, action) => {
      state.loading = false;
      state.channels.push(action.payload);
    });
    builder.addCase(createChannel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getChannels action
    builder.addCase(getChannels.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.loading = false;
      state.channels = action.payload;
    });
    builder.addCase(getChannels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getChannelById action
    builder.addCase(getChannelById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelById.fulfilled, (state, action) => {
      state.loading = false;
      state.channel = action.payload;
    });
    builder.addCase(getChannelById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updateChannel action
    builder.addCase(updateChannel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateChannel.fulfilled, (state, action) => {
      state.loading = false;
      state.channels = state.channels.map((channel) =>
        channel.id === action.payload.id ? action.payload : channel
      );
    });
    builder.addCase(updateChannel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle deleteChannel action
    builder.addCase(deleteChannel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteChannel.fulfilled, (state, action) => {
      state.loading = false;
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
    });
    builder.addCase(deleteChannel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default channelSlice.reducer;
