import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Assuming fetchNotifications async thunk is needed for the extraReducers
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await fetch('/notifications.json');
    const data = await response.json();
    return data;
  }
);

// 1. Add loading: false to the initial state
const initialState = {
  notifications: [],
  loading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action) => {
      state.notifications = state.notifications.map((notif) => {
        if (notif.id === action.payload) {
          return { ...notif, isRead: true };
        }
        return notif;
      });
    },
  },
  // 2. Modify extraReducers to handle pending, fulfilled, and rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally set notifications here based on payload
        state.notifications = action.payload || [];
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
