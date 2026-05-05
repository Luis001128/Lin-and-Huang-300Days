import React, { useEffect, useState } from 'react';

const STAGES = [
  { id: 1, text: "需求解析与 Prompt 扩写... (The Translator)", duration: 2500 },
  { id: 2, text: "图像预处理与光源分析... (Preprocessing)", duration: 3000 },
  { id: 3, text: "基底场景生成中... (Base Scene Generation)", duration: 4000 },
  { id: 4, text: "面部融合与光影重绘... (Integration & Lighting)", duration: 3500 },
];

export default function GenerationProcess({ onComplete }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    let startTime = Date.now();
    let currentStageIndex = 0;

    const runStages = () => {
      const stage = STAGES[currentStageIndex];
      if (!stage) {
        onComplete();
        return;
      }

      setCurrentStage(currentStageIndex);
      
      let animationFrame;
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / stage.duration) * 100, 100);
        setProgress(currentProgress);

        if (currentProgress < 100) {
          animationFrame = requestAnimationFrame(animateProgress);
        } else {
          currentStageIndex++;
          startTime = Date.now();
          setProgress(0);
          timer = setTimeout(runStages, 200); // slight pause between stages
        }
      };

      animationFrame = requestAnimationFrame(animateProgress);

      return () => cancelAnimationFrame(animationFrame);
    };

    runStages();

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="process-container animate-fade-in">
      <div className="process-text">
        <span className="text-gradient">
          {STAGES[currentStage]?.text || "完成！"}
        </span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
        正在使用 Nano Banana 2 引擎进行工业级渲染...
      </p>
    </div>
  );
}
