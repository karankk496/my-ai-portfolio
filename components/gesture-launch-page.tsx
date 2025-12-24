import { useState, useEffect, useRef, useCallback } from 'react';
import Portfolio from './portfolio';

export default function GestureLaunchPage() {
  const [phase, setPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [trails, setTrails] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);
  const [time, setTime] = useState('00:00:00');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartX = useRef(0);
  const trailId = useRef(0);
  const rippleId = useRef(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toTimeString().slice(0, 8));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading progress effect
  useEffect(() => {
    if (phase < 3) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  // Transition to portfolio after unlock
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        setShowPortfolio(true);
      }, 2000); // Show success animation for 2 seconds before transitioning
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    trailId.current++;
    setTrails(prev => [...prev.slice(-15), { 
      id: trailId.current, 
      x, 
      y, 
      size: Math.random() * 6 + 3,
      color: Math.random() > 0.5 ? '#00f0ff' : '#bf00ff'
    }]);

    if (isDragging) {
      const progress = Math.min(Math.max((e.clientX - dragStartX.current) / 200, 0), 1);
      setDragProgress(progress);
      if (progress >= 1) {
        setIsUnlocked(true);
        setIsDragging(false);
      }
    }
  }, [isDragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePos({ x, y });

    if (isDragging) {
      const progress = Math.min(Math.max((touch.clientX - dragStartX.current) / 200, 0), 1);
      setDragProgress(progress);
      if (progress >= 1) {
        setIsUnlocked(true);
        setIsDragging(false);
      }
    }
  }, [isDragging]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    rippleId.current++;
    const newRipple = { id: rippleId.current, x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  }, []);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isUnlocked) return;
    e.stopPropagation();
    setIsDragging(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX || 0;
    dragStartX.current = clientX;
  };  const handleDragEnd = () => {
    if (dragProgress < 1) {
      setDragProgress(0);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-15));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5
    }));

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 10, 0.12)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach(p => {
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120 && dist > 0) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;

        const alpha = dist < 120 ? 0.6 : 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.fill();
      });

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(other => {
          const d = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2);
          if (d < 70) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - d / 70) * 0.1})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [mousePos]);

  if (showPortfolio) {
    return (
      <div className="animate-fadeIn">
        <Portfolio />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: 'linear-gradient(135deg, #030308 0%, #0a0a12 50%, #050510 100%)' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Ambient Glow */}
      <div className="absolute pointer-events-none" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(191, 0, 255, 0.04) 40%, transparent 70%)',
        zIndex: 3
      }} />

      {/* Mouse Trail */}
      {trails.map((trail, i) => (
        <div
          key={trail.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: trail.x - trail.size / 2,
            top: trail.y - trail.size / 2,
            width: trail.size,
            height: trail.size,
            background: trail.color,
            opacity: (i / trails.length) * 0.5,
            boxShadow: `0 0 ${trail.size}px ${trail.color}`,
            zIndex: 100
          }}
        />
      ))}

      {/* Click Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{ left: ripple.x, top: ripple.y, zIndex: 99 }}
        >
          {[100, 70, 40].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: -size,
                top: -size,
                width: size * 2,
                height: size * 2,
                border: `1px solid ${['#00f0ff', '#bf00ff', '#00f0ff'][i]}`,
                animation: `rippleExpand 0.8s ease-out ${i * 0.08}s forwards`,
                opacity: 0
              }}
            />
          ))}
        </div>
      ))}

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4" style={{ zIndex: 10 }}>

        {/* Top Status */}
        <div className={`absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 sm:gap-3" style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(9px, 2vw, 11px)',
            color: '#00f0ff',
            letterSpacing: '3px'
          }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-animation" />
            <span>INTERACTIVE MODE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-animation-delayed" />
          </div>
        </div>

        {/* Corner Frames */}
        {phase >= 1 && (
          <>
            {/* Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 opacity-40">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-cyan-400" />
            </div>
            {/* Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 opacity-40">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-cyan-400" />
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 opacity-40">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-cyan-400" />
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 opacity-40">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-cyan-400" />
            </div>
          </>
        )}

        {/* Central Core */}
        <div className={`relative transition-all duration-1000 ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>

          <div className="relative" style={{
            width: 'clamp(200px, 50vw, 300px)',
            height: 'clamp(200px, 50vw, 300px)'
          }}>
            {/* Outer Ring */}
            <div 
              className="absolute inset-0 rounded-full spin-slow"
              style={{
                border: '1px dashed rgba(0, 240, 255, 0.3)'
              }}
            />
            {/* Middle Ring */}
            <div 
              className="absolute rounded-full spin-reverse"
              style={{
                top: '10%', left: '10%', right: '10%', bottom: '10%',
                border: '1px solid rgba(191, 0, 255, 0.4)'
              }}
            />

            {/* Inner Ring */}
            <div 
              className="absolute rounded-full pulse-fast"
              style={{
                top: '20%', left: '20%', right: '20%', bottom: '20%',
                border: '2px solid rgba(0, 240, 255, 0.5)'
              }}
            />
            {/* Core Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="rounded-full pulse-slow"
                style={{
                  width: '40%',
                  height: '40%',
                  background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, rgba(191,0,255,0.1) 50%, transparent 70%)'
                }}
              />
            </div>

            {/* Hexagon Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                viewBox="0 0 100 100" 
                className="spin-fast"
                style={{ 
                  width: '35%', 
                  height: '35%'
                }}
              >
                <polygon
                  points="50,10 85,30 85,70 50,90 15,70 15,30"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 8px #00f0ff)' }}
                />
                <polygon
                  points="50,22 73,36 73,64 50,78 27,64 27,36"
                  fill="rgba(0, 240, 255, 0.1)"
                  stroke="#bf00ff"
                  strokeWidth="1"
                />
              </svg>

              {/* Center Point */}
              <div 
                className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white pulse-center"
                style={{ 
                  boxShadow: '0 0 15px #fff, 0 0 30px #00f0ff'
                }}
              />
            </div>

            {/* Orbiting Particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 'clamp(4px, 1vw, 6px)',
                  height: 'clamp(4px, 1vw, 6px)',
                  top: '50%',
                  left: '50%',
                  background: i % 2 === 0 ? '#00f0ff' : '#bf00ff',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#00f0ff' : '#bf00ff'}`,
                  animation: `orbit ${10 + i * 2}s linear infinite`,
                  animationDelay: `${i * -1.5}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Slide to Enter Section */}
        <div className={`mt-8 sm:mt-12 transition-all duration-1000 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

          {!isUnlocked ? (
            <div>
              {/* Instruction Text */}
              <div className="text-center mb-4" style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(9px, 2vw, 11px)',
                letterSpacing: '4px',
                color: 'rgba(255,255,255,0.4)'
              }}>
                SLIDE TO CONTINUE
              </div>

              {/* Slider Track */}
              <div
                className="relative mx-auto"
                style={{
                  width: 'clamp(220px, 60vw, 280px)',
                  height: '50px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  borderRadius: '25px',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  overflow: 'hidden'
                }}
              >
                {/* Progress Fill */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${dragProgress * 100}%`,
                  background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.2), rgba(191, 0, 255, 0.2))',
                  transition: isDragging ? 'none' : 'width 0.3s ease-out'
                }} />

                {/* Arrow Indicators */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        opacity: 0.3 - i * 0.08,
                        animation: `arrowPulse 1.5s ease-in-out ${i * 0.2}s infinite`
                      }}
                    >
                      <path d="M9 6l6 6-6 6" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ))}
                </div>

                {/* Drag Handle */}
                <div
                  className="absolute top-1 bottom-1 cursor-grab active:cursor-grabbing flex items-center justify-center"
                  style={{
                    left: `${dragProgress * 100}%`,
                    transform: 'translateX(-50%)',
                    width: '48px',
                    background: 'linear-gradient(135deg, #00f0ff, #bf00ff)',
                    borderRadius: '24px',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                    transition: isDragging ? 'none' : 'left 0.3s ease-out'
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Shimmer */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  pointerEvents: 'none'
                }} className="shimmer" />
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(10px, 2.5vw, 13px)',
                letterSpacing: '5px',
                color: '#00ffaa',
                marginBottom: '16px',
                textShadow: '0 0 20px rgba(0, 255, 170, 0.5)'
              }}>
                {loadingProgress < 100 ? 'INITIALIZING...' : 'SYSTEM READY'}
              </div>

              {loadingProgress < 100 ? (
                <div className="space-y-4">
                  <div className="relative w-64 h-2 mx-auto bg-black/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(8px, 1.5vw, 10px)',
                    letterSpacing: '2px',
                    color: '#00f0ff',
                    opacity: 0.7
                  }}>
                    LOADING... {Math.round(loadingProgress)}%
                  </div>
                </div>
              ) : (
                <div className="animate-fadeInUp">
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    letterSpacing: '4px',
                    color: '#ffffff',
                    marginBottom: '20px',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
                  }}>
                    ACCESS GRANTED
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(8px, 1.5vw, 10px)',
                    letterSpacing: '3px',
                    color: '#00f0ff',
                    marginBottom: '24px',
                    opacity: 0.8
                  }}>
                    WELCOME TO MY PORTFOLIO
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status */}
      <div className={`absolute bottom-3 sm:bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 transition-all duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{
        fontFamily: 'monospace',
        fontSize: 'clamp(8px, 2vw, 10px)',
        letterSpacing: '2px',
        color: '#00f0ff',
        zIndex: 20
      }}>
        <span className="opacity-60">SYS.ONLINE</span>
        <span style={{ color: '#333' }}>•</span>
        <span>{time}</span>
        <span style={{ color: '#333' }}>•</span>
        <span style={{ color: '#bf00ff' }} className="opacity-60">v2.0</span>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .spin-slow {
          animation: spin 25s linear infinite;
        }
        .spin-reverse {
          animation: spin 18s linear infinite reverse;
        }
        .pulse-fast {
          animation: pulse 3s ease-in-out infinite;
        }
        .pulse-slow {
          animation: pulse 2.5s ease-in-out infinite;
        }
        .spin-fast {
          animation: spin 40s linear infinite;
        }
        .shimmer {
          animation: shimmer 2.5s infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes rippleExpand {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(clamp(80px, 20vw, 120px)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(clamp(80px, 20vw, 120px)) rotate(-360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.2; transform: translateX(0); }
          50% { opacity: 0.4; transform: translateX(3px); }
        }
        `
      }} />
    </div>
  );
}