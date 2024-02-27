import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import NavigationBar from './components/views/navbar/navbar';
import LoginView from './components/views/login/login-view';
import Display from './components/views/joblisting/job-listing-table';
import TableTopActionBar from './components/views/joblisting/table-top-action-bar';
import Jobs from './components/views/joblisting/empty-jobs';

function App() {
  return (
    <Provider store={store}>
      {/* <NavigationBar /> */}
      {/* <div className="App"> */}
        {/* <LoginView/> */}
        {/* <TableTopActionBar/> */}
        {/* <Route path="/emptyjobs" element={<Jobs />} /> */}

    <Jobs/>

        {/* <Display/> */}
      {/* </div> */}
    </Provider>
  );
}

export default App;
