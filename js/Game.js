class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(400,800);
    car1.addImage(car1IMG);
    car2 = createSprite(800,800);
    car2.addImage(car2IMG);
    carSet = [car1,car2];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      image(trackIMG,0,-displayHeight*4, displayWidth, displayHeight*5);
      var display_position = 130;
      var Index = 0;
      var posx = 400;
      var posy = 800;
      for(var plr in allPlayers){

        posy = displayHeight - allPlayers[plr].distance;
        carSet[Index].y  = posy;
        carSet[Index].x = posx;
        posx = posx + 400;
        if(plr === "player" + player.index){
          carSet[Index].shapeColor = "green";
          camera.position.x = displayWidth/2;
          camera.position.y = carSet[Index].y;
          console.log(allPlayers[plr].distance);
          stroke("pink");
          rectMode(CENTER);
          rect(carSet[Index].x,carSet[Index].y,50,100)
        }
        Index = Index + 1;
       /* if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
      }
    }
    drawSprites();
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
      vroomSound.play();
    }

     if(player.distance === 3400){
       gameState = 2;
     }

  }

    end(){
     console.log("GAME OVER");
     stroke("red");
     fill("red")
     text("GAME OVER", displayWidth - 400, -3500);
     game.update(2);
     vroomSound.stop();

    }

}
