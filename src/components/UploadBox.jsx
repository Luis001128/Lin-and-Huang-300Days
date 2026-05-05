import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function UploadBox({ onImageSelect, selectedImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Only accept images
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  if (selectedImage) {
    return (
      <div 
        className="upload-container glass-panel"
        onClick={() => fileInputRef.current?.click()}
      >
        <img src={selectedImage} alt="Selected" className="uploaded-preview animate-fade-in" />
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>点击重新上传</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />
      </div>
    );
  }

  return (
    <div 
      className={`upload-container glass-panel ${isDragging ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Camera className="upload-icon" />
      <div>
        <h3>上传一张你的正面自拍</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>
          支持拖拽或点击选择文件
        </p>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />
    </div>
  );
}
