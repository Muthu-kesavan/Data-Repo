import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import RefreshToken from './pages/RefreshToken.jsx';
import CreateProject from './pages/CreateProject.jsx';
import ViewProject from './pages/ViewProject.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}/>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/manager' element={<ManagerDashboard />}/>
          <Route path='/create' element={<CreateProject />} />
          <Route path='/view' element={<ViewProject />} />
          <Route path="/refresh-token" element={<RefreshToken />} /> 
        </Routes>
    </Router>
  );
};

export default App;
