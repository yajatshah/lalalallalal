/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, cowboy_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1,obstacle2;

var score=0;

var gameOver, restart;
var cowboyImg
var iGround


function preload(){
  cowboyImg = loadAnimation("cowboy_1.png","cowboy_2.png","cowboy_3.png","cowboy_4.png")
  cowboy_collided = loadImage("cowboy_2.png")
  jungleImage = loadImage("assets/bg.png");
  obstacel1Img = loadImage("assets/stone.png")
  obstacle2Img = loadImage("assets/monster1img.png")
  obstacle3Img = loadImage("assets/kimg.png")
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");

  

}

function setup() {
  createCanvas(800, 400);


  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  cowboy = createSprite(50,300,20,50)
  cowboy.addAnimation("running",cowboyImg)

  cowboy.scale = 0.25;

iGround = createSprite(400,350,1600,10)
iGround.visible = false


      
  shrubsGroup = new Group();

obstaclesGroup = new Group()


}

function draw() {
  background(255);
  
 // kangaroo.x=camera.position.x-270;
 if (gameState===PLAY)
 {
   jungle.velocityX = -3
  if(jungle.x<100){
    jungle.x = 400 
  }
  if(keyDown("SPACE")&& cowboy.y>170){
    cowboy.velocityY = -5
  }
  
  cowboy.velocityY += 0.8


  cowboy.collide(iGround)
enemy();
shrubs();
if(obstaclesGroup.isTouching(cowboy)){
  gameState = END
}
if (shrubsGroup.isTouching(cowboy)){
  score+=1
  shrubGroup.destroyEach()
}

 }
 else if(gameState===END)
 {
cowboy.velocityY=0
jungle.velocityX=0
obstaclesGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
cowboy.changeImage("collided",cowboy_collided)
shrubsGroup.setVelocityXEach(0);
shrubsGroup.setLifetimeEach(-1);
 }
  drawSprites();

 
}
function enemy(){
  
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,320,10,40);
    
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacel1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      default: break;
    
  }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);


}
}
function shrubs()
{
if(frameCount % 60 === 0) {
  var shrub = createSprite(camera.position.x+500,330,40,10);

  shrub.velocityX = -(6 + 3*score/100)
  shrub.scale = 0.6;

  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: shrub.addImage(shrub1);
            break;
    case 2: shrub.addImage(shrub2);
            break;
    case 3: shrub.addImage(shrub3);
            break;
    default: break;
  }
  
  //assign scale and lifetime to the shrub           
  shrub.scale = 0.05;
   //assign lifetime to the variable
  shrub.lifetime = 400;
  
  shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
  //add each cloud to the group
  shrubsGroup.add(shrub);
  

}
}