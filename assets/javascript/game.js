$(document).ready(function(){
	//Initialize array to hold all characters
	var charactersArr = [];
	//Initialize the player
	var player = null;
	//Initialize the enemy
	var enemy = null;
	//var to increment attack power
	var increment = 0;
	//Check if you lost or won already
	var gameStop = false;
	//Initialize characters
	for(var i = 0; i < 4; i++){
		//Character object
		var character = {
			//Character name
			imgPath: "",
			//Health points
			healthPoints: 0,
			//Attack power
			attackPower: 0,
			//Counter power
			counterPower: 0,
			//constructor
			createCharacter: function(ip,hp,ap,cp){
				this.imgPath = ip;
				this.healthPoints = hp;
				this.attackPower = ap;
				this.counterPower = cp;
			},
			//Get characterName
			getIP: function(){
				return this.imgPath;
			},
			//Get healthPoints
			getHP: function(){
				return this.healthPoints;
			},
			//Get attackPower
			getAP: function(){
				return this.attackPower;
			},
			//Get counterPower
			getCP: function(){
				return this.counterPower;
			},
			//set characterName
			setIP: function(x){
				this.imgPath = x;
			},
			//set healthPoints
			setHP: function(x){
				this.healthPoints = x;
			},
			//set attackPower
			setAP: function(x){
				this.attackPower = x;
			},
			//set counterPower
			setCP: function(x){
				this.counterPower = x;
			}
		};
		//Push character to the character array
		charactersArr.push(character);
	}
	//Game Object
	var gameObject = {
		declareCharacters: function(){
			//Declare the values
			charactersArr[0].createCharacter("assets/images/0.jpg",100,8,16);
			charactersArr[1].createCharacter("assets/images/1.jpg",80,10,18);
			charactersArr[2].createCharacter("assets/images/2.jpg",50,20,30);
			charactersArr[3].createCharacter("assets/images/3.jpg",60,14,24);
		},
		attack: function(){
			if(player.getHP() <= 0) return;
			//Attack enemy
			enemy.setHP(enemy.getHP() - player.getAP());
			//Player gets strong
			player.setAP((player.getAP() + increment));
			//If enemy is defeated then return attack function
			if(enemy.getHP() <= 0){
				enemy.setHP(0);
				return;
			}			
			//Enemy counter
			player.setHP((player.getHP() - enemy.getCP()));
			if(player.getHP() < 0){
				player.setHP(0);
			}
		},
		display: function(){
			//Clear the html inside these divs
			$("#charactersArr").html("");	
			$("#player").html("");
			$("#enemy").html("");
			//Add characters to website
			$(charactersArr).each(function(i,v){
				//Create img object
				var imgDiv = $("<img>");
				//Create caption object
				var capDiv = $("<caption>");
				//Add classes to img tag
				imgDiv.addClass("chosen");
				//Add img src
				imgDiv.attr("src", v.getIP());
				//Add identifier
				imgDiv.attr("identifier", i);
				//Add text to the caption
				capDiv.text(v.getHP());
				//Append the img to the #characters array
				$("#charactersArr").append(imgDiv);
				//Append the caption to the #chracters array
				$("#charactersArr").append(capDiv);
			});
			//If you have a player
			if(player !== null){
				//Display it
			 	var plaDiv = $("<img>");
			 	plaDiv.attr("src", player.getIP());
			 	plaDiv.addClass("player");
				$("#player").append(plaDiv);

				var capDiv = $("<caption>");
				capDiv.text(player.getHP());
				$("#player").append(capDiv);

				//If there is not enemy selected
				if(enemy === null){ 
					
					return;
				//Show a attack button
				}else{
				 	var attBtn = $("<button>");
				 	attBtn.attr("id", "attBtn");
				 	attBtn.addClass("redText");
				 	attBtn.html("Attack");
					$("#player").append(attBtn);
				}
			}
			//If you have a enemy 
			if(enemy !== null){
				//Display it
				var eneDiv = $("<img>");
				eneDiv.attr("src", enemy.getIP());
				eneDiv.addClass("enemy");
				$("#enemy").append(eneDiv);

				var capDiv = $("<caption>");
				capDiv.text(enemy.getHP());
				$("#enemy").append(capDiv);
			}
		},
		message: function(x){
			if(x ===true){
				$("#messageBox").html("Pick an Enemy to fight!");
				$("#messageBox").addClass("blackText");
			}else{
				$("#messageBox").html("Enemy List");
				$("#messageBox").addClass("blackText");
			}
			if(enemy !== null && player !== null){
				$("#statusBox").html("You attacked:" + player.getAP() + "<br>" +
								 "Enemy counter: " + enemy.getCP());
			}
		},
		resetBtn: function(){
			var resetbtn = $("<button>");
			resetbtn.attr("id","reloadBtn");
			resetbtn.text("Play again!");
			$("#reloadDiv").append(resetbtn);
		},
		winOrLose: function(){
			if(charactersArr.length === 0 && enemy.getHP() <= 0){
				$("#statusBox").html("YOU WON!");
				this.resetBtn();
				gameStop = true;
				return;
			}else if(player.getHP() <= 0){
				$("#statusBox").html("YOU LOST!");
				this.resetBtn();
				gameStop = true;
				return;
			}else if(enemy.getHP() <= 0){
				enemy = null;
				return;
			}
		},
		pickPlayer: function(x){
			var i = $(x).attr("identifier");
			player = charactersArr[i];
			increment = player.getAP();
			charactersArr.splice(i,1);
			gameObject.message(true);		
		},
		pickEnemy: function(x){
			var i = $(x).attr("identifier");
			enemy = charactersArr[i];
			charactersArr.splice(i,1);
			gameObject.message(false);
		}
	};


	gameObject.declareCharacters();
	gameObject.display();

	//CHOOSE PLAYER AND ENEMY
	$(document).on("click",".chosen", function(){
		if(gameStop === true) return;
		if(player === null){
			gameObject.pickPlayer(this);
		}else if(enemy === null){ 
			gameObject.pickEnemy(this);
		}else{
			alert("Fight your current enemy first!");
		}
		gameObject.display();
	});
	//
	$(document).on("click","#attBtn", function(){	
		if(gameStop === true) return;
		gameObject.attack();
		gameObject.message();
		gameObject.winOrLose();
		gameObject.display();
	});
	$(document).on("click","#reloadBtn",function() {
    	location.reload();
	});
});