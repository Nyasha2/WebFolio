
/**
 * CS 132
 * Author: Nyasha Makaya
 * HW 2: Burger Fever part A
 * Contains the toggleView functionality functions allowing to switch
 * from the menu to the game view
 */


(function(){
    "use strict";

    /**
     * Global variables for the program
     */
    let timerId = null;
    let secondsRemaining;
    let score = 0;

    /**
     * This function adds event listeners to both the start button
     * and the menu button so that toggleView functio is called
     * when either of them is clicked. It does not have any parameters.
     */
    function init() {
        let startButton = document.getElementById("start-btn");
        startButton.addEventListener("click", toggleView);
        startButton.addEventListener("click", initHUD);
        startButton.addEventListener("click", generateOrder);
        startButton.addEventListener("click", populateCards);

        let backButton = document.getElementById("back-btn");
        backButton.addEventListener("click", toggleView);
        backButton.addEventListener("click", restart);

        let optionButtons = qsa(".option > button");
        optionButtons.forEach(button => {
            button.addEventListener("click", toggleButtons);
        });
    }

    /**
     * This functions toggles between the difficulty level selection
     * buttons
     */
    function toggleButtons(){
        let optionButtons = qsa(".option > button");
        if (optionButtons[0].className === "selected"){
            optionButtons[1].classList.add("selected");
            optionButtons[0].classList.remove("selected");
        }
        else{
            optionButtons[0].classList.add("selected");
            optionButtons[1].classList.remove("selected");
        }
    }

    /**
     * This functions initializes the assembly display, the ordeList
     * and the timer so that a new game can start
     */
    function restart(){
        clearInterval(timerId);
        qs("#assembly").innerHTML = '';
        qs("#order").innerHTML = '';
        score = 0;
        qs("#score").textContent = score;
        qs("#ingredient-list").innerHTML = '';

    }

    /**
     * This function initializes the header in the gameview section
     * by initializing the score, the timer
     */
    function initHUD(){
        timerId = setInterval(advanceTimer, 1000);
        let timerOption = document.getElementsByTagName("select");
        let selectTime = timerOption[0];
        secondsRemaining = selectTime.options[selectTime.selectedIndex].value;
        displayTime(secondsRemaining);
        qsa("#ingredients-list").disabled = false;
    }

    /**
     * This function display the time in 00:00 format
     * @param {time} this is the total time remaining in seconds
     */
    function displayTime(time){
        let minutes = String(Math.floor(time / 60)).padStart(2, '0');
        let seconds = String(time % 60).padStart(2, '0');
        qs("#timer").innerText = minutes + ":" + seconds;
    }

    /**
     * This function carries out the countdown of the timer for the game
     * and destroys the timer if the time is up
     */
    function advanceTimer(){
        if (secondsRemaining === 0){
            clearInterval(timerId);
            qsa("#ingredients-list").disabled = true;
        }
        else{
            secondsRemaining -= 1;
            displayTime(secondsRemaining);
        }
    }

    /**
     * This function creates the ingredients for the game, depending on 
     * difficulty levels
     */
    function populateCards(){
        const IMG_PATH = "imgs/";
        const EXT = ".png";
        let ingNames;
        let level = getDifficulty();

        if (level === "easy"){
            ingNames = ["top-bun", "cheese", "patty", "bottom-bun"];
        }
        else{
            ingNames = ["top-bun", "cheese", "lettuce", "onion",
                        "tomato", "patty", "pickles", "bottom-bun"];
        }
        
        ingNames.forEach( ingredient => {

            //create the ingredient card
            let ingredientCard = gen("div");
            ingredientCard.classList.add("ingredient-card");
            ingredientCard.addEventListener("click", () => {
                addIngredient(ingredientCard);
            });
            
            //create the name tag
            let name = gen("p");
            name.textContent = ingredient;

            //create the image container
            let imgContainer = gen("div");
            imgContainer.classList.add("img-container");

            //create the image
            let img = gen("img");
            img.src = IMG_PATH + ingredient + EXT; 
            img.classList.add("ingredients");
            img.alt = ingredient;

            //integrate everything
            imgContainer.appendChild(img);
            ingredientCard.appendChild(name);
            ingredientCard.appendChild(imgContainer);

            //Add it to the main html
            let ingList = document.getElementById("ingredient-list");
            ingList.appendChild(ingredientCard);

        });
    }

    /**
     * This functions generate a random order list so thatthe player can 
     * make the burger
     */
    function generateOrder(){
        let level = getDifficulty();
        let orderList = ["top-bun"];
        let ingredients;
        let numIng;

        if (level === "easy"){
            numIng = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
            ingredients = ["cheese", "patty"];
        }
        else{
            numIng = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
            ingredients = ["cheese", "lettuce", "onion", 
            "tomato", "patty", "pickles"];
        }

        for (let i = 0; i < numIng; i += 1){
            let idx = Math.floor(Math.random() * (ingredients.length));
            orderList.push(ingredients[idx]);
        }

        orderList.push("bottom-bun");

        //create the order div
        let order = document.getElementById("order");

        //create the items on the order
        orderList.forEach(item => {
            let tag = gen("p");
            tag.textContent = item;
            order.appendChild(tag);
        });
    }

    /**
     * This function adds an ingredient on to the current burger being made
     * it also adds an event to the image being added to the burger such that
     * it gets removed from the burger if it gets clicked. 
     * Finally, it checks if the current state of the burger is valid
     */
    function addIngredient(ingredient){
        let img = ingredient.children[1].children[0];
        let newImg = gen("img");
        newImg.src = img.src;
        newImg.alt = img.alt;
        // newImg.classList.
        let assembly = document.getElementById("assembly");
        assembly.appendChild(newImg);
        newImg.addEventListener("click",  () => {
            newImg.remove();
        });
        newImg.addEventListener("click", verifyBurger);
        verifyBurger();
    }

    /**
     * This function checks if the current ingredients added to the assembly 
     * match with the order, and if so, it updates the points and generate a
     * new order
     */
    function verifyBurger(){
        if ((isMatching())){
            qs("#order").classList.add("correct-order");
            qs(".ingredient-card").disabled = true;
            qs(".ingredients").disabled = true;
            qs("#ingredient-list").disabled = true;
            setTimeout(setupNextOder, 1000);
            ableCards(true);
        }
    }

    /**
     * This function enabl or disable the ingredients list and its 
     * components depending on the point in the game
     * 
     * @param {condition} this is either true or false, and determines
     * if the cards are being enabled or disabled.
     */
    function ableCards(condition){
        let cards = qsa(".ingredient-card");
        cards.forEach(card => {
            card.disabled = condition;
        })

        let imgs = qsa("img")
        imgs.forEach(img => {
            img.disabled = condition;
        })
    }


    /**
     * This function clears the order list, and creates another order list
     * for the next order. it also updates the score and clears the assembly,
     * including enabling the ingredients list so that users can use it again
     */
    function setupNextOder(){
        qs(".correct-order").classList.remove("correct-order");
        qs(".ingredient-card").disabled = false;
        qs(".ingredients").disabled = false;
        qs("#ingredient-list").disabled = false;
        qs("#assembly").innerHTML = '';
        qs("#order").innerHTML = '';
        generateOrder();
        score += 1;
        qs("#score").textContent = score;
        let buttons = qsa('button');
        buttons.forEach(button => {
            button.disabled = false;
        });
        ableCards(false);
    }

    /**
     * This function checks if the ingredients on the assembly match the order list
     * @returns {isMatching} true or false depending on whether it is matching or not
     */
    function isMatching(){
        let order = document.getElementById("order").children;
        let assembly = qsa("#assembly > img");

        if (order.length !== assembly.length){
            return false;
        }

        for (let i = 0; i < assembly.length; i += 1){
            if (order[order.length - i - 1].textContent !== assembly[i].alt){
                return false;
            }
        }

        return true;
    }

    /**
     * This function checks the difficulty level selected 
     * by the user at the start of the game.
     * 
     * @returns {level}: This is the difficult level selected 
     * by the player
     */
    function getDifficulty(){
        let difficulty = document.getElementsByClassName("selected");
        let level = difficulty[0].value;
        return level;
    }

    /**
     * This functions changes from menu view to game view when the start
     * button is clicked, and vice versa when the menu button is clicked.
     */
    function toggleView(){
        let gameView = document.getElementById("game-view");
        let menuView = document.getElementById("menu-view");
        
        if (gameView.className === "hidden"){
            gameView.classList.remove("hidden");
            menuView.classList.add("hidden");
        }
        else{
            gameView.classList.add("hidden");
            menuView.classList.remove("hidden"); 
        }
    }

    init();
})();


