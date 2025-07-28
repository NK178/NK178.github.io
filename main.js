

//time intervals, animations
// setTimeout(function() {
// console.log("This runs once after 1 second");
// }, 3000); // run after 1 sec (1000ms)

//Example 12b - named function
//Set timeout , in 1 sec(1000ms)
// function greetFn() {
// console.log("Hello! 3 secs");
// alert("3 secs!");
// }
// setTimeout(greetFn, 3000); // Runs greetFn() after 3 seconds

//Example 12c - anonymous function
// setInterval(function() {
// console.log("this will log every 1 sec");
// console.log("help!");
// }, 1000);
// //Example 12d - save interval id, so that can stop it later
// let itvlId1= setInterval(function() {
// console.log("interval with id. 1.5 sec");
// }, 1500);


// Ball game
// /*find references to all the buttons and ball */
// const leftBtn = document.querySelector("#leftBtn");
// const rightBtn = document.querySelector("#rightBtn");
// const upBtn = document.querySelector("#upBtn");
// const downBtn = document.querySelector("#downBtn");
// const resetBtn = document.querySelector("#resetBtn");
// const ball = document.querySelector("#ball");
// var ballX = ballY = 0; //assign initial position of ball

// resetBtn.addEventListener("click", ResetPos);
// document.addEventListener('keydown', (e) => {
//     UpdateMovement(e);
// });


// function ResetPos() {
//     ballX=ballY=0; //reset to zero
//     UpdateBallStyle();
// }
// function MovePos(leftInc, topInc) {
//     var newX = ballX + leftInc;
//     var newY = ballY + topInc;
//     if (ConstraitChecker(newX,newY)){
//         ballX += leftInc;
//         ballY += topInc;
//         UpdateBallStyle();
//     }
// }

// //function to update ball css as well as display text
// //NEED TO HAVE PIXEL(PX) BEHIND FOR CSS TO WORK
// function UpdateBallStyle(){
//     ball.style.left = ballX+"px"; //set left property to ball x variable
//     ball.style.top = ballY+"px"; //set top property to ball x variable
//     ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
// }

// function UpdateMovement(input) {

//     if (input.code === "KeyD"){
//         MovePos(10,0);
//     }
//     if (input.code === "KeyA"){
//         MovePos(-10,0);
//     }
//     if (input.code === "KeyS"){
//         MovePos(0,10);
//     }
//     if (input.code === "KeyW"){
//         MovePos(0,-10);
//     }
// }

// function ConstraitChecker(xPos, yPos){
//     if (xPos < 0 || xPos > 150 || yPos < 0 || yPos > 200)
//         return false;
//     else
//         return true;
// }


// //using anonymous function to pass in arguments from eventlistener
// leftBtn.addEventListener("click", function () {
//     MovePos(-10, 0)
// });
// rightBtn.addEventListener("click", function () {
//     MovePos(10, 0)
// });
// upBtn.addEventListener("click", function () {
//     MovePos(0, -10)
// });
// downBtn.addEventListener("click", function () {
//     MovePos(0, 10)
// });


//////////////////////////////////// ASSIGNMENT PART ////////////////////////

///////////////////////////////////// HELPFUL FUNCTIONS ///////////////////////////////

//this will select a number between min and max
function GetRandom(min,max){
return Math.round(Math.random() * (max - min)) + min;
}

//Reuseable functions for button pop ups etc
function hideall(pagelist) {
    for (let onepage of pagelist) {
        onepage.style.display = "none";
    }
}

function show(query, pagelist) {
    hideall(pagelist);
    let allpages=document.querySelectorAll(query);
    for (let page of allpages){
        page.style.display="block"; //show the page
    }
}


//Checks if at least one input from a radio or checklist is filled then returns true
function CheckInputFilled(inputs){
    for (let input of inputs) {
        if (input.checked)
            return true;
    }
    return false;
}

function UpdateButton(condition, button){
    if (condition == true){
        button.style.display = "block";
    }
    else {
        button.style.display = "none";
    }
}

