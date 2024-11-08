// src/actions/channelActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a new channel
export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async ({ incomingComponentId, outgoingComponentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(process.env.REACT_APP_PRODUCTION_URL + 'channels', {
        incomingComponentId,
        outgoingComponentId,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Get all channels
export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_PRODUCTION_URL + 'channels');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Get a channel by ID
export const getChannelById = createAsyncThunk(
  'channels/getChannelById',
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_PRODUCTION_URL + `channels/${channelId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Update an existing channel
export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async ({ channelId, incomingComponentId, outgoingComponentId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(process.env.REACT_APP_PRODUCTION_URL + `channels/${channelId}`, {
        incomingComponentId,
        outgoingComponentId,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Delete a channel
export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
  async (channelId, { rejectWithValue }) => {
    try {
      await axios.delete(process.env.REACT_APP_PRODUCTION_URL + `channels/${channelId}`);
      return { id: channelId };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
