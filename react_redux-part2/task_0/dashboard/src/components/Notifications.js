import React, { useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

const Notifications = ({ listNotifications, markNotificationAsRead }) => {
  const DrawerRef = useRef(null);

  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      DrawerRef.current.classList.toggle(css(styles.visible));
    }
  };

  return (
    <div className="Notifications-wrapper">
      <div className={`menuItem ${css(styles.menuItem)}`} onClick={handleToggleDrawer}>
        Your notifications
      </div>

      <div className={`Notifications ${css(styles.notificationsContainer)}`} ref={DrawerRef}>
        <button
          style={{
            position: 'absolute', right: '3px', top: '3px', cursor: 'pointer',
            background: 'none', border: 'none', outline: 'none'
          }}
          aria-label="Close"
          id="closeNotifications"
          onClick={handleToggleDrawer}
        >
          <img src={closeIcon} alt="close icon" width="10px" />
        </button>

        {listNotifications && listNotifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ul)}>
              {listNotifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                  markAsRead={() => markNotificationAsRead(notif.id)}
                />
              ))}
            </ul>
          </>
        ) : (
          <p>No new notification for now</p>
        )}
      </div>
    </div>
  );
};

Notifications.propTypes = {
  listNotifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    value: PropTypes.string,
    html: PropTypes.shape({
      __html: PropTypes.string,
    }),
  })),
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  listNotifications: [],
  markNotificationAsRead: () => {},
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
    zIndex: 100,
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
  }
});

export default React.memo(Notifications);
