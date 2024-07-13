// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HistoryProvider } from './context/HistoryContext';
import CurrencyConverter from './CurrencyConverter';
import HistoryPage from './pages/HistoryPage';
import About from './pages/About';
import './App.css';


const App = () => {
  return (
    <HistoryProvider>
      <Router>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/history">Conversion History</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<CurrencyConverter />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </HistoryProvider>
  );
};

export default App;
