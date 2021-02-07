var dog,dogImg,happyDog,happyDogImg,foodObjStock,foodObjS,database;
var button1,button2,lastFed,fedTime,foodObj;
var bedRoomImg,gardenImg,washRoomImg,readState,updateState,gameState,button3,button4,back,count = 0;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
  bedRoomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washRoomImg = loadImage("images/Wash Room.png");
  dogVaccineImg = loadImage("images/dogVaccination.png");
  foodStockImg = loadImage("images/Food Stock.png");

}

function setup() {
	createCanvas(750,750);

  dog = createSprite(375,200);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  button1 = createButton("Feed The Dog");
  button1.position(860,185);

  button2 = createButton("Add Food");
  button2.position(970,185);

  button3 = createButton("Veiw Vaccination Schedule");
  button3.position(550,800);

  button4 = createButton("View Food Stock");
  button4.position(750,800);

  back1 = createButton("<= Back");
  back1.position(1150,175);
  back1.hide();

  foodObj = new Food();

  readState = database.ref("gameState");
  readState.on("value",(data)=>{
    gameState = data.val();
  })
}


function draw() {  
  background(46, 139, 87);

  foodObj.getFoodStock();
  button1.mousePressed(feed);
  button2.mousePressed(addFood);
  button3.mousePressed(vaccinationSchedule);
  button4.mousePressed(stockLeft);
  back1.mousePressed(back);

  fedTime = database.ref('FedTime');
  fedTime.on("value",(data)=>{
    lastFed = data.val();
  })
drawSprites();
  
  fill("white");
  textSize(20)
  if(lastFed == 0){
      text("Last Fed : 12 AM",175,100);
  }else if(lastFed >= 12){
      text("Last Fed : "+lastFed%12+" PM",200,100);
  }else{
      text("Last Fed : "+lastFed+" AM",200,100);
  }

  if(gameState !== "Hungry"){
    button1.hide();
    button2.hide();
    dog.destroy();
  }else{
    dog = createSprite(375,200);
    dog.addImage(dogImg);
    dog.scale = 0.2;
    button1.show();
    button2.show();
    fill("black");
    textStyle(BOLD);
    textSize(40);
    text("Doggie Is Hungry",210,60);
  }

  var currentTime = hour();

  if(count == 0){
    if(currentTime == (lastFed+1)||currentTime == lastFed){
      update("Playing");
      foodObj.garden();
    }else if(currentTime == (lastFed+2)){
      update("Sleeping");
      foodObj.bedRoom();
    }else if(currentTime >= (lastFed+2) && currentTime <= (lastFed+4)){
      update("Bathing");
      foodObj.washRoom();
    }else{
      update("Hungry");
      foodObj.display();
    }
  }
  
    
    if(count == 1){
      button1.hide();
      button2.hide();
      button3.hide();
      button4.hide();
      back1.show();
      background(dogVaccineImg,200,200);
    }

    if(count == 2){
      button1.hide();
      button2.hide();
      button3.hide();
      button4.hide();
      back1.show();
      background("white");
      imageMode(CENTER);
      image(foodStockImg,375,375);
    }
}



function feed(){
  dog.addImage(happyDogImg);
  if(foodObj.foodStock != 0){
  foodObj.updateFoodStock(foodObj.foodStock - 1);
  }else{
  foodObj.updateFoodStock(foodObj.foodStock);
  }
  database.ref('/').update({
    FedTime : hour()
  })
}

function addFood(){
  foodObj.foodStock += 1;
  database.ref('/').update({
    Food : foodObj.foodStock
  })
}

function vaccinationSchedule(){
  count = 1;
}

function stockLeft(){
  count = 2;
}

function update(state){
  database.ref('/').update({
    gameState : state
  })
}

function back(){
  count = 0;
  back1.hide();
  button3.show();
  button4.show();
}

  

