
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
        menubtn.style.fontSize = "2em";
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
var allNotations = document.querySelectorAll("#theoryPart1 .displayPopup");

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
        menubtn.style.fontSize = "1.5em";   
        navBar.classList.add("expand");
        navBar.style.opacity = "1";
    }
    else{ //if menu NOT showing
        // &#9776 unicode for 3 bars
        menubtn.innerHTML="&#9776"; //change button text open menu
        menubtn.style.fontSize = "2em";
        navBar.classList.remove("expand");
        navBar.style.opacity = "0.7";
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
        newsLetterBtn.innerHTML = "Sign Up Now!";
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
    newsLetterTextInputs.forEach(function(input) {
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
        UpdateButton(IsNewsLetterFormFilled,submitformBtn);
    });
}


///////////////////////////////////////////////// TAIKO NO TATSUJIN /////////////////////////////////////
const taikoGame = document.getElementById("theoryPart5");
const taikoGameBtn = document.querySelector("#taikoGame button");
const target = document.getElementById("taikoTarget");
const taikoScore = document.getElementById("taikoScore");
const taikoMobileButtons = document.querySelectorAll("#taikoButtonMode button");
//I set this to var to keep updating circle pool
var allActiveCircles = document.querySelectorAll(".taikoCircle");
var allActiveScorePoints = document.querySelectorAll(".taikoScorePoint");


// IMPORTANT BOOLEAN TO DETERMINE WHETHER IN MOBILE MODE, triggered in window resize function above 
//set true for debug
var isTaikoMobile = false;

//starting pos
var circleSpawn = 50;
var targetSpawn = 14;
var circleEnd = targetSpawn - 2;
target.style.left = targetSpawn+"vw";
target.style.top = "1vh";

//game settings
const moveSpeed = 0.5;
const maxGameTime = 15;
var gameTimer = 0;
var gameStart = false;
var gameTimerIntervalActive = false;
var gameScore = 0;
var gameTimerInterval;
var timerDiv;



//different scores
const okHitRange = 5;
const goodHitRange = 2;
const perfectHitRange = 0.8;

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
        countDownDiv.style.position = 'absolute';
        countDownDiv.style.left = 50 +"%";
        countDownDiv.style.top = "3vh";
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
            timerDiv.style.position = 'absolute';
            timerDiv.style.left = 50 +"%";
            timerDiv.style.top = "1vh";
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


document.addEventListener('keyup', function(e) {
    HandleKeyInput(e.code);
});

//for mobile
taikoMobileButtons[0].addEventListener('click',function(){
    HandleKeyInput('KeyV');
});
taikoMobileButtons[1].addEventListener('click',function(){
    HandleKeyInput('KeyB');
});

