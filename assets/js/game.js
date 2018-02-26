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
// GLOBAL VARIABLES
//
const IMG_PATH = "./assets/images/";
const START_ID = 7;
const END_ID = 8;
var Game_Sound = false;



//------------------------------------------------------------------------------------------
//
// MAIN PROCEDURE
//
$(document).ready(function() {
//------------------------------------------------------------------------------------------
// VARIABLES
//
  var attackBtn = $("#attack-button");
  var restartBtn = $("#restart-button");
  // Get game theme music
  var audioElement = document.createElement("audio");
  var gameAudioEffect = document.createElement("audio");
  // Music source "https://archive.org/details/JohnWilliamsStarWarsMainThemeFULL"
  // Credit for game sound effects:
  //     Winning sound: https://freesound.org/people/fins/sounds/171670/
  //     Losing sound: https://freesound.org/people/noirenex/sounds/159408/
  //     Attack laser: https://freesound.org/people/nsstudios/sounds/321102/
  audioElement.setAttribute("src", "./assets/audio/john-williams-star-wars-theme.ogg");
  
  // star war character objects 
  var swChar1 = {
      buttonVal: "character1",
      charName: "Luke Skywalker",
      swCharId: "swchar-1",
      imgName: "luke-skywalker.jpg",
      currentSection: 0, 
      charNum: 1,
      healthPoints: 133,
      attackPower: 9,
      counterPower: 14,
      resetHealth: function() {
        return 133;        
      },
      resetAttackPower: function() {
        return 9;
      }
    }, 
    swChar2 = {
      buttonVal: "character2",
      charName: "Lando Calrissian",
      swCharId: "swchar-2",
      imgName: "lando.png",
      currentSection: 0, 
      charNum: 2,
      healthPoints: 127,
      attackPower: 7,
      counterPower: 13,
      resetHealth: function() {
        return 123;
      },
      resetAttackPower: function() {
        return 7;
      }
    }, 
    swChar3 = {
      buttonVal: "character3",
      charName: "Princess Leia",
      swCharId: "swchar-3",
      imgName: "princess-leia.jpg",
      currentSection: 0,
      charNum: 3,
      healthPoints: 141,
      attackPower: 9,
      counterPower: 12,
      resetHealth: function() {
        return 141;
      },
      resetAttackPower: function() {
        return 9;
      } 
    }, 
    swChar4 = {
      buttonVal: "character4",
      charName: "Darth Vader",
      swCharId: "swchar-4",
      imgName: "darth-vader.png",
      currentSection: 0,
      charNum: 4,
      healthPoints: 184,
      attackPower: 10,
      counterPower: 19,
      resetHealth: function() {
        return 184;
      },
      resetAttackPower: function() {
     //   return this.attackPower = 10;
        return 10;
      }
    };

// the data structure for the characters is an array of objects
  var swObjArray = [ swChar1, swChar2, swChar3, swChar4];

// game state variables
  var gameState = {
    isEnemySelected: false,
    isHeroSelected: false,
    isGameOver: false,
    soundOn: false,
    currentHero: 0,
    currentEnemy: 0,
    attackIncrement: 0,
    enemiesRemaining: swObjArray.length - 1
  }

  // audio objects
 // var audio = new Audio("https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90");
  //var bgTheme = new Audio("../audio/john-williams-star-wars-theme.ogg");

//------------------------------------------------------------------------------------------
// FUNCTIONS
//
  // Play sound button
  $(".sound-button").on("click", function() {
    audioElement.play();
    gameAudioEffect.muted = false;
    sessionStorage.setItem('soundOn', 'true');
  });
  
  // Mute button
  $(".mute-button").on("click", function() {
    audioElement.pause();
    gameAudioEffect.muted = true;
    sessionStorage.setItem('soundOn', 'false');
  });


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
      var divCardInner = $("<div>");
      var upperCardBody = $("<div>");
      var upperCardPar = $("<p>");
      var swImg = $("<img>");
      var imgFile = IMG_PATH + obj.imgName;
      var lowerCardBody = $("<div>");
      var lowerCardPar = $("<p>");

      // give divCardOuter the following classes and attributes
      divCardOuter.attr("id", obj.swCharId + "-card")
                  .addClass("card col-xs-12 col-sm-3 col-md-3 col-lg-2 sw-card")
                  .attr("style","width: 25rem;");
      // Append each divCardOuter to the "#available-chars" div.
      $("#available-chars").append(divCardOuter);
      // add class to button
      divCardInner.addClass("sw-char-button");
      // add button to divCardOuter div
      $(divCardOuter).append(divCardInner);
      // add classes to upperCardBody
      $(upperCardBody).addClass("card-body custom-upper-card");
      // append upperCardBody to divCardInner
      $(divCardInner).append(upperCardBody);
      // add classes to upper card paragraph
      $(upperCardPar).addClass("card-text sw-text");
      // add id to paragraph based on button value's id
      $(upperCardPar).attr("id",obj.buttonVal)
                     .text(obj.charName);
      // append paragraph to upper card body
      $(upperCardBody).append(upperCardPar);
      // add classes and attributes to swImg
      $(swImg).addClass("sw-c-img img-fluid card-img-top ml-1 mr-1")
              .attr("id",obj.swCharId+"-img")
              .attr("src",imgFile)
              .attr("alt",obj.charName);
      // append image to divCardInner
      $(divCardInner).append(swImg);
      // add classes to Lower card body
      $(lowerCardBody).addClass("card-body custom-lower-card");
      // append lowerCardBody to divCardInner
      $(divCardInner).append(lowerCardBody);
      // lowerCardPar classes and attributes
      $(lowerCardPar).addClass("card-text sw-text")
                     .attr("id",obj.swCharId + "-health")
                     .text("Health: " + obj.healthPoints);
      // append lowerCardPar to lowerCardBody
      $(lowerCardBody).append(lowerCardPar);
    });
  }

  /*******************************************************************************
   * reloadPage() reloads page and resets array object values
   */
  function reloadPage() {
    var soundOn = sessionStorage.getItem('soundOn');
    console.log("soundOn: " + soundOn);
    if (gameState.isGameOver) {
      location.reload();
      gameState.isGameOver = false;
      // keeps music background if user selected "sound" button
      // feature does not work currently
      if (soundOn === "true") {
        audioElement.play();
      }
    }
  }

  /*******************************************************************************
   * initializeGame() empties out game's sections, resets gameState variables
   * and builds initial star war character cards
   */
  function initializeGame() {
    console.log("in initializeGame()");
    // reloads page to reset left over attack power values after two or more games
    reloadPage();

    // empty section elements 
    $("#available-chars, #hero, #enemies, #current-defender, #attack-results, #restart-button").empty();
    $("#attack-results").css("font-size","90%");

    attackBtn.blur();

    // reset game state booleans to false
    gameState.isGameOver = false;
    gameState.isHeroSelected = false;
    gameState.isEnemySelected = false;
    gameState.attackIncrement = 0;
    gameState.enemiesRemaining = swObjArray.length - 1;

    // reset health points and section
    $.each(swObjArray, function( index, obj ) {
      obj.healthPoints = obj.resetHealth();
      obj.attackPower = obj.resetAttackPower();
      obj.currentSection = 0;
      $("#" + obj.swCharId + "-health").text("Health: " + obj.healthPoints);
      console.log("init obj.healthPoints: " + obj.healthPoints);
      console.log("init obj.AttackPower: " + obj.attackPower);
      console.log("init obj.CounterPower: " + obj.counterPower);
      console.log("init gameState.attackIncrement: " + gameState.attackIncrement);
    });

    // build available character list
    displayStarwarChars();

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
      console.log("indexSwCard: " + indexSwCard +" currSection: "+swObjArray[indexSwCard].currentSection);
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
      // only if card's current section value is 2... to avoid having multiple enemies
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

      // laser attack sound effect
      gameAudioEffect.setAttribute("src","./assets/audio/321102__nsstudios__laser1.wav");
      gameAudioEffect.play();

      // assemble fight section's text
      $("#attack-results").css("font-size","90%");
      sText = "You attacked " + swObjArray[eIndex].charName + " for ";
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
      console.log("Attack power: " + swObjArray[hIndex].attackPower);
      console.log("hero and enemy selected. fight can begin");
      $("#attack-results").html(sText);

      // check for enemy's health, hero wins if enemy's HP healthPoints are 0 or less
      if (swObjArray[eIndex].healthPoints <= 0) {
        console.log("You win!");
        gameState.isEnemySelected = false;
        gameState.enemiesRemaining--;
        if (gameState.enemiesRemaining > 0) {
          sText = "You have defeated " + swObjArray[eIndex].charName + ", ";
          sText += "you can choose to fight another enemy.";
        } else {
          console.log("You won the game!!!");
          console.log(" ");
          $("#attack-results").css("font-size","180%");
          sText = "You won the game!!";
          gameAudioEffect.setAttribute("src","./assets/audio/171670__fins__success-2.wav");
          var playPromise = gameAudioEffect.play();
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              // Show playing UI.
              gameAudioEffect.play();
            })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
              console.log("caught sound error");
              gameAudioEffect.pause();
            });
          }
          gameState.isGameOver = true;
        }
        $("#attack-results").html(sText);
        $("#current-defender").empty();
      }

      // check for hero's health, loses if HP healthPoints is 0 or less
      if ((swObjArray[hIndex].healthPoints <= 0) && swObjArray[eIndex].healthPoints > 0) {
        gameState.isGameOver = true;
        console.log("You lose!");
        gameAudioEffect.setAttribute("src","./assets/audio/159408__noirenex__life-lost-game-over.wav");
        gameAudioEffect.play();
        sText = "You have been defeated... GAME OVER!";
        $("#attack-results").css("font-size","180%");
        $("#attack-results").html(sText);
      }

      // if game is over, show restart button
      if (gameState.isGameOver) {
        restartButton.addClass("btn btn-secondary ml-3 custom-restart-btn");
        restartButton.text("Restart");
        $("#restart-button").append(restartButton);
        restartButton.on("click", doGameRoutine);
      }
    }
    console.log("in fight section");
    console.log("heroSelected, enemySelected: " + gameState.isHeroSelected + " " + gameState.isEnemySelected);
  }


  function doGameRoutine() {
    initializeGame();
    selectHero();
    selectEnemy();
    attackBtn.on("click", fight);
  }

  doGameRoutine();

}); // End of document.ready function

// End of File
