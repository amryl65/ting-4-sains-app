import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';

export default function QuizSetup() {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [questionCount, setQuestionCount] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz-engine', { state: { chapter: selectedChapter, count: questionCount } });
  };

  return (
    <div className="container">
      <Link to="/" className="comic-button mb-8" style={{ padding: '0.5rem 1rem' }}>
        <ArrowLeft size={20} /> Kembali
      </Link>

      <div className="comic-card text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="comic-title mb-8" style={{ color: 'var(--secondary)' }}>Tetapan Kuiz</h2>

        <div className="mb-8">
          <h3 className="mb-4">Pilih Bab:</h3>
          <div className="flex-center" style={{ gap: '1rem' }}>
            {[1, 2, 3].map(chap => (
              <button
                key={chap}
                onClick={() => setSelectedChapter(chap)}
                className="comic-button"
                style={{
                  backgroundColor: selectedChapter === chap ? 'var(--primary)' : 'white',
                  color: 'var(--text-dark)'
                }}
              >
                Bab {chap}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4">Jumlah Soalan:</h3>
          <div className="flex-center" style={{ gap: '1rem' }}>
            {[5, 10].map(count => (
              <button
                key={count}
                onClick={() => setQuestionCount(count)}
                className="comic-button"
                style={{
                  backgroundColor: questionCount === count ? 'var(--tertiary)' : 'white',
                  color: questionCount === count ? 'white' : 'var(--text-dark)'
                }}
              >
                {count} Soalan
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleStart} className="comic-button success" style={{ width: '100%' }}>
          Mula Kuiz <Play size={20} fill="white" />
        </button>
      </div>
    </div>
  );
}
