import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
import TestKspark from './page/TestKspark/TestKspark';
import Intro from './page/Intro/Intro';
import Main from './page/Main/Main';
import { useEffect, useState } from 'react';
import axios from "axios";

const App = () => {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    axios.get("/api/session/check", {
        key: process.env.REACT_APP_APIKEY,
    }, { withCredentials: true }).then(res => {
        if (res.data !== "") setisAuth(true);
    });
  }, []);

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