function TaikoGameUpdate() {
    taikoGame.style.backgroundColor = "burlywooFd";
    if (gameStart) {
        for (let c of allActiveCircles) {
            MoveCircle(c);
            //if reach the end 
            if ((parseFloat(c.style.left) <  circleEnd)){
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
    TaikoMobileMode();
    // console.log(parseFloat(target.style.left));
   requestAnimationFrame(TaikoGameUpdate);

}

function HandleKeyInput(keyCode) {
    if (!gameStart) return;

    var closestCircle = FindClosestCircle();
    CheckDrumHit(target, closestCircle);
    // create a fake object that for keyboard event
    let fakeEvent = { code: keyCode };
    HandleGameInput(fakeEvent, closestCircle);

    if (keyCode === "KeyV" || keyCode === "KeyB") {
        HandleScoreVisual(closestCircle);
    }
}


function CheckDrumHit(target,circle) {

    var targetPos; 
    var circlePos;
    if (!isTaikoMobile) {
        targetPos = parseFloat(target.style.left);
        circlePos = parseFloat(circle.style.left);
    }
    else {
        targetPos = parseFloat(target.style.top);
        circlePos = parseFloat(circle.style.top); 
    }


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
        return true;
    }
    else {
        TargetState.CURRENT = TargetState.MISS;
        return false;
    }

}

function MoveCircle(circle) {
    var newPos;
    if (circle.isActive) {
        if (!isTaikoMobile) {
            newPos = parseFloat(circle.style.left) - moveSpeed;
            circle.style.left = newPos+"vw";
        }
        else{
            newPos = parseFloat(circle.style.top) + moveSpeed;
            circle.style.top = newPos+"vh";
        }

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
                        if (!isTaikoMobile) {
                            newDiv.style.left = circleSpawn+"vw";
                            newDiv.style.top = "1vh";
                        }
                        else{
                            newDiv.style.left = "37%";
                            newDiv.style.top = circleSpawn + 'vh';
                        }
                        newDiv.id = "circle"+circleIDTracker;
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
                TargetState.CURRENT = TargetState.MISS;
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
    if (!isTaikoMobile)
        newPoint.style.left = closestCircle.style.left;
    else {
        newPoint.style.top = closestCircle.style.top;
        newPoint.style.left = closestCircle.style.left;

    }

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
        var distance; 
        // mobile check
        if (!isTaikoMobile)
            distance = Math.abs(parseFloat(c.style.left) - targetSpawn);
        else 
            distance = Math.abs(parseFloat(c.style.top) - targetSpawn);
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

function TaikoMobileMode(){

    //better checker for the screen 
    if (window.innerWidth <= 800) {
        isTaikoMobile = true;
    }
    else {  
        isTaikoMobile = false;
    }


    //reset back to default settings
    if (!isTaikoMobile){
        target.style.left = targetSpawn+"vw";
        target.style.top = "1vh";
        circleSpawn = 50;
        targetSpawn = 14;
    }
    // else run special settings 
    else{
        // get the new position of target from the css 
        targetSpawn = 57;
        circleSpawn = 1;
        target.style.top = targetSpawn + "vh";
    }
}



//////////////////////////////////////////////////// DRUM KIT SOUND GAME /////////////////////////////////////////

//Event delegation (doenst work with keyboard yet I think)
const drumGameBassDrum = document.querySelector("#drumKitBassDrum");
const drumGameDrums = document.querySelector("#drumKitDrums");
const drumGameCymbals = document.querySelector("#drumKitCymbals");
var AudioListDrums = ['snaredrum','midtom','hightom','floortom','kickdrum'];
var AudioListCymbals = ['hihats','crashcymbal','ridecymbal'];

drumGameBassDrum.addEventListener("click",function(){
    BassDrumAnim();
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

function BassDrumAnim(){
    //add scale only to drum
    var drum = document.querySelector("#drumKitBassDrum div:nth-of-type(1)");
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
    
    setTimeout(function(){
        sender.classList.remove(name);
    }, time);
}

//////////////////////////////////////////  GAME QUIZ /////////////////////////////////
const btnSubmit = document.querySelector("#btnSubmit");
const scorebox=document.querySelector("#scorebox");
const listOfQns = document.querySelectorAll("#drumQuiz fieldset");
const nextQnBtn = document.getElementById("nextQn");
const quizGame = document.getElementById("drumQuiz");
var isQuizActive = true;
var currentQnIndex = 1;
var score=0;
var testAns=["Tokyo", "Red"];

//start by hiding everything and showing only first question 
show("#drumQuiz fieldset:nth-of-type(1)", listOfQns);

btnSubmit.addEventListener("click", function() {

    CheckQuiz(testAns,score);
});

nextQnBtn.addEventListener("click", function() {
    NextQn();

});

requestAnimationFrame(canGoNextQn);


function CheckAnswer(input, correctAns){
   if (input == correctAns)
    return true;
   else
    return false;   
}


function CheckQuiz(quizAnswers, quizScore) {
    var i = 1;
    for (let ans of quizAnswers) {
        let userInput = document.querySelector("input[name='drumq" + i + "']:checked").value;
        if (CheckAnswer(userInput,ans))
            quizScore++;
        i++;
    }
    scorebox.innerHTML="Score:"+quizScore;
    if (isQuizActive){
        quizGame.style.display = 'none';
        btnSubmit.innerHTML= "Restart Quiz";
        isQuizActive = false;
    }
    else {
        quizGame.style.display = 'block';
        btnSubmit.innerHTML= "Submit Quiz";
        btnSubmit.style.display = 'none';
        currentQnIndex = 1;
        score = 0;
        show("#drumQuiz fieldset:nth-of-type(1)", listOfQns);
        isQuizActive = true;

    }
}


function canGoNextQn(){
    if (isQuizActive) {
        var shouldNexQn = false;
        let optionList = document.querySelectorAll("input[name='drumq" + currentQnIndex + "']");
        for (let option of optionList){
            if (option.checked){
                shouldNexQn = true;
            }
        }
        // checker for end game 
        if ((currentQnIndex + 1 > testAns.length) && shouldNexQn){
            btnSubmit.style.display = "block";
            shouldNexQn = false;
        }

        if (shouldNexQn) {
            nextQnBtn.style.display = "block";
        }
        else{
            nextQnBtn.style.display = "none";
        }
    }
    requestAnimationFrame(canGoNextQn);
}

function NextQn(){
    if (currentQnIndex + 1 < testAns.length){
        currentQnIndex++;
        show(`#drumQuiz fieldset:nth-of-type(${currentQnIndex})`, listOfQns);
    }
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
];

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





