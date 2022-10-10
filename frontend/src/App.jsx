import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
import TestKspark from './page/TestKspark/TestKspark';
import Intro from './page/Intro/Intro';
import Main from './page/Main/Main';
import { useEffect, useState } from 'react';

const App = () => {
  const isAuth = sessionStorage.getItem("Auth");

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <AuthRoutes auth={!isAuth} component={<Intro />} redirect="/dashboard" />
          }
        />
        <Route 
          path="/dashboard"
          element={
            <AuthRoutes auth={isAuth} component={<Main />} redirect="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
