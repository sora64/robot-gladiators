// Game States
// "WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less

// Welcome players to Robot Gladiators
//var welcome =window.alert("Welcome to Robot Gladiators!");

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// create function
var fight = function(enemyName) {
    // fight function statements
    // Ask player if they want to fight or not
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName+ " attacked " +enemyName+". " +enemyName+ " now has "+enemyHealth+" health remaining."
        );

        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName+" has died!");
        } else {
            window.alert(enemyName+" still has "+enemyHealth+" health left.");
        }

        //remove player's heathy by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName+ " attacked " +playerName+". "+playerName+ " now has "+playerHealth+" health remaining."
        );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName+" has died!");
        } else {
            window.alert(playerName+" still has "+playerHealth+" health left.");
        }
        //if player chooses to skip
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        // confirms player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName+ " has decided to skip the fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 2;
            // check player's money
            if (playerMoney <= 0) {
                window.alert(playerName+" has no more money!");
            } else {
                window.alert(playerName+" still has "+playerMoney+" money left.");
            }
        }
        // if no (false), ask question again by running fight() again
        else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }
}

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}