import { Fragment } from 'react';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Notifications />
      <Login />
      <Footer />
    </Fragment>
  );
}

export default App;