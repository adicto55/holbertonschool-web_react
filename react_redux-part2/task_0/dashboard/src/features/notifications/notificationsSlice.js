import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

// Removed displayDrawer from initialState
const initialState = {
  notifications: [],
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await fetch(ENDPOINTS.notifications);
    const data = await response.json();

    return data.map((notification) => {
      if (notification.id === 3) {
        return {
          ...notification,
          html: { __html: getLatestNotification() },
        };
      }
      return notification;
    });
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
      console.log(`Notification ${id} has been marked as read`);
    },
    // showDrawer and hideDrawer have been removed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

// Excluded showDrawer and hideDrawer from exports
export const { markNotificationAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
