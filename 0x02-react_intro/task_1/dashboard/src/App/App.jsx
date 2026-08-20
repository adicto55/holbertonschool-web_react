import { Fragment } from 'react';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils';

function App() {
  const notificationsList = [
    {
      id: 1,
      type: 'default',
      value: 'New course available',
    },
    {
      id: 2,
      type: 'urgent',
      value: 'New resume available',
    },
    {
      id: 3,
      type: 'urgent',
      html: getLatestNotification(),
    },
  ];

  return (
    <Fragment>
      <Header />
      <Notifications notifications={notificationsList} />
      <Login />
      <Footer />
    </Fragment>
  );
}

export default App;