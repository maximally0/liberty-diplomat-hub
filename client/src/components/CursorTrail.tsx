import { useEffect, useState } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
}

export const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    let trailId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      };
      
      setTrails(prev => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute w-3 h-3 rounded-full animate-ping"
          style={{
            left: trail.x,
            top: trail.y,
            background: `linear-gradient(135deg, 
              ${index % 2 === 0 ? '#A78BFA' : '#F472B6'} 0%, 
              ${index % 2 === 0 ? '#F472B6' : '#60A5FA'} 100%)`,
            opacity: 0.6 - index * 0.08,
            transform: `translate(-50%, -50%) scale(${1 - index * 0.1})`,
            animationDuration: '0.8s',
          }}
        />
      ))}
    </div>
  );
};