/// handle any custom properties when winodw is resized
//eg. when resize the menu doesnt reset so need to set it here
function HandleResize(){

    if (window.innerWidth <= 800) {
        menuItemsList.classList.remove("menuShow");
        menubtn.innerHTML="&#9776";
        menubtn.style.fontSize = "2em"
    }
    else {
        navBar.classList.remove("expand");
    }
}

window.addEventListener("resize", HandleResize);



////////////////////////////////////////////////////// BUTTONS //////////////////////////////////

//Theory page notation part
const theoryDrumBtn = document.getElementById("theoryPart1Btn1");
const theoryCymbalsBtn = document.getElementById("theoryPart1Btn2");
const theoryModifyBtn = document.getElementById("theoryPart1Btn3");
var allNotations = document.querySelectorAll("#theoryPart1 .displayPopup")

//main pages
const page1btn = document.getElementById("btnHistory");
const page2btn = document.getElementById("btnEquipment");
const page3btn = document.getElementById("btnMusicTheory");
const page4btn = document.getElementById("btnMusicGenre");
const page5btn = document.getElementById("btnExtra");
const page6btn = document.getElementById("btnHome");
var allpages = document.querySelectorAll(".page");


// Main pages
page1btn.addEventListener("click", function () {
    show("#page1",allpages);
});
page2btn.addEventListener("click", function () {
    show("#page2",allpages);
});
page3btn.addEventListener("click", function () {
    show("#page3",allpages);
});
page4btn.addEventListener("click", function () {
    show("#page4",allpages);
});
page5btn.addEventListener("click", function () {
    show("#page5",allpages);
});
page6btn.addEventListener("click", function () {
    show("#page6",allpages);
});

// Page 3 notation section
theoryDrumBtn.addEventListener("click", function () {
    show(".theoryDrums",allNotations);
});
theoryCymbalsBtn.addEventListener("click", function () {
    show(".theoryCymbals",allNotations);
});
theoryModifyBtn.addEventListener("click", function () {
    show(".theoryModify",allNotations);
});

hideall(allpages);
hideall(allNotations);


/////////////////////////////////////////////// NAV BAR
const menubtn = document.getElementById("hamBtn");
const menuItemsList = document.querySelector("#navbar ul");
const navBar = document.getElementById("navbar");

/*open and close menu*/
function toggleMenus(){
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if(menuItemsList.classList.contains("menuShow")){
        menubtn.innerHTML="Close Menu"; //change button text to chose menu
        menubtn.style.fontSize = "1.5em"
        navBar.classList.add("expand");

    }
    else{ //if menu NOT showing
        // &#9776 unicode for 3 bars
        menubtn.innerHTML="&#9776"; //change button text open menu
        menubtn.style.fontSize = "2em"
        navBar.classList.remove("expand");
    }
}
//Menu button
menubtn.addEventListener("click",toggleMenus);

/////////////////////////////////////////// EXTRAS FORMS ////////////////////////
//forms
const newsLetterBtn = document.getElementById("newsletterBtn");
const newsLetterForm = document.getElementById("newsletterform");
const submitformBtn = document.getElementById("submitformBtn");
const newsLetterInputs = document.querySelectorAll("#newsletter input");
const newsLetterTextInputs = newsLetterForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
const newsLetterRadioInputs = newsLetterForm.querySelectorAll('input[type="radio"]');
const newsLetterCheckboxInputs = newsLetterForm.querySelectorAll('input[type="checkbox"]');



newsLetterBtn.addEventListener("click", function () {
    newsLetterForm.classList.toggle("menuShow");
    if (newsLetterForm.classList.contains("menuShow"))
        newsLetterBtn.innerHTML = "Close Form";
    else {
        ResetForm();
        newsLetterBtn.innerHTML = "Sign Up Now!"
    }
});

submitformBtn.addEventListener("click", function () {
    // Call the function to do clean up after form submission
    alert("Thank you!");
    newsLetterBtn.click();
});

