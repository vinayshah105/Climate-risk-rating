import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './Map';
import Decades from './Decades';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Map />} />
        <Route path="/decades/:decadesId" exact element={<Decades />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
