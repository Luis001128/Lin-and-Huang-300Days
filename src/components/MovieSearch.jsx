import React from 'react';
import { Film } from 'lucide-react';

const MOVIES = [
  { id: 'interstellar', name: '《星际穿越》', image: '/movie_interstellar.png' },
  { id: 'fastfurious', name: '《速度与激情》', image: '/movie_fastfurious.png' },
  { id: 'pirates', name: '《加勒比海盗》', image: '/movie_pirates.png' },
  { id: 'avengers', name: '《复仇者联盟》', image: '/movie_avengers.png' }
];

export default function MovieSearch({ value, onChange }) {
  return (
    <div className="search-container animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h3 style={{ marginBottom: '15px', fontWeight: '400', color: 'var(--text-secondary)' }}>选择剧组</h3>
      <div className="movie-grid">
        {MOVIES.map(movie => (
          <div 
            key={movie.id}
            className={`movie-card ${value === movie.id ? 'active' : ''}`}
            onClick={() => onChange(movie.id)}
          >
            <Film className="movie-icon" size={20} />
            <span>{movie.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
