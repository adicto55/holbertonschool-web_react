import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../features/notifications/notificationsSlice';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  const dispatch = useDispatch();
  
  // Only subscribe to the notifications array. No displayDrawer state anymore.
  const notifications = useSelector((state) => state.notifications.notifications);
  
  // 1. Create a reference to the notification items' container
  const DrawerRef = useRef(null);

  // 2. Handler to toggle Aphrodite style on the DOM element directly
  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      // css() generates the class name and injects the styles into the document
      const visibleClass = css(styles.visible);
      
      // Use classList to strictly bypass React's render cycle
      DrawerRef.current.classList.toggle(visibleClass);
    }
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>
      
      {/* 3. Attach ref to the drawer element */}
      <div ref={DrawerRef} className={css(styles.notificationsContainer)}>
        <button
          style={{ float: 'right', cursor: 'pointer', background: 'none', border: 'none' }}
          aria-label="Close"
          onClick={handleToggleDrawer}
        >
          x
        </button>
        <p>Here is the list of notifications</p>
        <ul>
          {(!notifications || notifications.length === 0) && (
            <li>No new notification for now</li>
          )}
          {notifications && notifications.map((notif) => (
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
    // Default hidden styles exactly as requested:
    opacity: 0,
    visibility: 'hidden',
  },
  // New style object exactly named "visible":
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

export default Notifications;
