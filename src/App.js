import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage'
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import NavbarSection from './Components/NavbarSection';
import NotFound from './Components/NotFound';
import './App.css'
import Admin from './Components/Admin';
import Create from './Components/AdminComponents/Create';
import AdminLogin from './Components/AdminLogin';
import EditUser from './Components/AdminComponents/EditUser';

const App = () => {

  return (
    <div className="App">
      <NavbarSection/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/create-user' element={<Create/>}/>
        <Route path='/editUser/:id' element={<EditUser/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
