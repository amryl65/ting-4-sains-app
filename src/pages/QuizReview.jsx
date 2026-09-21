import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Home, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export default function QuizReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results = [], totalQuestions = 0 } = location.state || {};
  const [grade, setGrade] = useState('');
  const [scorePercentage, setScorePercentage] = useState(0);

  useEffect(() => {
    if (results.length === 0) {
      navigate('/');
      return;
    }

    const correctCount = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    setScorePercentage(percentage);

    // Calculate SPM Grade
    let currentGrade = 'G';
    if (percentage >= 90) currentGrade = 'A+';
    else if (percentage >= 80) currentGrade = 'A';
    else if (percentage >= 70) currentGrade = 'A-';
    else if (percentage >= 65) currentGrade = 'B+';
    else if (percentage >= 60) currentGrade = 'B';
    else if (percentage >= 50) currentGrade = 'C+';
    else if (percentage >= 45) currentGrade = 'C';
    else if (percentage >= 40) currentGrade = 'D';
    else if (percentage >= 35) currentGrade = 'E';
    
    setGrade(currentGrade);

    // Save to localStorage if it's a new high score
    const savedScore = localStorage.getItem('sains_high_score');
    if (!savedScore || percentage > parseInt(savedScore, 10)) {
      localStorage.setItem('sains_high_score', percentage.toString());
    }
  }, [results, totalQuestions, navigate]);

  if (results.length === 0) return null;

  const correctCount = results.filter(r => r.isCorrect).length;

  return (
    <div className="container">
      <div className="comic-card text-center mb-8" style={{ backgroundColor: 'var(--tertiary)', color: 'white' }}>
        <h1 className="comic-title mb-4" style={{ fontSize: '2.5rem' }}>Keputusan Kuiz</h1>
        <div className="flex-center" style={{ gap: '2rem' }}>
          <div>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>Markah</p>
            <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 900 }}>{scorePercentage}%</h2>
            <p>({correctCount} / {totalQuestions} Betul)</p>
          </div>
          <div>
            <p style={{ fontSize: '1.2rem', margin: 0 }}>Gred SPM</p>
            <h2 style={{ fontSize: '4rem', margin: 0, fontWeight: 900, color: 'var(--primary)', WebkitTextStroke: '2px black' }}>{grade}</h2>
          </div>
        </div>
      </div>

      <div className="flex-center mb-8" style={{ gap: '1rem' }}>
        <Link to="/quiz-setup" className="comic-button">
          <RotateCcw size={20} /> Cuba Lagi
        </Link>
        <Link to="/" className="comic-button success">
          <Home size={20} /> Utama
        </Link>
      </div>

      <h2 className="comic-title mb-4" style={{ color: 'var(--text-dark)', WebkitTextStroke: '0px' }}>Semakan Soalan</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {results.map((result, index) => (
          <div key={index} className="comic-card" style={{ borderLeft: result.isCorrect ? '8px solid var(--success)' : '8px solid var(--secondary)' }}>
            <div className="flex-between mb-2">
              <h3 style={{ fontSize: '1.2rem', flex: 1 }}>Soalan {index + 1}: {result.question.question}</h3>
              {result.isCorrect ? <CheckCircle color="var(--success)" size={32} /> : <XCircle color="var(--secondary)" size={32} />}
            </div>
            
            <div className="mb-2">
              <strong>Jawapan Anda: </strong>
              <span style={{ color: result.isCorrect ? 'var(--success)' : 'var(--secondary)', fontWeight: 'bold' }}>
                {result.selectedAnswer === 'TIMEOUT' ? 'Masa Tamat' : result.selectedAnswer}
              </span>
            </div>
            
            {!result.isCorrect && (
              <div className="mb-2">
                <strong>Jawapan Sebenar: </strong>
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{result.question.correctAnswer}</span>
              </div>
            )}

            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <strong>Penerangan:</strong> {result.question.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
