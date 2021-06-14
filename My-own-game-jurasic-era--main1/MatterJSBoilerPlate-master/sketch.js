
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var dino1;
var dino_img;

var bg;
var bgIMG;

var hero;
var heroANN;
var herSn;
var herSNimg

var ONE  =1;
var two  =2;
var three = 3;
var four = 4;
var level = "ONE";

var timeM;
var timeIMG;

var invsgr;

var battGroup;

var blade;
var bladI;
var blade2;

var score;

var dinoGroup;
var bladeGroup;

var start;

var restart;
var restartIMG;

var und;
var unduIMG;
var undGroup;

var obj;
var objIMG;

var potion;
var potIMG;
var potGroup;

var time2;
var time2img;



function preload()

{
	dino_img = loadAnimation("img/din1-removebg-preview.png","img/din2-removebg-preview.png","img/din3-removebg-preview.png","img/din4-removebg-preview.png","img/din5-removebg-preview.png","img/din6-removebg-preview.png");
	bgIMG = loadImage("img/dinobg1.JPG");
	heroANN = loadAnimation("img/Hero/her-removebg-preview.png","img/Hero/her2-removebg-preview.png","img/Hero/her3-removebg-preview.png","img/Hero/her4-removebg-preview.png",)
	timeIMG = loadImage("img/time-machine1.png");
	bladeI = loadImage("img/ninjA.png");
	start = loadImage("img/Hero/her2-removebg-preview.png");
	restartIMG =  loadImage("img/res.png");
	unduIMG = loadImage("img/bigilu.png");
	objIMG = loadImage("img/obj.png");
	potIMG = loadImage("img/pot.png");
	herSNimg= loadAnimation("img/Hero/her9Sn.png");
	time2img = loadImage("img/time2.png")
	
}

function setup() {
	createCanvas(displayWidth,displayHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	

	bg = createSprite(800,350,20,20);
	bg.addImage(bgIMG);
	bg.scale=3;

	restart = createSprite(700,350,10,10);
	restart.addImage(restartIMG);
	restart.scale=0.2;

	obj = createSprite(700,800,00,10);
	obj.addImage(objIMG);

	score = 0;

    hero = createSprite(600,580,10,10);
	hero.addAnimation("walk",heroANN);
	hero.addAnimation("sneak",herSNimg)
	hero.visible = false;
	
	invsgr = createSprite(800,620,1600,5);
	invsgr.shapeColour="black";
	invsgr.visible= false;

	battGroup = createGroup();
	dinoGroup = createGroup();
	bladeGroup= createGroup();
	undGroup= createGroup();
	potGroup= createGroup();


	



	



	Engine.run(engine);

	World.add(world,hero);
  
}


function draw() {
  rectMode(CENTER);
 // background(bgIMG);
 if(level === "ONE"){
	 restart.visible = false;
	
	bg.velocityX=-6;
	console.log(score);
	 
	
	if(bg.x<500){
		bg.x=800
		
	}

		
		
	


	hero.visible=true;
	if(hero.isTouching(dinoGroup)){
		text("Game Over",780,30);
		level = "two";
	}

	

	if(dinoGroup.isTouching(bladeGroup)){
		dino1.visible=false;
	}
	hero.setCollider("circle",0,0,hero.height-200);
	hero.debug = true;
	
	if(battGroup.isTouching(hero)){
		score = score+1;
		battGroup.destroyEach();
	}
	dinoGroup.setLifeTime
	undGroup.x = battGroup.x;

	if(potGroup.isTouching(hero)){
		hero.destroy();
	}
	if(keyWentDown("e")){
		hero.changeAnimation("sneak",herSNimg);
		hero.setCollider("circle",0,0,hero.height-500)
	}
	if(keyWentUp("e")){
		hero.changeAnimation("walk",heroANN);
		hero.setCollider("circle",0,0,hero.height-200);
	}

	

	

	dino();
  

 } 
 if(level === "two"){
	hero.visible =false;
	bg.velocityX=0;
	restart.visible =true;
	if(mousePressedOver(restart)){
		reset();
	}
 //  Add cheatcode
	if(keyDown("k")){
		level = "ONE";
	}


 }



 








  timeM();
  timeMach();
  drawSprites();
  ninja_blade();
  running();
  pot();
  ninja_blade2();
  textSize(29)
	text("Score: "+ score, 850,50);
 
}

function timeMach(){
	if(frameCount% 500 ===0){
		timeM = createSprite(2000,100,10,10);
		timeM.addImage(timeIMG)
		timeM.velocityX=-6;
		timeM.scale=0.3; 
		timeM.y = Math.round(random(50,500))
		battGroup.add(timeM)
		timeM.lifeTime=6000

	}
	
}

function dino(){
	if(frameCount% 200 === 0){
	dino1 = createSprite(-100,0,10,10);
	dino1.addAnimation("run",dino_img);
	dino1.scale=0.9;
	dino1.velocityX=6;
	dino1.y = Math.round(random(10,230))
	dinoGroup.add(dino1);
	dino.lifeTime=500
	dino.debug= true;
	
	}

	
}

function ninja_blade(){
	if(keyWentDown("d")){
		blade  = createSprite(10,200,10,10)
		blade.addImage(bladeI);
		blade.x= hero.x;
		blade.y= hero.y;
		blade.velocityX=100;
		bladeGroup.add(blade);
		blade.lifeTime=222
	}
}
function ninja_blade2(){
	if(keyWentDown("a")){
		blade2  = createSprite(10,200,10,10)
		blade2.addImage(bladeI);
		blade2.x= hero.x;
		blade2.y= hero.y;
		blade2.velocityX=-100;
		bladeGroup.add(blade2);
		
	}
}
function running(){
	if(keyDown("space")&& hero.y >= 140) {
		hero.velocityY = -29;
	
	}
	
	hero.collide(invsgr)
	hero.velocityY = hero.velocityY + 3;
	
}

function reset(){
	level="ONE";
	dinoGroup.destroyEach();
	battGroup.destroyEach();
	restart.visible = false;
	bg.x=800;
	bg.y=350
}

function pot(){
	if(frameCount% Math.round(random(500,2000)) ===0){
		potion = createSprite(2000,200,10,01);
		potion.addImage(potIMG)
		potion.scale = 0.06;
		potion.velocityX = -6;
		potGroup.add(potion);
	}	
}

function timeM(){
	if(score === 1){
		time2 = createSprite(2000,750,10,10)
		time2.addImage(time2img);
		time2.velocityX= -6
	}
}


