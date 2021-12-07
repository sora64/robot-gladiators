// Game States
// "WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less
// Wrap game logic in a startGame() function
// When win or lose conditions are met, call and endGame() function that 1) tells the player their stats; 2) asks the player if they want to play again; and 3) recalls the startGame function if they selected yes
// After the player skips or defeats an enemy, ask the player if they want to shop (yes or no; no makes the game continue; yes opens the shop menu, or shop() function, in which the player may refill their health and upgrade (both actions for a separate price) their attack, or leave the shop; if they leave, they're told goodbye and they exit the shop() function; if any other response is given, shop() is called again).

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
// function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    //fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round "+(i+1));
        
            // pick new enemy to fight based on the index of enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // function to end the entire game
    var endGame = function() {
        // if player is still alive, player wins!
        if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You have a score of "+playerMoney+".");
        } else {
            window.alert("You've lost your robot in battle.");
        }
        // ask player if they'd like to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");

        if(playAgainConfirm) {
            // restart the game
            startGame();
        } else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    }

    // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// start the game when the page loads
startGame();