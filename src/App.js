import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/Admin';
import Engineer from './pages/Engineer';
import Customer from './pages/Customer';
import Notfound from './pages/Notfound';
import RequireAuth from './components/RequireAuth';
import Unauth from './pages/Unauthorized';


import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/coreui/dist/js/coreui.min.js';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css';

const ROLES={
  'CUSTOMER':'CUSTOMER',
  'ENGINEER':'ENGINEER',
  'ADMIN':'ADMIN'
}
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<RequireAuth allowedroles={[ROLES.ADMIN]} />}> 
            <Route path='/admin' element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedroles={[ROLES.ENGINEER]}/>}>
            <Route path='/engineer'element={<Engineer />} />
            </Route>
            <Route element={<RequireAuth allowedroles={[ROLES.CUSTOMER]}/>}>
            <Route path='/customer' element={<Customer />} />
            </Route>
            <Route path='/*' element={<Notfound />} />
            <Route path='/unauthorized'  element={<Unauth />} />
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
