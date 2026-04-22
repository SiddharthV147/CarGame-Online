import React, { useEffect, useRef } from 'react'
import Entity from '../engine/Entity';
import { detectCollision } from '../engine/collision';

const CanvasBoard = () => {

  const userDisabled = useRef(false);
  const botDisabled  = useRef(false);

  const gameOver     = useRef(false);
  const canvasRef    = useRef(null);
  const animationRef = useRef(null);
  const roadOffset   = useRef(0);

  const speed        = 5;
  const dividers     = [150, 300, 450];

  {/* 
      Bot and User Car settings 
  */}
  const keys = useRef({
    ArrowLeft:  false,
    ArrowRight: false
  });

  {/* 1
      Bot and User Car settings 
  */}
  const carBot  = useRef(new Entity(30, 470, 90, 120, 'red'));
  const userCar = useRef(new Entity(480, 470, 90, 120, 'blue'));

  const botUpdate = {
    left:  false,
    right: false
  };

  const entities  = [];

  {/* 
      Handle Canvas 
  */}
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 

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
      if(e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        keys.current[e.code] = true;
      }
    }

    const updatePositionUser = (cxt, car) => {
      if(keys.current.ArrowLeft)  car.x -= speed;
      if(keys.current.ArrowRight) car.x += speed;
      
      if(car.x < 30) car.x = 30;
      if(car.x > canvas.width - car.width - 30) car.x = canvas.width - car.width - 30; 

      drawCar(cxt, car);
    }

    const updatePositionBot = (cxt, car) => {
      if(botUpdate.left)  car.x -= speed;
      if(botUpdate.right) car.x += speed;
      
      if(car.x < 30) car.x = 30;
      if(car.x > canvas.width - 30) car.x = canvas.width - 30;

      drawCar(cxt, car);
    }

    {/* 
        Handle Road Rendering 
    */}
    const render = () => {

      if(!gameOver) return;

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
      updatePositionUser(context, userCar.current);
      updatePositionBot(context,  carBot.current);

      let entities = [userCar.current, carBot.current];
      let collisions = detectCollision(entities);
      if(collisions.length > 0) {
        let point = collisions[0];
        drawCollisionPoint(context, point);
        return;
      }

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
      ref={canvasRef} width={600} height={620} style={{ border: '2px solid white' }} 
    />
  )
}

export default CanvasBoard;