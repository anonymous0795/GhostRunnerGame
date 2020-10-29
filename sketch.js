var tower,towerImage;
var doorImage,doorGroup;
var climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var spookySound;

function preload(){
    towerImage=loadImage("tower.png");
    doorImage=loadImage("door.png");
    climberImage=loadImage("climber.png");
    ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}
function setup (){
    createCanvas(600,600); 
  spookySound.loop();
    tower=createSprite(300,300,300,300);
    tower.addImage(towerImage);
    tower.velocityY=1;
  
    doorGroup=new Group();
    climberGroup=new Group();

   ghost=createSprite(300,300,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  invisibleBlockGroup=new Group();
}
function draw(){
    background("black");
   if(gameState===PLAY){
        if(tower.y>400){
          tower.y=300;
        }
        if(keyDown("left_arrow")){
          ghost.x=ghost.x-3;
        }
      if(keyDown(RIGHT_ARROW)){
          ghost.x=ghost.x+3;
        }
      if(keyDown("space")){
        ghost.velocityY=-5;
      }
      ghost.velocityY=ghost.velocityY+0.8;
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }
      if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
        ghost.destroy();
        gameState=END;
      }
        spawnDoors();
        drawSprites();
   }
  else if(gameState===END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER!!",220,300);
  }
}
function spawnDoors(){
   if(frameCount%240===0){
      var door=createSprite(200,50,50,50);
     var climber=createSprite(200,100,10,10);
     invisibleBlock=createSprite(200,105);
     invisibleBlock.height=2;
     invisibleBlock.width=climber.width;
      door.x=Math.round(random(120,400));
     climber.x=door.x;
     invisibleBlock.x=door.x;
     door.velocityY=1;
     climber.velocityY=1
     invisibleBlock.velocityY=1;
     door.lifetime=600;
     climber.lifetime=600
     door.addImage(doorImage);
     climber.addImage(climberImage);
     doorGroup.add(door);
     climberGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
     invisibleBlock.debug=true
     door.depth=ghost.depth;        
     ghost.depth=ghost.depth+1;
   }
}