function IsNewsLetterFormFilled(){
    //Check if any blank space in text filled = false
    let isTextFilled = true;
    newsLetterTextInputs.forEach(input => {
        if (input.value.trim() === '') {
            isTextFilled = false;
        }
    });

    // Includes raido and checkbox
    let isRadioFilled = CheckInputFilled(newsLetterRadioInputs);

    let isCheckBoxFilled = false;
    // only check the first 4 options (the newsletter topics)
    for (let i = 0; i < 4; i++){
        if (newsLetterCheckboxInputs[i].checked) {
            isCheckBoxFilled = true;
            break;
        }
    }
    return isTextFilled && isCheckBoxFilled && isRadioFilled;
}

function ResetForm(){
    for (let text of newsLetterTextInputs){
        text.value = '';
    }
    for (let radio of newsLetterRadioInputs){
        radio.checked = false;
    }
    for (let checkbox of newsLetterCheckboxInputs){
        checkbox.checked = false;
    }
    submitformBtn.style.display = "none";
}

// Add event listeners to all the inputs so that can detect form detail change
for (let i = 0; i < newsLetterInputs.length; i++){
    newsLetterInputs[i].addEventListener("change",function () {
        UpdateButton(IsNewsLetterFormFilled(),submitformBtn);
    });
}


///////////////////////////////////////////////// TAIKO NO TATSUJIN /////////////////////////////////////
const taikoGame = document.getElementById("theoryPart5");
const taikoGameBtn = document.querySelector("#taikoGame button")
const target = document.getElementById("taikoTarget");
const taikoScore = document.getElementById("taikoScore");
//I set this to var to keep updating circle pool
var allActiveCircles = document.querySelectorAll(".taikoCircle");
var allActiveScorePoints = document.querySelectorAll(".taikoScorePoint");


//starting pos
const circleSpawn = 900;
const targetSpawn = 200;
const circleEnd = 160;
target.style.left = targetSpawn+"px";
target.style.top = "5px";

//game settings
const moveSpeed = 3;
const maxGameTime = 15;
var gameTimer = 0;
var gameStart = false;
var gameTimerIntervalActive = false;
var gameScore = 0;
var gameTimerInterval;
var timerDiv;



//different scores
const okHitRange = 50;
const goodHitRange = 20;
const perfectHitRange = 10;

const maxActiveCircles = 7;
var totalActiveCircles = 0;
var circleIDTracker = 0;
var spawnTime = 0;
let isTimeoutActive = false;


const TargetState =  {
    NONE: "none",
    MISS: "miss",
    OK: "ok",
    GOOD: "good",
    PERFECT: "pefect",
    CURRENT: ""
};

////////////////////////////////// GAME CONTROL BUTTON 
taikoGameBtn.addEventListener('click',function() {

    if (!gameStart){
        taikoGameBtn.innerHTML = "Stop Game";
        // Create countdown 
        var countDownDiv = document.createElement('div');
        countDownDiv.id = 'taikoCountDown';
        countDownDiv.style.position = 'absolute'
        countDownDiv.style.left = 500+"px";
        countDownDiv.style.top = "15px";
        countDownDiv.style.fontSize = "2em";
        countDownDiv.innerHTML = "3";
        taikoGame.appendChild(countDownDiv);
        const countdown = document.getElementById('taikoCountDown');

        taikoGameBtn.display = "none";
        let countdownInterval = setInterval(function() {
            var count = parseInt(countdown.innerHTML) - 1;
            countdown.innerHTML = count;
        },1000);        

        setTimeout(function() {
            clearInterval(countdownInterval);
            countdown.remove();
            taikoScore.display = 'block';
            gameStart = true;
            taikoScore.style.display = "block";

            timerDiv = document.createElement('div');
            timerDiv.id = 'taikoTimer';
            timerDiv.style.position = 'absolute'
            timerDiv.style.left = 500+"px";
            timerDiv.style.top = "15px";
            timerDiv.style.fontSize = "2em";
            timerDiv.innerHTML = maxGameTime - gameTimer;
            taikoGame.appendChild(timerDiv);
        },3000);

    }
    else {
        taikoGameBtn.innerHTML = "Start Game";
        gameStart = false;
        //reset all 
        for (let c of allActiveCircles){
            RemoveCircle(c);
        }
        totalActiveCircles = 0;
        circleIDTracker = 0;
        spawnTime = 0;
        isTimeoutActive = false;
        gameScore = 0;
        gameTimer = 0;
        taikoScore.style.display = 'none';
    }
});

