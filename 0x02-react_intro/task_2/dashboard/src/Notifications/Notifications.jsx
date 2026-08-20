import './Notifications.css';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [] }) {
  const closeNotifications = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notification-items">
      <button
        aria-label="Close"
        type="button"
        onClick={closeNotifications}
        style={{
          float: 'right',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        <img src={closeButton} alt="close" />
      </button>

      <p>Here is the list of notifications</p>

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
    </div>
  );
}

export default Notifications;