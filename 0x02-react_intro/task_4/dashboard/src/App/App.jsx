import { Fragment } from 'react';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';

function App() {
  const isLoggedIn = false;

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
      value: getLatestNotification(),
      html: {
        __html: getLatestNotification(),
      },
    },
  ];

  const coursesList = [
    {
      id: 1,
      name: 'ES6',
      credit: 60,
    },
    {
      id: 2,
      name: 'Webpack',
      credit: 20,
    },
    {
      id: 3,
      name: 'React',
      credit: 40,
    },
  ];

  return (
    <Fragment>
      <Header />
      <Notifications notifications={notificationsList} />

      {isLoggedIn ? (
        <CourseList courses={coursesList} />
      ) : (
        <Login />
      )}

      <Footer />
    </Fragment>
  );
}

export default App;