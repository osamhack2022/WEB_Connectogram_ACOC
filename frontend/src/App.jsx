import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ReactMain from './React-main';
import TestKspark from './page/TestKspark/TestKspark';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<ReactMain />} />
        <Route path = "/test" element={<TestKspark />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
