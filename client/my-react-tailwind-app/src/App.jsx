import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionDashboard from './components/TransactionDashboard';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TransactionDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
