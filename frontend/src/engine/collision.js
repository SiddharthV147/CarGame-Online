export function detectCollision(entities) {

  const collisions = [];
  
  for(let i = 0; i < entities.length; i++) {
    for(let j = i + 1; j < entities.length; j++) {
      
    const a = entities[i];
    const b = entities[j];

    if(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) {
        
        const overlapX      = Math.max(a.x, b.x);
        const overlapY      = Math.max(a.y, b.y);
        const overlapWidth  = Math.min(a.x + a.width, b.x + b.width) - overlapX;
        const overlapHeight = Math.min(a.y + a.height, b.y + b.height) - overlapY;
        collisions.push({
            a,
            b,
            x:      overlapX,
            y:      overlapY,
            width:  overlapWidth,
            height: overlapHeight
        });
    }
  }
}

  return collisions;
}