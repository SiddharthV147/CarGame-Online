import React, { useEffect, useRef } from 'react'
import Entity from '../engine/Entity';

export const Simulator = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const roadOffset   = useRef(0);

  const speed        = 5;
  const dividers     = [150, 300];

  const lanes = [75, 225, 375];
  const currentLane = useRef(1); 

  const carBot  = useRef(new Entity(180, 490, 90, 120, 'red'));
  const keys = useRef({
    ArrowLeft:  false,
    ArrowRight: false
  });


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

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
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault(); 
      }
      if (e.repeat) return;

      if (e.code === 'ArrowLeft') {
        currentLane.current = Math.max(0, currentLane.current - 1);
      }
      if (e.code === 'ArrowRight') {
        currentLane.current = Math.min(lanes.length - 1, currentLane.current + 1);
      }
    };
    
    const updatePositionBot = (cxt, car) => {
      const targetX = lanes[currentLane.current] - car.width / 2;

      if (Math.abs(targetX - car.x) < speed) {
        car.x = targetX; 
      } else if (car.x < targetX) {
        car.x += speed;
      } else if (car.x > targetX) {
        car.x -= speed;
      }

      drawCar(cxt, car);
    };

    {/* 
        Handle Road Rendering 
    */}
    const render = () => {

      const dash          = 30;
      const gap           = 15;
      const cycle         = dash + gap;
      context.fillStyle   = 'black';
      
      roadOffset.current  = (roadOffset.current + 2) % cycle;
      
      context.strokeStyle = 'white';
      context.lineWidth   = 2;
      context.setLineDash([]);
      context.fillRect(0, 0, canvas.width, canvas.height);

      for(const col of dividers) {
        for (let y = -dash + roadOffset.current; y < canvas.height; y += cycle) {
          context.beginPath();
          context.moveTo(col, y);
          context.lineTo(col, y + dash);
          context.stroke();
        }
      }
      context.setLineDash([]); 
      updatePositionBot(context,  carBot.current);

      animationRef.current = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup',   handleKeyUp);
    
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup',   handleKeyUp);
        cancelAnimationFrame(animationRef.current);
      };
  }, []);
  
  const drawCar = (cxt, ent) => {
    const cornerRadius = 15; 
    cxt.fillStyle      = ent.color;
    cxt.lineWidth      = 2;

    cxt.beginPath();
    cxt.roundRect(ent.x, ent.y, ent.width, ent.height, cornerRadius);
    cxt.fill();

    cxt.stroke(); 
    cxt.closePath();
  };

  const drawCollisionPoint = (ctx, collision) => {
    const centerX = collision.x + collision.width / 2;
    const centerY = collision.y + collision.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  };
  return (
    <canvas 
      ref={canvasRef} width={450} height={695} style={{ border: '2px solid white' }} 
    />
  )
}
