# Star Wars RPG Game

#### Fabian Flores

### Overview

The `Star Wars RPG Game` is an interactive game which dynamically updates web pages leveraging the jQuery library. The player selects an attacker and a defender. The objetive of the game is for the attacker to beat the enemy
defender. Health points, attack power, and counterattack power and choice of enemy determines who will win.

### Description

Before beginning to code, it was important to think of a data structure that would be able to neatly implement the game. An array of objects is the way I decided to represent the star war characters. Each object has the following attributes:  

1. charName: this is the Character Name of each star war character in the game.

2. swCharId: Each character has an id. This facilitated identifying and manipulating the bootstrap cards, which contain the character's information.

3. imgName: The star ware images are stored in the `assets\images` folder. `imgName` holds the file name of the image.

4. currentSection: Essentially, there are four sections a star war protagonist can belong to: the "available characters" section, the "hero section", the "enemies" section and the, "current enemy" or defender section. This object variable is key in determining which section a character belongs to, as well as to the "clickability" of each card.

5. charNum: Every Star Wars character has a unique number.

6. healthPoints, attackPower, counterPower: These attributes keep track of the "score" and "health" of each character once the game enters in 'attack' mode.

### Method

The basic routine of the game is the following:

  `GameRoutine() `
    `initializeGame`
    `selectHero`
    `selectEnemy`
    `attack`

For the movement of the star war character cards, the `jQuery detach()` function came in handy. The `detach` utility allows for the object to disappear from the screen without destroying its contents.

### Comments

This game was added to my github profile's portfolio:
[f-flores portfolio](https://f-flores.github.io/Responsive-Portfolio/portfolio.html).
