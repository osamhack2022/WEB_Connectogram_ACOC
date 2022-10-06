import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactMain from './React-main';
import TestKspark from './page/TestKspark/TestKspark';
import Intro from './page/Intro/Intro';
import Main from './page/Main/Main';

function App() {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Main />}>
          <Route path="/army" element={<Main />} />
        </Route>
        
        <Route path="/intro" element={<Intro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
