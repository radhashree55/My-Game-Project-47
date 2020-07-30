var bgimg,astroimg,rockimg,rockflyimg,astronaut,rocket,asteroid,astrofly,astroflyimg,astgroup;
var satelite,satgroup,bull,bulletgrp,flag,ice1,ice2,ice3,ice4,ice5,dome,domeimg;
var gameState = "Stage1";
var score = 0;
var bullets = 20;
var icescore = 0;
let img;
let positions=[];

function preload(){
  bgimg = loadImage("background.jpg");
  astroimg = loadImage("astronaut.png");
  rockimg = loadImage("rocket.static.png");
  rockflyimg = loadImage("rocket.flying.png");
  ast1 = loadImage("asteroid1.png");
  ast2 = loadImage("asteroid2.png");
  ast3 = loadImage("asteroid3.png");
  earth = loadImage("earth.png");
  astroflyimg = loadImage("astro.sit.png");
  sat1 = loadImage("sat1.png");
  sat2 = loadImage("sat2.png");
  sat3 = loadImage("sat3.png");
  bulletimg = loadImage("bull.png");
  flagimg = loadImage("flag.png");
  iceimg = loadImage("ice.png");
  domeimg = loadImage("dome.png");

// image texture from http://planetpixelemporium.com/
  img = loadImage('earth.png');
}

function setup() {
  createCanvas(1200,600);

  astronaut = createSprite(50,500,50,50);
  astronaut.addImage(astroimg);
  astronaut.scale = 0.15;

  rocket = createSprite(600,400,50,50);
  rocket.addImage("standing",rockimg);
  rocket.addImage("flying",rockflyimg);
  rocket.setCollider("rectangle",0,0,50,100);
  rocket.scale = 2;

  astrofly = createSprite(10,300,50,50);
  astrofly.addImage(astroflyimg);
  astrofly.setCollider("rectangle",10,10,10,10);
  astrofly.scale = 0.2;
  astrofly.velocityX = 1;
  astrofly.visible = false;
  
  flag = createSprite(1610,90,20,20);
  flag.addImage("flagimg",flagimg);
  flag.scale = 0.3;
  flag.visible = false;

  ice1 = createSprite(1800,250,20,20);
  ice1.addImage("iceimg",iceimg);
  ice1.scale = 1;
  ice1.visible = false;
  ice1.setCollider("rectangle",10,10,10,10);
  
  ice2 = createSprite(2200,500,20,20);
  ice2.addImage("iceimg",iceimg);
  ice2.scale = 1;
  ice2.visible = false;
  ice2.setCollider("rectangle",10,10,10,10);
  
  ice3 = createSprite(2600,250,20,20);
  ice3.addImage("iceimg",iceimg);
  ice3.scale = 1;
  ice3.visible = false;
  ice3.setCollider("rectangle",10,10,10,10);
  
  ice4 = createSprite(3000,350,20,20);
  ice4.addImage("iceimg",iceimg);
  ice4.scale = 1;
  ice4.visible = false;
  ice4.setCollider("rectangle",10,10,10,10);
  
  ice5 = createSprite(3400,450,20,20);
  ice5.addImage("iceimg",iceimg);
  ice5.scale = 1;
  ice5.visible = false;
  ice5.setCollider("rectangle",10,10,10,10);

  dome = createSprite(720,115,30,30);
  dome.addImage("domeimg",domeimg);
  dome.scale = 0.65;
  dome.visible = false;
  dome.setCollider("rectangle",0,0,30,30);
  
  astgroup = createGroup();
  satgroup = createGroup();
  bulletgrp = createGroup();

  for (let i=0; i<100; i++){
    positions.push([random(-250,230), random(-250,230),random(-8,12) ])
  }
}