//////////////////////////////////// TAIKO GAME UPDATE ///////////////////////////
requestAnimationFrame(TaikoGameUpdate);


document.addEventListener('keyup', (e) => {
    if (gameStart){
        console.log("Key pressed:", e.code); // Add this line
        var closestCircle = FindClosestCircle();
        //check collision
        CheckDrumHit(target,closestCircle);
        HandleGameInput(e,closestCircle);
        if (e.code === "KeyV" || e.code === "KeyB")
            HandleScoreVisual(closestCircle);
    }
});

function TaikoGameUpdate() {
    taikoGame.style.backgroundColor = "burlywood";
    if (gameStart) {
        for (let c of allActiveCircles) {
            MoveCircle(c);
            //if reach the end 
            if ((parseInt(c.style.left) < circleEnd)){
                //miss if have to remvoe via this way 
                TargetState.CURRENT = TargetState.MISS;
                HandleScoreVisual(c);
                RemoveCircle(c);
            }
        }

        SpawnCircle();
        //always check
        allActiveCircles = document.querySelectorAll(".taikoCircle");
        allActiveScorePoints = document.querySelectorAll(".taikoScorePoint");
        UpdatePlayerScore();
        UpdateGameTimer(); 
    }
    LoopAnimation();
    TargetState.CURRENT = TargetState.NONE;
    gameUpdate = requestAnimationFrame(TaikoGameUpdate);

}


function CheckDrumHit(target,circle) {
    var targetPos = parseInt(target.style.left);
    var circlePos = parseInt(circle.style.left);
    var validHit = false;
    //Use max hitrange to determine goo
    if ((circlePos < targetPos + okHitRange) && (circlePos > targetPos - okHitRange)){
        TargetState.CURRENT = TargetState.OK;
        validHit = true;
    }
    if ((circlePos < targetPos + goodHitRange) && (circlePos > targetPos - goodHitRange)){
        TargetState.CURRENT = TargetState.GOOD;
        validHit = true;
    }
    if ((circlePos < targetPos + perfectHitRange) && (circlePos > targetPos - perfectHitRange)){
        TargetState.CURRENT = TargetState.PERFECT;
        validHit = true;
    }

    if (validHit){
        taikoGame.style.backgroundColor = "red";
        return true;
    }
    else {
        TargetState.CURRENT = TargetState.MISS;
        return false;
    }

}

function MoveCircle(circle) {
    if (circle.isActive) {
        var newPos = parseInt(circle.style.left) - moveSpeed;
        circle.style.left = newPos+"px";
    }
}

function RemoveCircle(circle) {
    circle.isActive = false;
    //despawn
    const toDelete = document.getElementById(circle.id);
    if (toDelete) {
        toDelete.remove();
        totalActiveCircles -= 1;
    }
}

//Dynamic generation
//randomize spawn time
function SpawnCircle() {
    if (totalActiveCircles < maxActiveCircles) {

        //Generate random spawn timer
        if (spawnTime == 0) {
            var randNum = GetRandom(1,3);
            spawnTime = randNum * 1000;
        }
        else {
            if (!isTimeoutActive) {

                // Set colour of the circle
                var randCol = GetRandom(1,2);
                var colour = "";
                if (randCol == 1)
                    colour = "red";
                else if (randCol == 2)
                    colour = "blue";

                setTimeout(function()  {
                    
                    // Need to put game start to prevent spawning after game has ended
                    if (gameStart) {

                        //add new circle 
                        circleIDTracker++;
                        var newDiv = document.createElement('div');
                        newDiv.className = 'taikoCircle';
                        newDiv.style.left = circleSpawn+"px";
                        newDiv.style.top = "5px";
                        newDiv.id = `circle${circleIDTracker}`
                        newDiv.style.backgroundColor = colour;
                        //set custom
                        newDiv.isActive = true;
                        newDiv.circleColour = colour;

                        taikoGame.appendChild(newDiv);
                        totalActiveCircles++;

                        //reset
                        spawnTime = 0;
                        isTimeoutActive = false;
                    }
                },spawnTime);

                isTimeoutActive = true;
            }
        }
    }
}

