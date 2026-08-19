import { Fragment } from 'react';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />

      <div className="root-notifications">
        <Notifications />
      </div>

      <Login />

      <Footer />
    </Fragment>
  );
}

export default App;