import React, { useEffect, useRef } from 'react';
import Road from '../entities/Road';

export const RoadCanvas = ({ width, height, offset, gap, dividerHeight, player = { x: 50, y: height - 100, width: 50, height: 70, color: 'red' }}) => {

  const canvasRef    = useRef(null);
  const animationRef = useRef(null);

  const keys         = useRef({ ArrowLeft:  false, ArrowRight: false });
  
  {/* 
    Handle Car movements 
  */}
  const handleKeyUp = (e) => {
    if(e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      e.preventDefault();
      keys.current[e.code] = false;
    }
  };
  const handleKeyDown = (e) => {
    if(e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
      e.preventDefault();
      keys.current[e.code] = true;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const road   = new Road( width, height, offset, gap, dividerHeight, player);

    const animate = () => {
      road.update();
      road.draw(ctx);
      if(keys.current.ArrowLeft && road.player.x > 35) road.player.update(-road.player.speed)
      if(keys.current.ArrowRight && road.player.x + road.player.width < width - 35) road.player.update(road.player.speed);  
      road.player.draw(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup',   handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup',   handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, offset, gap, dividerHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '2px solid white',
        margin: '20px',
        background: 'black'
      }}
    />
  );
};