function HandleGameInput(input,closestcircle) {
    //security check
    if (!closestcircle)
        return;

    // At this point collision would have been successful
    if (input.code === "KeyV" || input.code === "KeyB"){
        if (TargetState.CURRENT == TargetState.MISS){
            console.log("MISS");
        }
        else  {
            //set colour
            var targetColour = "";
            if (input.code === "KeyV")
                targetColour = "blue";
            else if (input.code === "KeyB")
                targetColour = "red";

            //check if colour correct 
            if (closestcircle.circleColour == targetColour){
                if (TargetState.CURRENT == TargetState.OK) {
                    console.log("OK");
                }
                if (TargetState.CURRENT == TargetState.GOOD) {
                    console.log("GOOD");
                }
                if (TargetState.CURRENT == TargetState.PERFECT) {
                    console.log("PERFECT");
                }
            }
            else {
                //set state to miss if colour is wrong 
                TargetState.CURRENT = TargetState.MISS
                console.log("MISS");
            }
        }

        //always delete if key pressed
        RemoveCircle(closestcircle);
    }
}


function HandleScoreVisual(closestCircle) {
    // hit point that spawns from closest circle 
    var scoreDisplay;
    //check what score to display 
    switch(TargetState.CURRENT){
        case TargetState.OK:
            scoreDisplay = "taiko30k";
            break;
        case TargetState.GOOD:
            scoreDisplay = "taiko100k";
            break;
        case TargetState.PERFECT:
            scoreDisplay = "taiko300k";
            break;
        case TargetState.MISS:
            scoreDisplay = "taikomiss";
            break;
    }
    var newPoint = document.createElement('div');
    newPoint.className = 'taikoScorePoint ' + scoreDisplay;
    newPoint.style.left = closestCircle.style.left;
    taikoGame.appendChild(newPoint);

    // Trigger animation after a delay to trigger animation 
    setTimeout(function() {
        newPoint.classList.add('transparent');
        newPoint.classList.add('floatup');
    },10);
}

function FindClosestCircle(){
    var minDistance = 10000;
    var closestCircle = null;
    for (let c of allActiveCircles) {
        var distance = Math.abs(parseInt(c.style.left) - targetSpawn);
        if (distance < minDistance) {
            minDistance = distance;
            closestCircle = c;
        }
    }
    return closestCircle;
}

//taiko animation 
const taikoSprite = document.getElementById("taikoSprite");
let isTaikoAnimating = false;
//Taiko animation could consider making it into a reusable function 
function LoopAnimation(){
    if (!isTaikoAnimating) {
        taikoSprite.classList.add("taikoAnim");
        isTaikoAnimating = true;
        setTimeout(function(){ 
            taikoSprite.classList.remove("taikoAnim");
            isTaikoAnimating = false;
        }, 5000);
    }
}

//score board
function UpdatePlayerScore(){
    switch(TargetState.CURRENT){
        case TargetState.OK:
            gameScore += 30;
            break;
        case TargetState.GOOD:
            gameScore += 100;
            break;
        case TargetState.PERFECT:
            gameScore += 300;
            break;
        //no point for break 
    }
    taikoScore.innerHTML = gameScore;
}


//for end game timer 
function UpdateGameTimer(){

    if (gameStart) {
        //set up the interval 
        if (!gameTimerIntervalActive) {
            gameTimerInterval = setInterval(function() {
                gameTimer++;
            },1000);
            gameTimerIntervalActive = true;
        }
        timerDiv.innerHTML = maxGameTime - gameTimer;
        if (gameTimer > maxGameTime){
            taikoGameBtn.click();
            timerDiv.remove();
            gameTimerIntervalActive = false;
        }
    }
}



//////////////////////////////////////////////////// DRUM KIT SOUND GAME /////////////////////////////////////////

