import React, { useState } from 'react';
import { Download, Share2, RotateCcw, Clapperboard } from 'lucide-react';

export default function ResultView({ onReset, originalImage, resultImage }) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="result-container animate-fade-in">
      <div className="clapperboard-frame">
        <div className="clapperboard-header"></div>
        <div style={{ position: 'relative' }}>
          <img 
            src={showOriginal ? originalImage : resultImage} 
            alt="Generated Result" 
            className="result-image"
          />
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'rgba(0,0,0,0.7)',
            padding: '5px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Outfit',
            fontSize: '0.9rem'
          }}>
            <Clapperboard size={16} color="var(--accent-magenta)" />
            <span>SCENE 1 - TAKE 1</span>
          </div>
        </div>
      </div>
      
      <div className="action-bar">
        <button 
          className="btn-primary" 
          onClick={() => setShowOriginal(!showOriginal)}
          style={{ background: showOriginal ? 'var(--accent-magenta)' : 'var(--panel-bg)', color: '#fff' }}
        >
          {showOriginal ? '查看成片' : '按住对比原图'}
        </button>
        <button className="btn-primary btn-magenta">
          <Download size={18} /> 保存高清大图
        </button>
        <button className="btn-primary" style={{ background: 'var(--panel-bg)', color: '#fff' }}>
          <Share2 size={18} />
        </button>
        <button className="btn-primary" onClick={onReset} style={{ background: 'var(--panel-bg)', color: '#fff' }}>
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
