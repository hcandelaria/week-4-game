$(document).ready(function(){
	var charactersArr = [];
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
			//Set values for character
			createCharacter: function(name,hp,ap,cp){
				this.characterName = name;
				this.healthPoints = hp;
				this.attackPower = ap;
				this.counterPower = cp;
			},
			//Get healthPoints
			getCN: function(){
				return this.characterName;
			},
			//Get healthPoints
			getHP: function(){
				return this.healthPoints;
			},
			//Get attackPower
			getHP: function(){
				return this.attackPower;
			},
			//Get counterPower
			getHP: function(){
				return this.counterPower;
			}
		};

		charactersArr.push(character);
	}
	charactersArr[0].createCharacter("test",50,10,10);
	console.log(charactersArr[0]);

});