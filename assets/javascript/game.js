$(document).ready(function(){
	//Initialize array to hold all characters
	var charactersArr = [];
	//Initialize the player
	var player;
	//Initialize the enemy
	var enemy;
	//Game Object
	var gameObject = {

		attack: function(){
			//Attack enemy
			enemy.setHP(enemy.getHP() - player.getAP());
			//Enemy counter
			player.setHP((player.getHP() - enemy.getCP()));
			//Player gets strong
			player.setAP((player.getAP() + player.getCP()));
		},
		pickEnemy: function(){
		},
		pickPlayer: function(){
		}
	};
	//Initialize characters
	for(var i = 0; i < 4; i++){
		//Character object
		var character = {
			//Character name
			characterName: "",
			//Health points
			healthPoints: 0,
			//Attack power
			attackPower: 0,
			//Counter power
			counterPower: 0,
			//constructor
			createCharacter: function(name,hp,ap,cp){
				this.characterName = name;
				this.healthPoints = hp;
				this.attackPower = ap;
				this.counterPower = cp;
			},
			//Get characterName
			getCN: function(){
				return this.characterName;
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
			setCN: function(x){
				this.characterName = x;
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
		//Create img object
		var imgDiv = $("<img>");
		//Add img src
		imgDiv.attr("src", "assets/images/0" + i +".jpg");
		//Append the img to the #characters array
		$("#charactersArr").append(imgDiv);

	}
//T E S T   G A M E
	charactersArr[0].createCharacter("test1",50,10,10);
	charactersArr[1].createCharacter("test2",70,8,8);
	charactersArr[2].createCharacter("test3",40,15,15);
	charactersArr[3].createCharacter("test4",80,5,5);

	player = charactersArr[0];
	enemy = charactersArr[2];

	gameObject.attack();

	console.log(player);
	console.log(player);
});