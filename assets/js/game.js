/*****************************************************************************************
 *  
 * File name: game.js
 * Author: Fabian Flores
 * Date: February, 2018
 * Description: This javascript file implements the Star Wars RPG game. The user selects
 *  an attacker and a defender. The goal of the game is for the attacker to beat the enemy
 *  defender. Health points, attack power, and counterattack power and choice of enemy
 *  determines who will win.
 * 
 ******************************************************************************************/

//------------------------------------------------------------------------------------------
//
// GLOBAL VARIABLES AND OBJECTS
//
const IMG_PATH = "./assets/images/";
const START_ID = 7;
const END_ID = 8;


//------------------------------------------------------------------------------------------
//
// MAIN PROCEDURE
//

$(document).ready(function() {
//------------------------------------------------------------------------------------------
// VARIABLES
//
  // attack button
  var attackBtn = $("#attack-button");
  var restartBtn = $("#restart-button");

  // star war character objects 
  var swChar1 = {
      buttonVal: "character1",
      charName: "Character1 Name",
      swCharId: "swchar-1",
      imgName: "char1.png",
      currentSection: 0, 
      charNum: 1,
      healthPoints: 200,
      attackPower: 5,
      counterPower: 6,
      getAttackPower: function() {
        return this.attackPower;
      },
      resetHealth: function() {
        return this.healthPoints = 200;
      }
    }, 
    swChar2 = {
      buttonVal: "character2",
      charName: "Character2 Name",
      swCharId: "swchar-2",
      imgName: "char2.png",
      currentSection: 0, 
      charNum: 2,
      healthPoints: 100,
      attackPower: 3,
      counterPower: 7,
      resetHealth: function() {
        return this.healthPoints = 100;
      }
    }, 
    swChar3 = {
      buttonVal: "character3",
      charName: "Character3 Name",
      swCharId: "swchar-3",
      imgName: "char3.png",
      currentSection: 0,
      charNum: 3,
      healthPoints: 100,
      attackPower: 5,
      counterPower: 9,
      resetHealth: function() {
        return this.healthPoints = 100;
      } 
    }, 
    swChar4 = {
      buttonVal: "character4",
      charName: "Character4 Name",
      swCharId: "swchar-4",
      imgName: "char4.png",
      currentSection: 0,
      charNum: 4,
      healthPoints: 100,
      attackPower: 3,
      counterPower: 5,
      resetHealth: function() {
        return this.healthPoints = 100;
      } 
    };

// the data structure for the characters is an array of objects
  var swObjArray = [ swChar1, swChar2, swChar3, swChar4];

// game state variables
  var gameState = {
    isEnemySelected: false,
    isHeroSelected: false,
    isGameOver: false,
    currentHero: 0,
    currentEnemy: 0,
    attackIncrement: 0,
    enemiesRemaining: swObjArray.length - 1
  }

//------------------------------------------------------------------------------------------
// FUNCTIONS
//
  /*******************************************************************************
   * displayStarwarChars() builds the block elements in order to create the star
   *   war character cards. The function makes use of the star war object array
   *   to obtain the relevant data for each character. id's are created to later
   *   access the cards.
   */
  function displayStarwarChars() {
    // traverse swObjArray, dynamically create objects 
    $.each(swObjArray, function( index, obj ) {
      console.log( index + ": " + obj.charName );
      // block elements used to build each character's 'game card'
      var divCardOuter = $("<div>");
      var divButton = $("<button>");
      var upperCardBody = $("<div>");
      var upperCardPar = $("<p>");
      var buttonImg = $("<img>");
      var imgFile = IMG_PATH + obj.imgName;
      var lowerCardBody = $("<div>");
      var lowerCardPar = $("<p>");

      // give divCardOuter the following classes 
      divCardOuter.attr("id", obj.swCharId + "-card");
      divCardOuter.addClass("card col-xs-12 col-sm-3 col-md-3 col-lg-2 sw-card");
      divCardOuter.attr("style","width: 25rem;");
      // Append each divCardOuter to the "#available-chars" div.
      $("#available-chars").append(divCardOuter);
      // add class to button
      divButton.addClass("sw-char-button");
      // add button to divCardOuter div
      $(divCardOuter).append(divButton);
      // add classes to upperCardBody
      $(upperCardBody).addClass("card-body");
      // append upperCardBody to divButton
      $(divButton).append(upperCardBody);
      // add classes to upper card paragraph
      $(upperCardPar).addClass("card-text sw-text");
      // add id to paragraph based on button value's id
      $(upperCardPar).attr("id",obj.buttonVal);
      $(upperCardPar).text(obj.charName);
      // append paragraph to upper card body
      $(upperCardBody).append(upperCardPar);
      // add classes and attributes to buttonImg
      $(buttonImg).addClass("sw-char img-fluid card-img-top ml-1 mr-1");
      $(buttonImg).attr("id",obj.swCharId+"-img");
      $(buttonImg).attr("src",imgFile);
      $(buttonImg).attr("alt",obj.charName);
      // append image to divButton
      $(divButton).append(buttonImg);
      // add classes to Lower card body
      $(lowerCardBody).addClass("card-body");
      // append lowerCardBody to divButton
      $(divButton).append(lowerCardBody);
      // lowerCardPar classes and attributes
      $(lowerCardPar).addClass("card-text sw-text");
      $(lowerCardPar).attr("id",obj.swCharId + "-health");
      $(lowerCardPar).text("Health: " + obj.healthPoints);
      // append lowerCardPar to lowerCardBody
      $(lowerCardBody).append(lowerCardPar);
    });
  }

  /*******************************************************************************
   * initializeGame() empties out game's sections, resets gameState variables
   * and builds initial star war character cards
   */
  function initializeGame() {
    // empty section elements 
    $("#available-chars, #hero, #enemies, #current-defender, #attack-results, #restart-button").empty();

    // reset game state booleans to false
    gameState.isHeroSelected = false;
    gameState.isEnemySelected = false;
    gameState.isGameOver = false;
    gameState.enemiesRemaining = swObjArray.length - 1;

    // reset health points
    $.each(swObjArray, function( index, obj ) {
      obj.healthPoints = obj.resetHealth();
      $("#" + obj.swCharId + "-health").text("Health: " + obj.healthPoints);
      console.log("obj.healthPoints: " + obj.healthPoints);
    });

    // build available character list
    displayStarwarChars();

    // later, put music background, default is mute 
  }

  /*******************************************************************************
   * selectHero() on clicking a button image of a star war character
   */
  function selectHero() {
 
    console.log("in selectHero()");
    var heroId = "";
    var enemyId = "";
    var indexSwCard = 0;
    $(".sw-card").on("click", function() {
      // get index of card clicked in swObjArray -- dependent on way card's 'id' is named
      // 'id' is of the form 'swchar-1-card', so number of card is always in seventh position
      indexSwCard = parseInt($(this).attr("id").slice(START_ID,END_ID)) - 1; 
      // only if card's current section value is 0... to avoid having multiple heroes
      if ( (swObjArray[indexSwCard].currentSection === 0) && (gameState.isHeroSelected === false) ) {
        // get star war's character id from card-'s value
        heroId = $("#" + $(this).attr("id"));

        console.log("indexSwCard: " + indexSwCard);
        console.log("card: " + $(this).attr("id") + " section: " + swObjArray[indexSwCard].currentSection);
        swObjArray[indexSwCard].currentSection = 1; // 1 represents hero's section
        gameState.currentHero = indexSwCard; // save index of hero selected
        gameState.attackIncrement = swObjArray[indexSwCard].attackPower;
        // have hero character disappear from section, without deleting its content
        $(heroId).detach();
        // attach hero character selected to '#hero' div
        $("#hero").append(heroId);

        // the non-clicked cards will be moved to the enemies section
        $.each(swObjArray, function( index, obj ) {
          console.log("in each loop");
          if (obj.currentSection !== 1) {
            enemyId = $("#" + obj.swCharId + "-card");
            obj.currentSection = 2; // 2 represent's enemies section section
            $(enemyId).detach();
            $("#enemies").append(enemyId);
          }
          console.log("obj.charName: " + obj.charName + " obj.currentSection: " + obj.currentSection);
        });

        gameState.isHeroSelected = true;
        console.log("obj current section: " + swObjArray[indexSwCard].currentSection);
      }



    }); 
  }

  /*****************************************************************************************
   * selectEnemy picks enemy hero fights against
   */
  function selectEnemy() {
    console.log("inSelectEnemy");
    
    $(".sw-card").on("click", function() {

      console.log("in select enemy click");
      indexSwCard = parseInt($(this).attr("id").slice(START_ID,END_ID)) - 1; 
      // only if card's current section value is 0... to avoid having multiple heroes
      if ( (swObjArray[indexSwCard].currentSection === 2) && (gameState.isEnemySelected === false)) {
        console.log("potential enemy selected");
        // get star war's character id from card-'s value
        enemyId = $("#" + $(this).attr("id"));

        console.log("indexSwCard: " + indexSwCard);
        console.log("card: " + $(this).attr("id") + " section: " + swObjArray[indexSwCard].currentSection);
        swObjArray[indexSwCard].currentSection = 3; // 3 represents the defender section
        gameState.currentEnemy = indexSwCard; // save index
        // have enemy character disappear from 'enemies' section, without deleting its content
        $(enemyId).detach();
        // attach enemy character selected to '#current-defender' div
        $("#current-defender").append(enemyId);
        console.log("obj current section: " + swObjArray[indexSwCard].currentSection);
        gameState.isEnemySelected = true;
        $("#attack-results").empty();
      }
    });
  }

  /*****************************************************************************************
   * fight() has hero attack enemy
   *   use of health points, attack power and counter attack power
   */
  function fight() {
    // send message if no enemy has been selected yet
    if (!gameState.isEnemySelected && !gameState.isGameOver) {
      $("#attack-results").html("No enemy here.");
    } 

    // fight is enabled if hero and defender are present
    if (gameState.isHeroSelected && gameState.isEnemySelected && !gameState.isGameOver) {
      var sText = "";
      var hIndex = gameState.currentHero;
      var eIndex = gameState.currentEnemy;
      console.log("attackIncrement: " + gameState.attackIncrement);
      var restartButton = $("<button>");

      // assemble fight section's text
      sText = swObjArray[hIndex].charName + " attacked " + swObjArray[eIndex].charName + " for ";
      sText += swObjArray[hIndex].attackPower + " damage.<br />";
      sText += swObjArray[eIndex].charName + " attacked you back for " + swObjArray[eIndex].counterPower + ".";

      // update health of hero and enemy
      swObjArray[hIndex].healthPoints -= swObjArray[eIndex].counterPower;
      swObjArray[eIndex].healthPoints -= swObjArray[hIndex].attackPower;

      // display new stats of each character
      $("#" + swObjArray[hIndex].swCharId + "-health").text("Health: " + swObjArray[hIndex].healthPoints);
      $("#" + swObjArray[eIndex].swCharId + "-health").text("Health: " + swObjArray[eIndex].healthPoints);

      // update hero's attackPower
      swObjArray[hIndex].attackPower += gameState.attackIncrement;
      console.log("hero and enemy selected. fight can begin");
      $("#attack-results").html(sText);

      // check for enemy's health, hero wins if enemy's HP healthPoints are 0 or less
      if (swObjArray[eIndex].healthPoints <= 0) {
        console.log("You win!");
        gameState.isEnemySelected = false;
        gameState.enemiesRemaining--;
        if (gameState.enemiesRemaining > 0) {
          sText = "You have defeated " + swObjArray[eIndex].charName + ", ";
          sText += "You can choose to fight another enemy.";
        } else {
          console.log("You won the game!!!");
          sText = "You won the game!!";
          gameState.isGameOver = true;
        }
        $("#attack-results").html(sText);
        $("#current-defender").empty();
      }

      // check for hero's health, loses if HP healthPoints is 0 or less
      if (swObjArray[hIndex].healthPoints <= 0) {
        gameState.isGameOver = true;
        console.log("You lose!");
        sText = "You have been defeated... GAME OVER!";
        $("#attack-results").html(sText);
      }

      // if game is over, show restart button
      if (gameState.isGameOver) {
        restartButton.addClass("btn btn-secondary ml-3");
        restartButton.text("Restart");
        $("#restart-button").append(restartButton);
        restartButton.on("click", initializeGame);
      }
    }
    console.log("in fight section");
    console.log("heroSelected, enemySelected: " + gameState.isHeroSelected + " " + gameState.isEnemySelected);
  }

  initializeGame();
  selectHero();
  selectEnemy();
  attackBtn.on("click", fight);

}); // End of document.ready function

// End of File
