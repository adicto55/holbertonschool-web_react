import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({
  displayDrawer = false,
  notifications = [],
}) {
  return (
    <>
      <div className="notification-title">
        Your notifications
      </div>

      {displayDrawer && (
        <div className="notification-items">
          <button
            aria-label="Close"
            style={{
              float: 'right',
              background: 'none',
              cursor: 'pointer',
            }}
            type="button"
          >
            <img src="/close-button.png" alt="close" />
          </button>

          <p>Here is the list of notifications</p>

          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      html: PropTypes.object,
    })
  ),
};

export default Notifications;