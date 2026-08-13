import './Notifications.css';
import closeButton from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        />
      </ul>
    </div>
  );
}

export default Notifications;