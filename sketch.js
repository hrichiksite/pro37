//Global Variables

var monkeyMan,jungle;

var bananasGroup,bananaImage;

var obstaclesGroup,obstacleImage;

var score = 0;

var gameState = "play";

function preload() {
  
  jungleImage = loadImage("jungle.jpg");
  
  monkeyManImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkeyManImageEnd = loadImage("Monkey_01.png");
  
  bananaImage = loadImage("Banana.png");
  
  obstaclesImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  
  jungle = createSprite(300,150,600,300);
  jungle.addImage("jungle",jungleImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = 5;
  
  monkeyMan = createSprite(500,250,50,50);
  monkeyMan.addAnimation("monkey",monkeyManImage);
  monkeyMan.scale = 0.15;
  
  //monkeyMan.debug = true;

  monkeyMan.setCollider("rectangle",100,0,400,600);

  ground = createSprite(600,295,600,5);
  ground.visible = false;
  
  bananasGroup = new Group();
  
  obstaclesGroup = new Group();
}


function draw(){
 background(255);
 
  camera.position.x = monkeyMan.x;
  //camera.position.y = monkeyMan.y;

  //monkeyMan.velocityX = -10;

  //ground.x = ground.x - 10;
  
  if(gameState === "play") {
  
  if (keyDown("space") && monkeyMan.y>217) {
  
    monkeyMan.velocityY = -13;
  }
  
  monkeyMan.velocityY = monkeyMan.velocityY+0.9
  
  if (monkeyMan.isTouching(bananasGroup)) {
  
   score = score+2;
   bananasGroup.destroyEach();
    

    switch(score) {

      case 6 : monkeyMan.scale = 0.17;
        break;
      case 12: monkeyMan.scale = 0.19;
        break;
      case 18: monkeyMan.scale = 0.21;
        break;
      case 24: monkeyMan.scale = 0.23;
        break;
      case 30: monkeyMan.scale = 0.25;
        break;
    }
  }
  
  
  if(monkeyMan.isTouching(obstaclesGroup)) {
  
    monkeyMan.scale =0.15;

    //gameState = "end";
    
    obstaclesGroup.destroyEach();
  }

  if(jungle.x>700){
    jungle.x = jungle.width/2;
    }
    
    monkeyMan.collide(ground)
  
    spawnObstacles();
    spawnBananas();
} 

/*
  if(gameState === "end"){
  
    bananasGroup.destroyEach();
    obstaclesGroup.destroyEach();
    
    score = 0;
    
    jungle.x = jungle.width/2;

    monkeyMan.collide(ground)

    monkeyMan.scale = 0.15;
  }
*/
 
 drawSprites();
  
  stroke("white");
  textSize(21);
  fill("white");
  text("Score: " + score,500,50);
}


function spawnBananas() {
  
  if (frameCount%80 === 0) {
    
     var banana = createSprite(monkeyMan.x-300,175,20,20);
     banana.addImage(bananaImage);
     
     banana.y = Math.round(random(150,175));
     banana.velocityX = 10;
     banana.scale = 0.05;
     
     banana.lifetime = 100;
     
     //banana.debug = true;
     
     banana.setCollider("circle",0,0,500);
     
     banana.addToGroup(bananasGroup);
  }
}


function spawnObstacles() {
  
  if (frameCount%300 === 0) {
    
     var obstacles = createSprite(monkeyMan.x-300,270,20,20);
     obstacles.addImage(obstaclesImage);
     
     obstacles.velocityX = 10;
     obstacles.scale = 0.15;
     
     obstacles.lifetime = 100;
     
     //obstacles.debug = true;
     
     obstacles.setCollider("circle",30,0,150);
     
     obstaclesGroup.add(obstacles);
  }
}