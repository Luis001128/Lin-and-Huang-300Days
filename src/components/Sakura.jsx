import React, { useEffect, useRef } from 'react';

const Sakura = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let petals = [];
    const numPetals = 45; // 樱花花瓣数量

    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    const handleMouseMove = (e) => {
      mouseSpeedX = e.clientX - prevMouseX;
      mouseSpeedY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', handleMouseMove);

    class Petal {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h - h; // 初始化在屏幕上方随机高度
        this.vx = Math.random() * 1.5 - 0.75;
        this.vy = Math.random() * 1.5 + 1;
        this.size = Math.random() * 6 + 6;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 3 - 1.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;

        // 鼠标排斥互动效果
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          // 加上鼠标滑动的方向动量，产生被风吹走的感觉
          this.vx += (mouseSpeedX * 0.05) - (dx * 0.02);
          this.vy += (mouseSpeedY * 0.05) - (dy * 0.02);
        }

        // 空气阻力和最大速度限制
        if (this.vx > 3) this.vx *= 0.9;
        if (this.vx < -3) this.vx *= 0.9;
        if (this.vy > 4) this.vy *= 0.9;
        if (this.vy < 0.5) this.vy += 0.05; // 保证慢慢下落

        // 滑出屏幕边缘则重置到上方
        if (this.y > h + this.size) {
          this.y = -this.size;
          this.x = Math.random() * w;
          this.vx = Math.random() * 1.5 - 0.75;
          this.vy = Math.random() * 1.5 + 1;
        }
        if (this.x > w + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = w + this.size;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        // 柔和的粉色渐变
        const gradient = ctx.createLinearGradient(0, -this.size, 0, this.size);
        gradient.addColorStop(0, 'rgba(255, 183, 197, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 204, 213, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        // 绘制樱花花瓣形状
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size/1.5, -this.size/1.5, -this.size, this.size/2.5, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size/2.5, this.size/1.5, -this.size/1.5, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < numPetals; i++) {
      petals.push(new Petal());
    }

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 鼠标速度衰减
      mouseSpeedX *= 0.9;
      mouseSpeedY *= 0.9;

      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50 // 放在背景之上，内容之下
      }} 
    />
  );
};

export default Sakura;
