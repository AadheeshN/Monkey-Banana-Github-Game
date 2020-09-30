var backroundImage,background1, monkey, monkeyRunning, ground,groundImage;

var bananaGroup, bananaImage, obstacleGroup, obstacleImage;

var gameOverImage;

var score = 0;


function preload(){
  backgroundImage = loadImage("jungle2.jpg");
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  background1 = createSprite(0,0,800,400);
  background1.addImage("BackgroundAnimation", backgroundImage);
  background1.scale = 1.5;
  background1.x = background1.width/2;
  background1.velocityX = -4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("moving", monkeyRunning);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  if(background1.x < 100){
    background1.x = background1.width/2;
  }
  
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 2;
      monkey.scale = monkey.scale + 0.005;
    }
  
  
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  
    spawnFood();
    spawnObstacles();
 
    if (obstacleGroup.isTouching(monkey)) { 
      obstacleGroup.destroyEach();
        monkey.scale = 0.08;
        score = score - 1;
    }
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  if (frameCount % 150 === 0) {
    
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 315;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}