//Event delegation (doenst work with keyboard yet I think)
const drumGameBassDrum = document.querySelector("#drumKitBassDrum")
const drumGameDrums = document.querySelector("#drumKitDrums");
const drumGameCymbals = document.querySelector("#drumKitCymbals");
var AudioListDrums = ['snaredrum','midtom','hightom','floortom','kickdrum'];
var AudioListCymbals = ['hihats','crashcymbal','ridecymbal'];

drumGameBassDrum.addEventListener("click",function(evt){
    BassDrumAnim(evt);
    var audio = new Audio('audio/'+AudioListDrums[4]+'.mp3');
    audio.currentTime = 0;  
    audio.play();
});

drumGameDrums.addEventListener("click",function(evt){
    AddAnimClass(evt,200,'scaleup');
    AddAnimClass(evt,500,'shakeAnim');
    var drumIndex = 0;
    switch(evt.target){
        case this.children[0]:
            drumIndex = 0;
            break;
        case this.children[1]:
            drumIndex = 1;
            break;
        case this.children[2]:
            drumIndex = 2;
            break;
        case this.children[3]:
            drumIndex = 3;
            break;
        default:
            drumIndex = -1; 
            break;
    }
    var audio = new Audio('audio/'+AudioListDrums[drumIndex]+'.mp3');
    audio.currentTime = 0;  
    audio.play();
});

drumGameCymbals.addEventListener("click", function(evt){
    AddAnimClass(evt,1000,'skew');
    // set default as ride cymbal
    var cymbalIndex = 0;
    switch(evt.target){
        case this.children[0]:
            cymbalIndex = 0;
            break;
        case this.children[1]:
            cymbalIndex = 1;
            break;
        default:
            cymbalIndex = 2; 
            break;
    }
    var audio = new Audio('audio/'+AudioListCymbals[cymbalIndex]+'.mp3');
    audio.currentTime = 0;  
    audio.play();
});

function BassDrumAnim(evt){
    //add scale only to drum
    var drum = document.querySelector("#drumKitBassDrum div:nth-of-type(1)")
    var fakeDrumEvent = { target: drum };
    AddAnimClass(fakeDrumEvent,200,'scaleup');

    var hammer = document.querySelector("#drumKitBassDrum div:nth-of-type(4)");
    var fakeHammerEvent = { target: hammer };
    AddAnimClass(fakeHammerEvent,200,'hammerRotate');

    var pedal = document.querySelector("#drumKitBassDrum div:nth-of-type(2)");
    var fakePedalEvent = { target: pedal };
    AddAnimClass(fakePedalEvent,200,'pedalTriggered');


}

function AddAnimClass(evt, time, name){
    var sender = evt.target; 
    sender.classList.add(name);
    
    setTimeout(() => {
        sender.classList.remove(name);
    }, time);
}

////////////////////////////////////// SHOP //////////////////////////////////////
// prevent buttons breaking
var inViewMode = false;
var shopItemIndex = -1;
const shop = document.getElementById("shop");
const allShopItems = document.querySelectorAll("#shop > div");
const shopFunction = document.getElementById('shopFunctions');
const shopExit = document.getElementById('exitButton');
const shopCheckoutBtn = document.getElementById('checkoutButton');
const shopCheckout  = document.getElementById('shopcheckout');
const purchaseBtn = document.querySelector('#shopcheckout button');

// EXIT BUTTON from shop 
shopExit.addEventListener("click", function(evt){
    // Prevent the click from bubbling up to the shop
    evt.stopPropagation(); 
    let allShopItems=document.querySelectorAll("#shop > div");
    // reset functionalities 
    for (let shopItem of allShopItems){
        shopItem.style.display ='flex';
        shopItem.classList.add('displayMode');
        var shopFigure = shopItem.querySelector('figure');
        var shopDetail = shopItem.querySelector('.shopDetail');
        shopFigure.classList.remove("displayMode");
        shopDetail.classList.remove("displayMode");
        shopItem.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
    }
    shopFunctions.style.display = 'none';
    shop.style.display = 'grid';
    inViewMode = false;

});

