import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Notes from './pages/Notes';
import QuizSetup from './pages/QuizSetup';
import QuizEngine from './pages/QuizEngine';
import QuizReview from './pages/QuizReview';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/quiz-setup" element={<QuizSetup />} />
          <Route path="/quiz-engine" element={<QuizEngine />} />
          <Route path="/quiz-review" element={<QuizReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
