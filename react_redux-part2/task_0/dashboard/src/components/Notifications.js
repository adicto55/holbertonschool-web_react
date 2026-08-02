import React, { useEffect, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markNotificationAsRead } from '../features/notifications/notificationsSlice';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  const dispatch = useDispatch();
  // We only subscribe to notifications data now, NO visibility state
  const notifications = useSelector((state) => state.notifications.notifications);
  
  // 1. Create a reference to the notification items' container
  const DrawerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // 2. Handler to toggle Aphrodite style on the DOM element directly
  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      // css() generates and injects the class name dynamically. 
      // We toggle this exact class name on our referenced DOM element.
      const visibleClass = css(styles.visible);
      DrawerRef.current.classList.toggle(visibleClass);
    }
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>
      
      {/* 3. Attach ref to the drawer container element */}
      <div ref={DrawerRef} className={css(styles.notificationsContainer)}>
        <button
          style={{ float: 'right', cursor: 'pointer' }}
          aria-label="Close"
          onClick={handleToggleDrawer} // Wired up the new handler
        >
          x
        </button>
        <p>Here is the list of notifications</p>
        <ul>
          {notifications.length === 0 && <li>No new notification for now</li>}
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              id={notif.id}
              type={notif.type}
              value={notif.value}
              html={notif.html}
              markAsRead={() => dispatch(markNotificationAsRead(notif.id))}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuItem: {
    textAlign: 'right',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  notificationsContainer: {
    position: 'absolute',
    right: 0,
    padding: '1rem',
    border: '1px dashed #e1484c',
    backgroundColor: '#fff',
    // Default hidden styles added here:
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.2s ease-in-out',
  },
  // New style object for the visible state
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

export default Notifications;