function draw() {
  background(bgimg);

  // STAGE 1
  if(gameState==="Stage1"){
    fill(0,255,255);
    stroke(0);
    textSize(22);
    text("SCORE: "+score,10,25);

    fill(255,200,0);
    textSize(21);
    text("The Rocket's about to leave !! Press the Right Arrow to take off !!",340,20);

    if(keyDown(RIGHT_ARROW)){
      astronaut.x += 10;
      text("You're about to face a massive Asteroid Attack ! Watch Out !",360,65);
    }
    if(astronaut.isTouching(rocket)){
      rocket.changeImage("flying",rockflyimg);
      astronaut.visible = false;
      rocket.velocityY = -7;
    }
    if(rocket.y<0){
      rocket.destroy();
      bgimg = loadImage("space.jpg");
      score += 780; //score +=50;
      gameState ="Stage2";
    }
  }
  // STAGE 2 
  if(gameState==="Stage2"){
    image(img,50,height/2,200,200);
    
    camera.on();
    camera.position.x = astrofly.x;
    camera.position.y = height/2;

    astrofly.visible = true;
    spawnAsteroids();

    fill(0,255,255);
    stroke(0);
    textSize(22);
    text("SCORE: "+score,astrofly.x-600,23); 
    
    if(score < 450){
      fill(255,0,0); 
      textSize(20);
      text("Use UP & DOWN ARROW keys to find your way out, AVOID the ASTEROIDS",astrofly.x-350,22);
    }
    if(keyDown(UP_ARROW)){
      astrofly.y = astrofly.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      astrofly.y = astrofly.y+10;
    } 
    if(astrofly.y<0 || astrofly.y>600){
      text("Stay in the Zone",width/2,height/2);
    }
    if(astrofly.isTouching(astgroup)){
      score = score-20;
      textSize(30);
      text("OUCH !",astrofly.x-250,astrofly.y);
    }
    else{score = score+1}
     
    if(score>=800){
      gameState="Stage3";
    }
 
    // STAGE OVER
    if(score<50){
      gameState = "over";
    }
    if(gameState==="over"){
      bgimg = loadImage("gameover.jpg");
      astgroup.destroyEach();
    }
  }

  // STAGE 3
  if(gameState==="Stage3"){
    astgroup.destroyEach();
    bgimg = loadImage("space2.jpg");

    astrofly.velocityX = 0;
    astrofly.y = mouseY;

    fill(0,255,255);
    stroke(0);
    textSize(22);
    text("SCORE: "+score,astrofly.x-600,22);
    text("BULLETS: "+bullets,astrofly.x-600,44);

    fill(175,130,160);
    textSize(20);
    text("MISSION:Destroy the Neighbouring Country's Spying Satellites by pressing SPACE & Moving Cursor.",astrofly.x-400,22);
    
    spawnSat();
    
    if(keyWentDown("SPACE")){
      bullet();
      bullets = bullets-1;
    }

    for (var l = 0; l < satgroup.length; l++) {
      mysprite =  satgroup.get(l);
      if(mysprite.isTouching(bulletgrp)){
        for (var n = 0; n < bulletgrp.length; n++) {
          mybull =  bulletgrp.get(n);
          mysprite.destroy();
          mybull.destroy();
          score+=701; //score+=50;
        }
      }
    } 
   
    if(astrofly.isTouching(satgroup)){
      score = score-20;
    }

    if(World.seconds>700){
      if(score<750){
        gameState = "over";
      }    
    }
    if(score<750 || bullets<0){
      gameState = "over";
    }
    if(gameState=="over"){
      bgimg=loadImage("gameover.jpg");
      satgroup.destroyEach();
    }
    if(score >1500){
      gameState ="Stage4";
    }
  }

    // STAGE 4  
    if(gameState==="Stage4"){
      camera.on();
      camera.position.x = astronaut.x;
      camera.position.y = height/2;//astronaut.y;

      fill(0,255,255);
      stroke(0);
      textSize(22);
      text("SCORE: "+score,100,50);
      text("SAMPLES COLLECTED: "+icescore,100,70);
      fill(255,255,0);
      textSize(20);
      text("Collect samples of ICE for research and take them back to the DOME",100,250);
      text("Use ARROW keys to move around",100,270);

      satgroup.destroyEach();
      bulletgrp.destroyEach();

      bgimg = loadImage("moongrd.jpg");

      astrofly.visible = false;
      astronaut.visible = true;
      flag.visible = true;
      ice1.visible = true;
      ice2.visible = true;
      ice3.visible = true;
      ice4.visible = true;
      ice5.visible = true;
      dome.visible = true;
      
      if(keyDown(LEFT_ARROW)){
        astronaut.x = astronaut.x-10;
      }
      if(keyDown(RIGHT_ARROW)){
        astronaut.x = astronaut.x+10;
      } 
      if(keyDown(UP_ARROW)){
        astronaut.y = astronaut.y-10;
      }
      if(keyDown(DOWN_ARROW)){
        astronaut.y = astronaut.y+10;
      }
      if(astronaut.isTouching(ice1)){
        score+=50
        icescore+=1;
        ice1.destroy();
      }
      if(astronaut.isTouching(ice2)){
        score+=50
        icescore+=1;
        ice2.destroy();
      }
      if(astronaut.isTouching(ice3)){
        score+=50
        icescore+=1;
        ice3.destroy();
      }
      if(astronaut.isTouching(ice4)){
        score+=50
        icescore+=1;
        ice4.destroy();
      }
      if(astronaut.isTouching(ice5)){
        score+=50
        icescore+=1;
        ice5.destroy();
      }
      if(icescore===5){
        textSize(30);
        text("All samples collected,Go Back To The DOME",3000,astronaut.y);
      }
      if(icescore===5 && astronaut.isTouching(dome)){
        gameState = "Complete";
      }
    }
    //Stage Complete

    if(gameState==="Complete"){
      dome.destroy();
      astronaut.destroy();
      bgimg=loadImage("done.jpg");

      fill(255);
      stroke("red");
      textSize(30);
      text("SCORE: "+score,650,500);
      text("SAMPLES COLLECTED: "+icescore,575,550);
    }

  drawSprites(); 
}

function spawnAsteroids(){
  if(frameCount%7===0){
    var asteroid = createSprite(random(camera.position.x*2.5,camera.position.x*4),random(-10,700),20,20);
    asteroid.velocityX = random(-2,-5);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:
        asteroid.addImage("asteroid1",ast1);
        break;
      case 2:
      asteroid.addImage("asteroid2",ast2);
        break;
      case 3:
      asteroid.addImage("asteroid3",ast3);
        break;
      default:
        break;
      }
    astgroup.add(asteroid);
    asteroid.scale = 0.2;
    asteroid.lifetime = 1000;
    }
  }

  function spawnSat(){
    if(frameCount%50===0){
      var satelite = createSprite(random(1400, 1800),random(0,610),20,20);
      satelite.velocityX = random(-1,-5);
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1:
          satelite.addImage("sat1",sat1);
          break;
        case 2:
          satelite.addImage("sat2",sat2);
          break;
        case 3:
        satelite.addImage("sat3",sat3);
          break;
        default:
          break;
      }
      satgroup.add(satelite);
      satelite.scale = 0.4;
      satelite.lifetime = 1000;
    }
  }

  function bullet(){
    bull = createSprite(astrofly.x,astrofly.y,20,10);
    bull.addImage("bulletimg",bulletimg);
    bull.scale = 0.15;
    bull.velocityX = 10;
    bulletgrp.add(bull);
  }