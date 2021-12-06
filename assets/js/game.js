// Game States
// "WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less

// Welcome players to Robot Gladiators
var welcome = window.alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// create function
var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they want to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // if the player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "s") {
            // confirms player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName+ " has decided to skip the fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                // check player's money
                if (playerMoney <= 0) {
                    window.alert(playerName+" has no more money!");
                } else {
                    window.alert(playerName+" still has "+playerMoney+" money left.");
                }
                break;
            }
        }
        
        // if player chooses to fight, then fight
        else if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "f") {
            //remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName+ " attacked " +enemyName+". " +enemyName+ " now has "+enemyHealth+" health remaining."
            );

            //check enemy's health
            if (enemyHealth <= 0) {
            window.alert(enemyName+" has died!");
            break;
            } else {
                window.alert(enemyName+" still has "+enemyHealth+" health left.");
            }

            //remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName+ " attacked " +playerName+". "+playerName+ " now has "+playerHealth+" health remaining."
            );

            //check player's health
            if (playerHealth <= 0) {
                window.alert(playerName+" has died!");
                break;
            } else {
                window.alert(playerName+" still has "+playerHealth+" health left.");
            }
            //if player chooses to skip
        }
        
        else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
}

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50
    // call fight function with enemy-robot
    fight(pickedEnemyName);
}