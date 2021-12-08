// Game States
// "WIN" - Player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less
// Wrap game logic in a startGame() function
// When win or lose conditions are met, call and endGame() function that 1) tells the player their stats; 2) asks the player if they want to play again; and 3) recalls the startGame function if they selected yes
// After the player skips or defeats an enemy, ask the player if they want to shop (yes or no; no makes the game continue; yes opens the shop menu, or shop() function, in which the player may refill their health and upgrade (both actions for a separate price) their attack, or leave the shop; if they leave, they're told goodbye and they exit the shop() function; if any other response is given, shop() is called again).
// Use Objects to...
// * Start enemies at a random health value between 40 and 60
// * Start enemies with a random attack value between 10 and 14
// * Make attack damage random, using the robot's attack value as an upper limit

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
                playerMoney = Math.max(0, playerMoney - 10);
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
            var damage = randomNumber(playerAttack - 3, playerAttack);
            enemyHealth = Math.max(0, enemyHealth - damage);
            console.log(
                playerName+ " attacked " +enemyName+". " +enemyName+ " now has "+enemyHealth+" health remaining."
            );

            //check enemy's health
            if (enemyHealth <= 0) {
            window.alert(enemyName+" has died!");
            // add money if the player wins a round
            var fightOutcome =function() {
                var playerMoneyGain = randomNumber(5, 10)
                playerMoney = playerMoney + playerMoneyGain;
                console.log(
                    playerName+" received "+playerMoneyGain+" dollars! "+playerName+" now has "+playerMoney+" dollars!"
                );
            };

            fightOutcome();
            break;
            } else {
                window.alert(enemyName+" still has "+enemyHealth+" health left.");
            }

            //remove player's health by subtracting the amount set in the enemyAttack variable
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
            playerHealth = Math.max(0, playerHealth - damage);
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
            enemyHealth = randomNumber(40, 60);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if the player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over; visit the store before the next round?");

                // if yes, take the player to the store() function 
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
    // if player is still alive, player wins!
    if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You have a score of "+playerMoney+".");
    } else {
        window.alert("You've lost your robot in battle! Game Over!");
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

var shop = function() {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
        case "r":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                console.log(playerName+" now has "+playerHealth+" remaining!");
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "upgrade":
        case "u":
            if (playerMoney => 7) {
                window.alert("Ugrading player's attack by 6 for 7 dollars.");
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "LEAVE":
        case "leave":
        case "l":
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        
        default: 
        window.alert("You did not pick a valid option. Try again.");
        // call shop() again to force the player to pick a valid option
        shop();
        break;
    }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min + 1) + min);

    return value;
};

// start the game when the page loads
startGame();