import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { questionsData } from '../data/questions';
import { Clock, XCircle, CheckCircle } from 'lucide-react';

export default function QuizEngine() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapter = 1, count = 5 } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // stores { questionId, selectedAnswer, isCorrect }

  // Initialize questions
  useEffect(() => {
    const chapterQuestions = questionsData.filter(q => q.chapter === chapter);
    // Shuffle and pick
    const shuffled = [...chapterQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, count));
  }, [chapter, count]);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0 || showExplanation) return;
    
    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showExplanation, questions]);

  const handleTimeOut = () => {
    setSelectedAnswer('TIMEOUT');
    setShowExplanation(true);
    recordAnswer('TIMEOUT', false);
  };

  const handleSelectOption = (option) => {
    if (showExplanation) return;
    const answerLetter = option.charAt(0);
    const isCorrect = answerLetter === questions[currentIndex].correctAnswer;
    setSelectedAnswer(answerLetter);
    setShowExplanation(true);
    recordAnswer(answerLetter, isCorrect);
  };

  const recordAnswer = (answer, isCorrect) => {
    const currentQ = questions[currentIndex];
    setUserAnswers(prev => [...prev, {
      question: currentQ,
      selectedAnswer: answer,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      // Navigate to review
      navigate('/quiz-review', { state: { results: userAnswers, totalQuestions: questions.length } });
    }
  };

  if (questions.length === 0) return <div className="container text-center">Memuatkan soalan...</div>;

  const currentQ = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <div className="comic-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock color={timeLeft <= 5 ? 'var(--secondary)' : 'var(--text-dark)'} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft <= 5 ? 'var(--secondary)' : 'var(--text-dark)' }}>
            {timeLeft}s
          </span>
        </div>
        <div className="comic-card" style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
          Soalan {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="comic-card mb-8">
        <h2 className="mb-4" style={{ fontSize: '1.5rem' }}>{currentQ.question}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((opt, i) => {
            const optLetter = opt.charAt(0);
            let bgColor = 'white';
            let color = 'var(--text-dark)';
            
            if (showExplanation) {
              if (optLetter === currentQ.correctAnswer) {
                bgColor = 'var(--success)';
                color = 'white';
              } else if (optLetter === selectedAnswer) {
                bgColor = 'var(--secondary)';
                color = 'white';
              }
            } else if (selectedAnswer === optLetter) {
              bgColor = 'var(--primary)';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                disabled={showExplanation}
                className="comic-button"
                style={{
                  justifyContent: 'flex-start',
                  backgroundColor: bgColor,
                  color: color,
                  textTransform: 'none',
                  textAlign: 'left'
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {showExplanation && (
        <div className="comic-card mb-4" style={{ backgroundColor: 'var(--bg-color)', borderStyle: 'dashed' }}>
          <div className="flex-center mb-2" style={{ gap: '0.5rem' }}>
            {selectedAnswer === 'TIMEOUT' ? (
              <><Clock color="var(--secondary)" /> <h3 style={{ color: 'var(--secondary)' }}>Masa Tamat!</h3></>
            ) : isCorrect ? (
              <><CheckCircle color="var(--success)" /> <h3 style={{ color: 'var(--success)' }}>Tepat Sekali!</h3></>
            ) : (
              <><XCircle color="var(--secondary)" /> <h3 style={{ color: 'var(--secondary)' }}>Kurang Tepat</h3></>
            )}
          </div>
          <p className="text-center"><strong>Penerangan:</strong> {currentQ.explanation}</p>
          <div className="text-center mt-4">
            <button onClick={handleNext} className="comic-button tertiary">
              {currentIndex < questions.length - 1 ? 'Soalan Seterusnya' : 'Lihat Keputusan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
