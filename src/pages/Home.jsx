import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, Trophy } from 'lucide-react';

export default function Home() {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('sains_high_score');
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
  }, []);

  return (
    <div className="container text-center">
      <h1 className="comic-title mb-4" style={{ fontSize: '3rem', color: 'var(--primary)' }}>Sains KSSM Tingkatan 4</h1>
      <p className="mb-8" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Mari mula belajar dan uji minda anda!</p>

      <div className="flex-center mb-8">
        <div className="comic-card flex-center" style={{ gap: '1rem', backgroundColor: 'var(--success)' }}>
          <Trophy size={32} color="white" />
          <div>
            <h3 style={{ color: 'white', textTransform: 'uppercase', margin: 0 }}>Markah Tertinggi</h3>
            <p style={{ color: 'white', fontSize: '2rem', fontWeight: 900, margin: 0 }}>{highScore}%</p>
          </div>
        </div>
      </div>

      <div className="grid-2 mt-8">
        <div className="comic-card">
          <BookOpen size={48} className="mb-4" color="var(--tertiary)" />
          <h2 className="comic-title mb-4" style={{ color: 'var(--tertiary)', WebkitTextStroke: '0px' }}>Nota Padat</h2>
          <p className="mb-4">Ulang kaji topik-topik penting Bab 1 hingga Bab 12 dengan nota dan video tutorial.</p>
          <Link to="/notes" className="comic-button tertiary">Buka Nota</Link>
        </div>

        <div className="comic-card">
          <BrainCircuit size={48} className="mb-4" color="var(--secondary)" />
          <h2 className="comic-title mb-4" style={{ color: 'var(--secondary)', WebkitTextStroke: '0px' }}>Uji Minda</h2>
          <p className="mb-4">Cabar diri anda dengan set soalan berformat SPM dan pemasa 30 saat!</p>
          <Link to="/quiz-setup" className="comic-button secondary">Mula Kuiz</Link>
        </div>
      </div>
    </div>
  );
}
