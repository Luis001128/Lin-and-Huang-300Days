import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Sakura from './components/Sakura';

// 心形照片墙坐标映射（8列 x 7行），正好 40 个格子
const heartGridPositions = [
  { r: 1, c: 2 }, { r: 1, c: 3 }, { r: 1, c: 6 }, { r: 1, c: 7 },
  { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 }, { r: 2, c: 6 }, { r: 2, c: 7 }, { r: 2, c: 8 },
  { r: 3, c: 1 }, { r: 3, c: 2 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 5 }, { r: 3, c: 6 }, { r: 3, c: 7 }, { r: 3, c: 8 },
  { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 }, { r: 4, c: 7 }, { r: 4, c: 8 },
  { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 6 }, { r: 5, c: 7 },
  { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 }, { r: 6, c: 6 },
  { r: 7, c: 4 }, { r: 7, c: 5 },
];

const photos = [
  { id: 1, src: '/assets/photos/Asakusa Beauty.JPG', caption: 'Asakusa Beauty' },
  { id: 2, src: '/assets/photos/Kitty掏空小黄钱包.jpeg', caption: 'Kitty掏空小黄钱包' },
  { id: 3, src: '/assets/photos/再也不相信三立鸥了.jpeg', caption: '再也不相信三立鸥了' },
  { id: 4, src: '/assets/photos/再见了妈妈今晚我就要远航.jpeg', caption: '再见了妈妈今晚我就要远航' },
  { id: 5, src: '/assets/photos/可爱女人和她的香香蛋糕.PNG', caption: '可爱女人和她的香香蛋糕' },
  { id: 6, src: '/assets/photos/和小黄一起看的东钱湖日出.jpeg', caption: '和小黄一起看的东钱湖日出' },
  { id: 7, src: '/assets/photos/和米老鼠.jpeg', caption: '和米老鼠' },
  { id: 8, src: '/assets/photos/在井冈山和小黄视频.PNG', caption: '在井冈山和小黄视频' },
  { id: 9, src: '/assets/photos/小黄生日and我的圣诞礼物.jpeg', caption: '小黄生日and我的圣诞礼物' },
  { id: 10, src: '/assets/photos/小黄的专属搬运工.jpeg', caption: '小黄的专属搬运工' },
  { id: 11, src: '/assets/photos/小黄的镰仓漫步.jpeg', caption: '小黄的镰仓漫步' },
  { id: 12, src: '/assets/photos/小黄陪我过生日.jpeg', caption: '小黄陪我过生日' },
  { id: 13, src: '/assets/photos/小黄鱼眼.jpeg', caption: '小黄鱼眼' },
  { id: 14, src: '/assets/photos/小黄（濒死版）.jpeg', caption: '小黄（濒死版）' },
  { id: 15, src: '/assets/photos/小黄，手拿把掐.JPG', caption: '小黄，手拿把掐' },
  { id: 16, src: '/assets/photos/布丁美女.JPG', caption: '布丁美女' },
  { id: 17, src: '/assets/photos/带小黄逛水族馆.jpeg', caption: '带小黄逛水族馆' },
  { id: 18, src: '/assets/photos/幸运的富士山！.JPG', caption: '幸运的富士山！' },
  { id: 19, src: '/assets/photos/我拍的最好看的小黄.jpeg', caption: '我拍的最好看的小黄' },
  { id: 20, src: '/assets/photos/截屏2026-05-05 19.03.03.png', caption: '截屏2026-05-05 19.03.03' },
  { id: 21, src: '/assets/photos/抓捕宝可梦.jpeg', caption: '抓捕宝可梦' },
  { id: 22, src: '/assets/photos/杰拉多云.jpeg', caption: '杰拉多云' },
  { id: 23, src: '/assets/photos/林瀚云云云云云云.jpeg', caption: '林瀚云云云云云云' },
  { id: 24, src: '/assets/photos/消失的小黄.jpeg', caption: '消失的小黄' },
  { id: 25, src: '/assets/photos/看看大鼻孔！.jpeg', caption: '看看大鼻孔！' },
  { id: 26, src: '/assets/photos/真假Labubu.jpeg', caption: '真假Labubu' },
  { id: 27, src: '/assets/photos/老父亲视角.jpeg', caption: '老父亲视角' },
  { id: 28, src: '/assets/photos/萌萌嘟.jpeg', caption: '萌萌嘟' },
  { id: 29, src: '/assets/photos/谁家好人这样打乒乓球.jpeg', caption: '谁家好人这样打乒乓球' },
  { id: 30, src: '/assets/photos/谢谢小黄把我拍这么帅.JPG', caption: '谢谢小黄把我拍这么帅' },
  { id: 31, src: '/assets/photos/连狗狗都喜欢的美女姐姐.jpeg', caption: '连狗狗都喜欢的美女姐姐' },
  { id: 32, src: '/assets/photos/道具比人帅系列.JPG', caption: '道具比人帅系列' },
  { id: 33, src: '/assets/photos/邪恶范伟lhy被打了.JPG', caption: '邪恶范伟lhy被打了' },
  { id: 34, src: '/assets/photos/醉师傅吃成唐人了.jpeg', caption: '醉师傅吃成唐人了' },
  { id: 35, src: '/assets/photos/陪小黄逃学.jpeg', caption: '陪小黄逃学' },
  { id: 36, src: '/assets/photos/隅田川的合照.jpeg', caption: '隅田川的合照' },
  { id: 37, src: '/assets/photos/顶着我头盔的海豚.jpeg', caption: '顶着我头盔的海豚' },
  { id: 38, src: '/assets/photos/黄光头？.PNG', caption: '黄光头？' },
  { id: 39, src: '/assets/photos/黄冰馨（企鹅版）.jpeg', caption: '黄冰馨（企鹅版）' },
  { id: 40, src: '/assets/photos/黑老大出街.jpeg', caption: '黑老大出街' },
];

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // 音乐播放状态
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 尝试自动播放音乐
  useEffect(() => {
    const tryAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          // 浏览器可能会拦截没有用户交互的自动播放
          console.log('自动播放被浏览器拦截，需要用户手动点击播放。', err);
          setIsPlaying(false);
        }
      }
    };
    // 给一点延迟确保元素挂载
    setTimeout(tryAutoplay, 500);
  }, []);

  // 计时器状态
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // 彩蛋机制：连续点击副标题3次打开情书
  const [clickCount, setClickCount] = useState(0);
  const [showLetter, setShowLetter] = useState(false);

  // 点击撒爱心特效
  const [clickHearts, setClickHearts] = useState([]);

  useEffect(() => {
    // 设置相爱的起点时间：2025年7月11日 00:00:00
    const startDate = new Date('2025-07-11T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeTogether({ days, hours, minutes, seconds });
      }
    };

    updateTimer(); // 初始调用
    const timerId = setInterval(updateTimer, 1000); // 每秒更新

    return () => clearInterval(timerId); // 清除计时器
  }, []);

  // 处理全屏点击撒爱心
  const handleScreenClick = (e) => {
    // 如果点在关闭按钮上就不触发
    if (e.target.className === 'close-btn' || e.target.closest('.music-player')) return;

    const newHearts = Array.from({length: 8}).map((_, i) => {
      const angle = (Math.PI * 2 / 8) * i;
      const dx = Math.cos(angle) * 80;
      const dy = Math.sin(angle) * 80;
      return {
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        dx: `${dx}px`,
        dy: `${dy}px`
      };
    });

    setClickHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => !newHearts.includes(h)));
    }, 1000);
  };

  // 处理彩蛋点击
  const handleSubtitleClick = (e) => {
    e.stopPropagation();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowLetter(true);
      setClickCount(0); // 重置
    }
  };

  // 处理音乐播放
  const toggleMusic = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="app-container" onClick={handleScreenClick}>
      {/* 樱花飘落效果背景 */}
      <Sakura />

      {/* 撒爱心特效渲染 */}
      {clickHearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart" 
          style={{ 
            left: heart.x, 
            top: heart.y,
            '--dx': heart.dx,
            '--dy': heart.dy
          }}
        >
          💖
        </div>
      ))}

      {/* 音乐播放器 */}
      <audio ref={audioRef} src="/assets/bgm.mp3" autoPlay loop />
      <div className={`music-player ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
        <div className="vinyl-record">
          <div className="vinyl-center"></div>
        </div>
        <span className="music-note">🎵</span>
      </div>

      {/* 头部区域 */}
      <header className="hero-section">
        <h1 className="hero-title">和小黄的300 Days</h1>
        {/* 隐藏的彩蛋触发器：连续点击3次这句话 */}
        <p className="hero-subtitle" onClick={handleSubtitleClick} style={{ cursor: 'pointer' }}>
          我们在一起的第 300 天 💖
        </p>
        
        {/* 相爱计时器 */}
        <div className="love-counter">
          我们已相爱：
          <span>{timeTogether.days}</span> 天 
          <span>{timeTogether.hours}</span> 小时 
          <span>{timeTogether.minutes}</span> 分钟 
          <span>{timeTogether.seconds}</span> 秒
        </div>
      </header>

      {/* 心形照片墙 */}
      <div className="heart-wall-container">
        <div className="heart-grid">
          {photos.map((photo, index) => {
            const pos = heartGridPositions[index];
            if (!pos) return null;

            return (
              <div 
                key={photo.id} 
                className="heart-item" 
                style={{ gridRow: pos.r, gridColumn: pos.c }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <img src={photo.src} alt={photo.caption} className="photo-image" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 照片大图弹窗 Modal */}
      <div className={`modal-overlay ${selectedPhoto ? 'open' : ''}`} onClick={() => setSelectedPhoto(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelectedPhoto(null)}>×</button>
          {selectedPhoto && (
            <>
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} className="modal-image" />
              <p className="modal-caption">{selectedPhoto.caption}</p>
            </>
          )}
        </div>
      </div>

      {/* 情书彩蛋 Modal */}
      <div className={`modal-overlay letter-modal ${showLetter ? 'open' : ''}`} onClick={() => setShowLetter(false)}>
        <div className="letter-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowLetter(false)}>×</button>
          <h2>💌 给小黄的一封信</h2>
          <div className="letter-text">
            <p>To 我的黄豆豆：</p>
            <p>300天快乐宝宝！我这几天一直在想，要送个什么礼物给你比较好，既有纪念意义，可以长期留存，又是专属于我们俩的玩意。后来我看到这个AI智能体，就想到做一个网页记录一下我们的第一个300天，虽然没有很专业、很精致，但是每个细节都是我用心想的。</p>
            <p>说实话，我一开始没想到我们能在一起这么久，我怕你嫌弃我矮，怕你知道我真是的模样之后会讨厌我，但是每一次我很难受很崩溃的时候，你都会抱抱我，让我相信我自己。</p>
            <p>虽然每次让你说你喜欢我，你总是声音很小，但是我知道，你很喜欢我。想说的话真的很多，但一写信的时候就不知道怎么说出口了。</p>
            <p>我很想和你出去玩，去日本、景德镇、广东......或者说，我希望未来我的每一段旅程里都有你。</p>
            <p>其实我不是很有耐心带女生拍照，但是每次帮你拍照的时候我都很开心，因为我觉得你真的很漂亮。我也想我拍的每张照片里，都能有你在。</p>
            <p>马上我们都要为了找工作而努力咯，虽然很难，但我相信我们都会有一个最好的结果。我会好好克制自己的脾气，也希望宝宝你可以监督我、督促我。</p>
            <p>不管怎样，我都会一直喜欢你，不论是开心还是难过，都一直守在你身边。五月愉快！爱你宝宝。</p>
            <p style={{textAlign: 'right', marginTop: '20px'}}>大号睿睿<br/>2026.5.5</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
