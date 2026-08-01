import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

const Notifications = ({ notifications = [], markNotificationAsRead }) => {
  const DrawerRef = useRef(null);

  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      const visibleClass = css(styles.visible);
      DrawerRef.current.classList.toggle(visibleClass);
    }
  };

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>

      <div className={css(styles.notificationsContainer)} ref={DrawerRef}>
        <button
          style={{
            position: 'absolute', right: '2px', top: '2px', cursor: 'pointer',
            background: 'none', border: 'none'
          }}
          aria-label="Close"
          onClick={handleToggleDrawer}
        >
          <img src={closeIcon} alt="close icon" width="10px" />
        </button>

        <p>Here is the list of notifications</p>
        <ul>
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              type={notif.type}
              value={notif.value}
              html={notif.html}
              markAsRead={() => markNotificationAsRead(notif.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    cursor: 'pointer',
    textAlign: 'right',
    fontWeight: 'bold',
    padding: '5px',
  },
  notificationsContainer: {
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.2s ease-in-out',
    position: 'absolute',
    right: '1rem',
    border: '1px dashed #e1484c',
    padding: '1rem',
    backgroundColor: '#fff',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

export default Notifications;
