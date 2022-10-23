import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
import TestKspark from './page/TestKspark/TestKspark';
import Intro from './page/Intro/Intro';
<<<<<<< HEAD
=======
import Main from './page/Main/Main';
import { useEffect, useState } from 'react';
import axios from "axios";
import Overview from './page/Overview/Overview';

const App = () => {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    console.log(sessionStorage.getItem('session_id'));
    if (sessionStorage.getItem("session_id") === null) setisAuth(false);  // 로그인 안될 때만 수정.
    else {
      axios.get(process.env.REACT_APP_BACK_API + "/api/session/check", {
        params: { session_id: sessionStorage.getItem('session_id') }
      }, { withCredentials: true }).then(res => {
          console.log(res.data);
          if ("err_msg" in res.data) setisAuth(false);
          else setisAuth(true);
      });
    }
  }, []);
>>>>>>> 13d7fa5ba24e4c4fe9c25b9a751150a0e06dbc8f

  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path = "/" element={<ReactMain />} />
        <Route path = "/intro" element={<Intro />} />
        <Route path = "/test" element={<TestKspark />} />
=======
        <Route 
          path="/"
          element={
            <AuthRoutes auth={!isAuth} component={<Intro />} redirect="/overview" />
          }
        />
        <Route 
          path="/overview"
          element={
            <AuthRoutes auth={isAuth} component={<Overview />} redirect="/" />
          }
        />
        <Route path="/dashboard" element={<Main />} />
>>>>>>> 13d7fa5ba24e4c4fe9c25b9a751150a0e06dbc8f
      </Routes>
    </BrowserRouter>
  );
}

export default App;
