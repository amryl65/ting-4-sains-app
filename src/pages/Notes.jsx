import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notesData } from '../data/notes';
import { ArrowLeft, Video } from 'lucide-react';

export default function Notes() {
  const [selectedChapter, setSelectedChapter] = useState(notesData[0]);

  return (
    <div className="container">
      <Link to="/" className="comic-button mb-8" style={{ padding: '0.5rem 1rem' }}>
        <ArrowLeft size={20} /> Kembali
      </Link>

      <h1 className="comic-title mb-8" style={{ color: 'var(--tertiary)', fontSize: '2.5rem' }}>Nota Padat</h1>

      <div className="grid-2 mb-8">
        {notesData.map((note) => (
          <button 
            key={note.chapter}
            onClick={() => setSelectedChapter(note)}
            className={`comic-card ${selectedChapter.chapter === note.chapter ? 'active' : ''}`}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              backgroundColor: selectedChapter.chapter === note.chapter ? 'var(--tertiary)' : 'white',
              color: selectedChapter.chapter === note.chapter ? 'white' : 'var(--text-dark)'
            }}
          >
            <h3 style={{ margin: 0 }}>Bab {note.chapter}</h3>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{note.title}</p>
          </button>
        ))}
      </div>

      <div className="comic-card">
        <h2 className="mb-4" style={{ color: 'var(--secondary)' }}>Bab {selectedChapter.chapter}: {selectedChapter.title}</h2>
        
        <div className="mb-8" style={{ border: 'var(--border-thick)', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'black' }}>
          <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem', color: 'white' }}>
            <Video size={48} />
            <p>Video Tutorial Placeholder (Bab {selectedChapter.chapter})</p>
            {/* 
            <iframe 
              width="100%" 
              height="300" 
              src={selectedChapter.videoPlaceholder} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
            */}
          </div>
        </div>

        <div>
          {selectedChapter.sections.map((section, idx) => (
            <div key={idx} className="mb-4" style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '2px solid var(--text-dark)' }}>
              <h3 className="mb-2">{section.heading}</h3>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
