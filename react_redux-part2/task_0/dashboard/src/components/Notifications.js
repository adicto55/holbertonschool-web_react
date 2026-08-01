import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../assets/close-icon.png';
import {
  selectNotifications,
  markNotificationAsRead,
} from '../features/notifications/notificationsSlice';

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  div: {
    border: '1px dashed black',
    padding: '10px',
    position: 'absolute',
    right: '10px',
    top: '55px',
    background: '#fff',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: '5px 0',
  },
  urgentLi: {
    color: 'red',
  },
  defaultLi: {
    color: 'blue',
  },
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    width: '15px',
  },
});

function Notifications() {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  const handleToggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.classList.toggle(css(styles.visible));
    }
  };

  const markAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <>
      <div
        className={css(styles.menuItem)}
        onClick={handleToggleDrawer}
        id="menuItem"
      >
        Your notifications
      </div>
      <div className={css(styles.div)} ref={drawerRef} id="Notifications">
        <img
          src={closeIcon}
          className={css(styles.closeIcon)}
          onClick={handleToggleDrawer}
          alt="close"
        />
        {notifications.length === 0 ? (
          <p>No new notification for now</p>
        ) : (
          <>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ul)}>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  data-priority={notification.type}
                  className={css(
                    styles.li,
                    notification.type === 'urgent'
                      ? styles.urgentLi
                      : styles.defaultLi
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.value || notification.html}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Notifications;