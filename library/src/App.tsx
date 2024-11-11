import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookShelf from './pages/BookShelf'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookShelf />} />
      </Routes>
    </Router>
  );
};


export default App;
