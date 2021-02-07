class Food{
    constructor(){
        this.milkImg = loadImage("images/Milk.png");
        this.foodStock;
    }

    getFoodStock(){
    var a = database.ref('Food')
    a.on("value",(data)=>{
    this.foodStock = data.val();
    });
    }

    updateFoodStock(d){
        database.ref('/').update({
            Food : d
        })
    }

    bedRoom(){
        background(bedRoomImg,500,300);
        fill("black");
        textStyle(BOLD);
        textSize(40);
        text("Doggie Is Sleeping",200,50);
    }

    washRoom(){
        background(washRoomImg,500,300);
        fill("black");
        textStyle(BOLD);
        textSize(40);
        text("Doggie Is Bathing",210,50);
    }

    garden(){
        background(gardenImg,500,300);
        fill("black");
        textStyle(BOLD);
        textSize(40);
        text("Doggie Is Playing",210,50);
    }

    display(){
        var x = 150,y = 250;
        imageMode(CENTER)

        if(this.foodStock != 0){
            for(var i=0 ; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 150;
                    y += 75;
                }
                image(this.milkImg,x,y,75,75);
                x += 50
            }
        }

        
        

        
        

    }
}