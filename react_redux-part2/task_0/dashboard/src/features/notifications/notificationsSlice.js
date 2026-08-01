import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
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
});

export const { setNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
