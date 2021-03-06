// Game States
// "WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);
  
    return value;
};

var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip" || promptFight === "s") {
        var confirmSkip = window.confirm("Are you sure you'd like to skip the battle?");

        if (confirmSkip) {
            window.alert(playerInfo.name+" has decided to skip this fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    var isPlayerTurn = true;
    
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
      }
    
      while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
          // ask player if they'd like to fight or skip using fightOrSkip function
          if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
          }
    
          var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    
          // remove enemy's health by subtracting the amount we set in the damage variable
          enemy.health = Math.max(0, enemy.health - damage);
          console.log(
            playerInfo.name +
              " attacked " +
              enemy.name +
              ". " +
              enemy.name +
              " now has " +
              enemy.health +
              " health remaining."
          );
    
          // check enemy's health
          if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
    
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
    
            // leave while() loop since enemy is dead
            break;
          } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
          }
          // player gets attacked first
        } else {
          var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
          // remove enemy's health by subtracting the amount we set in the damage variable
          playerInfo.health = Math.max(0, playerInfo.health - damage);
          console.log(
            enemy.name +
              " attacked " +
              playerInfo.name +
              ". " +
              playerInfo.name +
              " now has " +
              playerInfo.health +
              " health remaining."
          );
    
          // check player's health
          if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop if player is dead
            break;
          } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
          }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
      }
    };

// function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    //fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        
        console.log(playerInfo);

        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
        
            // pick new enemy to fight based on the index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);

            // if the player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                
                var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");
            
             // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            } 
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;  
        }
    }
    // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    highScore = highScore || 0;

    // if player has more money than high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE? Please enter 1 for a REFILL, 2 for an UPGRADE, or 3 to LEAVE."
    );
    
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upradeAttack();
            break;
        
        case 3:
            window.alert("Leaving the store.");
            break;
        
        default: 
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " +name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();