// CHECK OUT TO SHOP 
shopCheckoutBtn.addEventListener("click", function(){
    var checkoutImg = document.getElementById('shopPurchase');
    // open up checkout page 
    shop.style.display = 'none';
    shopCheckout.style.display = 'block';
    var checkOutOutput = document.querySelector('#shopcheckout > div p');
    var shopItem = document.querySelector(`#shop div:nth-of-type(${shopItemIndex})`);

    //add the image 
    checkoutImg.classList.add(`shopItem${shopItemIndex}`);
    //add respective properties 
    let checkedOption = shopItem.querySelector('input[type="radio"]:checked');
    if (checkedOption.name === 'size'){
        checkOutOutput.innerHTML = "Size: "+checkedOption.value+"''";
    }
    else if (checkedOption.name === 'colour'){
        checkOutOutput.innerHTML = "Colour: "+checkedOption.value;
    }
});

purchaseBtn.addEventListener("click",function(){
    alert("Thank you for your purchase!");
});

shop.addEventListener("click", function(evt) {
    if (!inViewMode)
        ShopEventHandler(evt);
});

function ShopEventHandler(evt){

    var sender = evt.target;
    shopItemIndex = Array.from(allShopItems).indexOf(sender) + 1;
    // show the relevant image clicked
    var shopItem = document.querySelector(`#shop div:nth-of-type(${shopItemIndex})`);
    show(`#shop div:nth-of-type(${shopItemIndex})`,allShopItems);


    //change styling of the components
    shop.style.display = 'block';
    shopItem.classList.add('displayMode');
    var shopImage = shopItem.querySelector('.shopImg');
    var shopFigure = shopItem.querySelector('figure');
    var shopDetail = shopItem.querySelector('.shopDetail');
    // active shop display 
    shopFigure.classList.add("displayMode");
    shopDetail.classList.add("displayMode");

    //activate shop functions
    shopFunctions.style.display = 'block';

    // disable all clicking from this 
    inViewMode = true;

}






/////////////////////////////// WINDOW FUNCTIONALITY /////////////////////////
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");
btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
document.documentElement.requestFullscreen();
}
function exitFullscreen() {
document.exitFullscreen();
}







////////////////////////////////////////////////////  AUDIOS  /////////////////////////////////////////
// Classes op
class AudioTrack {
    name;
    audio;
    button;
    constructor(name, audioPath, button){
        this.name = name;
        this.audio = new Audio(audioPath);
        this.button = button;
    }
}

//for music theory page, ryhthms
const rhythmsRockBeat = document.getElementById("looprockBtn");
const rhythmsBluesBeat = document.getElementById("loopbluesBtn");
const rhythmsMotownBeat = document.getElementById("loopmotownBtn");
const allAudios = [
    new AudioTrack("rock", "audio/rockdrum.mp3", rhythmsRockBeat),
    new AudioTrack("blues", "audio/bluesdrum.mp3", rhythmsBluesBeat),
    new AudioTrack("motown", "audio/motowndrum.mp3", rhythmsMotownBeat)
]

// Helper function to pause all audios in the list
function StopAllAudios(audioList) {
    for (let audioTrack of audioList){
        audioTrack.audio.pause();
        audioTrack.audio.currentTime = 0;
    }
}

/////////////// Audio player for one shot audios
for (let audioTrack of allAudios){
    audioTrack.button.addEventListener("click", function() {
        StopAllAudios(allAudios);
        audioTrack.audio.play();
    });
}


















/////////////////////////////////  LEARNING /////////////////////////////////////
const aField = document.querySelector("#aField");
const bField = document.querySelector("#bField");
const sumBox = document.querySelector("#sum-box");
const sumButton = document.querySelector("#sum");
// sumButton.addEventListener("click", doSum);
function doSum() {
//.value is property to get data from input element
//parseInt to convert into number
let a = parseFloat(aField.value);
let b = parseFloat(bField.value);

sumBox.innerHTML += "Sum of "+a+" and "+b+" is " + (a+b) +".<br>";
sumBox.innerHTML += "Difference of "+a+" and "+b+" is " + (a-b) +".<br>";
sumBox.innerHTML += "Product of "+a+" and "+b+" is " + (a*b) +".<br>";
sumBox.innerHTML += "Quotient of "+a+" and "+b+" is " + (a/b) +".<br>";
sumBox.innerHTML += "Area of rectangle of "+a+" and "+b+" is " + (a*b) +".<br>";
sumBox.innerHTML += "Area of triangle of "+a+" and "+b+" is " + (a*b)/2 +".<br>";
}

var min=0, max=100, currGuess=-100, counter=0;
var ans=Math.round(Math.random()*(max-min)+min);
console.log("Ans:"+ans);
const btnGuess=document.querySelector("#btnGuess");
const guessField=document.querySelector("#guessField");
const smallerlbl=document.querySelector("#smaller");
const biggerlbl=document.querySelector("#bigger");
const commentsBox=document.querySelector("#commentsBox");
// btnGuess.addEventListener("click",GuessFn);


function GuessFn(){
    currGuess=parseInt(guessField.value);
    console.log("Curr Guess:"+currGuess);
    let comments="";
    if(currGuess==ans){
    comments="CORRECT!";
    }
    if(currGuess>ans){
    //replace the right number with current guess
    biggerlbl.innerHTML=currGuess;
    comments="too Big!";
    }
    if(currGuess<ans){
    //replace the left number with current guess
    smallerlbl.innerHTML=currGuess;
    comments="too Small!";
    }
    guessField.value="";
    counter++;
    //commentsBox.innerHTML="Your guess: "+currGuess+" is "+comments+”;
    // Tries:"+counter;
    //use template literals (backticks)
    commentsBox.innerHTML=`Your guess: ${currGuess} is ${comments} Tries:
    ${counter}`;
}



// var q1,q2,q3,score= 0;
// function CheckAns(){
//     q1=document.querySelector("input[name='q1']:checked").value;
//     q2=document.querySelector("input[name='q2']:checked").value;
//     q3=document.querySelector("input[name='q3']:checked").value;
//     console.log(q1);
//     console.log(q2);
//     console.log(q3);
//     score = 0;
//     if (q1=="Tokyo") score++;
//     if (q2=="Red") score++;
//     if (q3=="12_1941") score++;
//     scorebox.innerHTML="Score:"+score;
// }
// btnSubmit.addEventListener("click", CheckAns);


const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");

var score = 0;
testAns=["Tokyo", "Red", "12_1941"];

function CheckAnswer(input, correctAns){
   if (input == correctAns)
    return true;
   else
    return false;
}


function CheckQuiz(quizAnswers, quizScore) {
    i = 1;
    for (let ans of quizAnswers) {
        let userInput = document.querySelector("input[name='q" + i + "']:checked").value;
        if (CheckAnswer(userInput,ans))
            quizScore++;
        i++
    }
    scorebox.innerHTML="Score:"+quizScore;
}

// Do the function thing here
// btnSubmit.addEventListener("click", CheckQuiz(testAns,score));



// //Event Delegation Example
// //setup an array store color strings
// const colorArray = ["red", "green", "blue", "pink", "cyan"];
// const dynamicArea = document.querySelector("#dynamicArea");
// var idcount=0; //to generate unique id
// addBtn=document.querySelector("#addBtn");
// addBtn.addEventListener("click",addElement);
// remBtn=document.querySelector("#remBtn");
// remBtn.addEventListener("click",function(){dynamicArea.replaceChildren();});
// function addElement(){ //add a new element, assign new id
//     var childCount=dynamicArea.children.length;
//     var newDiv = document.createElement('div');
//     newDiv.id = 'new-id-'+(idcount++); //increment id
//     newDiv.textContent = "id:"+newDiv.id;
//     newDiv.className = 'new-class';
//     let colorVar=colorArray[idcount%colorArray.length];
//     newDiv.style.background = colorVar;
//     dynamicArea.appendChild(newDiv);
// }
// //add eventlistner to parent, as delegate
// dynamicArea.addEventListener("click",SomeFn);
// function SomeFn(evt){
//     console.log(this); //see who received.
//     var sender=evt.target;
//     console.log(sender); //see who is sender
//     sender.remove();
// }