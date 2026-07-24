// /* ==========================================
//    TYPEMASTER PRO
//    PART 1-A
//    VARIABLES + ELEMENTS
// ========================================== */

// // ===============================
// // ELEMENTS
// // ===============================

// const testDisplay = document.getElementById("testDisplay");
// const typingInput = document.getElementById("typingInput");

// const startBtn = document.getElementById("startBtn");
// const restartBtn = document.getElementById("restartBtn");

// const timerDisplay = document.getElementById("timer");
// const wpmDisplay = document.getElementById("wpm");
// const accuracyDisplay = document.getElementById("accuracy");
// const mistakesDisplay = document.getElementById("mistakes");

// const progressBar = document.getElementById("progressBar");

// const resultCard = document.getElementById("resultCard");
// const resultWpm = document.getElementById("resultWpm");
// const resultAccuracy = document.getElementById("resultAccuracy");
// const resultMistakes = document.getElementById("resultMistakes");


// // ===============================
// // VARIABLES
// // ===============================

// let words = [];
// let currentWord = 0;

// let time = 30;
// let timer = null;
// let started = false;

// let totalTyped = 0;
// let correctChars = 0;
// let wrongChars = 0;

// let totalCorrectWords = 0;
// let totalWrongWords = 0;

// let testFinished = false;


// // ===============================
// // RESET TEST
// // ===============================

// function resetTest() {

// clearInterval(timer);

// started = false;
// testFinished = false;

// currentWord = 0;

// totalTyped = 0;
// correctChars = 0;
// wrongChars = 0;

// totalCorrectWords = 0;
// totalWrongWords = 0;

// typingInput.value = "";
// typingInput.disabled = true;

// timerDisplay.innerHTML = time;
// wpmDisplay.innerHTML = "0";
// accuracyDisplay.innerHTML = "100%";
// mistakesDisplay.innerHTML = "0";

// progressBar.style.width = "0%";

// if(resultCard){
// resultCard.style.display = "none";
// }

// }
// /* ==========================================
//    TYPEMASTER PRO
//    PART 1-B
//    LOAD PARAGRAPH + RENDER WORDS
// ========================================== */

// // ===============================
// // LOAD RANDOM PARAGRAPH
// // ===============================

// function loadTest(){

// const randomIndex =
// Math.floor(Math.random() * paragraphs.length);

// const text =
// paragraphs[randomIndex].trim();

// words = text.split(/\s+/);

// currentWord = 0;

// renderWords();

// }


// // ===============================
// // RENDER WORDS
// // ===============================

// function renderWords(){

// testDisplay.innerHTML = "";

// words.forEach((word, wordIndex)=>{

// const wordSpan =
// document.createElement("span");

// wordSpan.className = "word";

// if(wordIndex===0){
// wordSpan.classList.add("active");
// }

// for(let i=0;i<word.length;i++){

// const letter =
// document.createElement("span");

// letter.className="letter";

// letter.innerText=word[i];

// wordSpan.appendChild(letter);

// }

// testDisplay.appendChild(wordSpan);

// testDisplay.appendChild(
// document.createTextNode(" ")
// );

// });

// }


// // ===============================
// // START BUTTON
// // ===============================

// if(startBtn){

// startBtn.addEventListener("click",()=>{

// if(started) return;

// loadTest();

// resetTest();

// typingInput.disabled=false;

// typingInput.focus();

// started=true;

// startTimer();

// });

// }


// // ===============================
// // RESTART BUTTON
// // ===============================

// if(restartBtn){

// restartBtn.addEventListener("click",()=>{

// location.reload();

// });

// }

// /* ==========================================
//    TYPEMASTER PRO
//    PART 1-C
//    TIMER + INITIALIZATION
// ========================================== */


// // ===============================
// // START TIMER
// // ===============================

// function startTimer(){

// timer = setInterval(()=>{


// time--;

// timerDisplay.innerHTML = time;



// if(time <= 0){

// endTest();

// }


// },1000);

// }



// // ===============================
// // END TEST
// // ===============================

// function endTest(){

// clearInterval(timer);

// typingInput.disabled = true;

// started = false;

// testFinished = true;

// showResult();

// }



// // ===============================
// // TIME BUTTONS
// // ===============================

// const timeButtons =
// document.querySelectorAll(".time-btn");


// if(timeButtons.length){


// timeButtons.forEach((btn)=>{


// btn.addEventListener("click",()=>{


// timeButtons.forEach((b)=>{

// b.classList.remove("active");

// });


// btn.classList.add("active");



// if(btn.innerHTML.includes("60")){

// time = 60;

// }

// else if(btn.innerHTML.includes("120")){

// time = 120;

// }

// else{

// time = 30;

// }


// timerDisplay.innerHTML = time;


// });


// });


// }



// // ===============================
// // PAGE LOAD
// // ===============================

// window.addEventListener("load",()=>{


// typingInput.disabled = true;


// if(resultCard){

// resultCard.style.display="none";

// }


// timerDisplay.innerHTML = time;


// });
// /* ==========================================
//    TYPEMASTER PRO
//    PART 2
//    LETTER TYPING ENGINE
// ========================================== */


// // ===============================
// // TYPING INPUT SYSTEM
// // ===============================


// typingInput.addEventListener("input",()=>{


// if(!started) return;


// let typed = typingInput.value;


// let currentWordText = 
// words[currentWord];


// let letters =
// document.querySelectorAll(
// ".word"
// )[currentWord].children;



// // Reset colors

// for(let i=0;i<letters.length;i++){

// letters[i].classList.remove(
// "correct",
// "wrong"
// );

// }



// // Check letters

// for(
// let i=0;
// i<typed.length;
// i++
// ){


// if(letters[i]){


// if(
// typed[i] === currentWordText[i]
// ){

// letters[i].classList.add(
// "correct"
// );


// }
// else{


// letters[i].classList.add(
// "wrong"
// );


// }


// }



// }



// // Count typing

// updateTypingStats();



// });




// // ===============================
// // SPACE = NEXT WORD
// // ===============================


// typingInput.addEventListener(
// "keydown",
// (e)=>{


// if(e.key === " "){


// e.preventDefault();



// let typed =
// typingInput.value.trim();



// let current =
// words[currentWord];



// // Word Result

// if(
// typed === current
// ){


// totalCorrectWords++;


// }
// else{


// totalWrongWords++;


// }



// // Next word

// currentWord++;

// typingInput.value="";



// // Remove old active

// document
// .querySelectorAll(".word")
// .forEach((word)=>{

// word.classList.remove(
// "active"
// );

// });



// // Add new active

// if(currentWord < words.length){


// document
// .querySelectorAll(".word")
// [currentWord]
// .classList.add(
// "active"
// );


// }
// else{


// endTest();


// }



// updateProgress();



// }



// });
// /* ==========================================
//    TYPEMASTER PRO
//    PART 3
//    WPM + ACCURACY + PROGRESS
// ========================================== */


// // ===============================
// // UPDATE TYPING STATS
// // ===============================

// function updateTypingStats(){


// let allLetters =
// document.querySelectorAll(".letter");



// correctChars =
// document.querySelectorAll(
// ".correct"
// ).length;



// wrongChars =
// document.querySelectorAll(
// ".wrong"
// ).length;



// totalTyped =
// correctChars + wrongChars;



// updateAccuracy();


// updateWpm();


// updateMistakes();


// }



// // ===============================
// // ACCURACY
// // ===============================


// function updateAccuracy(){


// if(totalTyped===0){


// accuracyDisplay.innerHTML="100%";

// return;


// }



// let accuracy =

// (correctChars / totalTyped) * 100;



// accuracyDisplay.innerHTML =

// Math.round(accuracy) + "%";


// }



// // ===============================
// // MISTAKES
// // ===============================


// function updateMistakes(){


// mistakesDisplay.innerHTML =
// wrongChars;


// }




// // ===============================
// // WPM
// // ===============================


// function updateWpm(){



// let timeUsed =
// (30 - time);



// if(timeUsed <= 0){

// return;

// }



// let wordsTyped =

// correctChars / 5;



// let wpm =

// Math.round(

// (wordsTyped / timeUsed) * 60

// );



// wpmDisplay.innerHTML = wpm;


// }



// // ===============================
// // PROGRESS BAR
// // ===============================


// function updateProgress(){


// let progress =

// (

// currentWord /

// words.length

// ) * 100;



// if(progressBar){


// progressBar.style.width =
// progress + "%";


// }



// }



// // ===============================
// // AUTO SCROLL
// // ===============================


// function autoScroll(){


// let activeWord =
// document.querySelector(
// ".word.active"
// );



// if(activeWord){


// activeWord.scrollIntoView({

// behavior:"smooth",

// block:"center"

// });


// }



// }


// // Auto scroll when word changes

// typingInput.addEventListener(
// "keydown",
// (e)=>{


// if(e.key===" "){

// setTimeout(()=>{

// autoScroll();

// },100);


// }


// });
// /* ==========================================
//    TYPEMASTER PRO
//    PART 4
//    RESULT + SAVE SYSTEM
// ========================================== */


// // ===============================
// // SHOW RESULT
// // ===============================

// function showResult(){


// let finalWpm =
// Number(wpmDisplay.innerHTML);


// let finalAccuracy =
// Number(
// accuracyDisplay.innerHTML.replace("%","")
// );


// let finalMistakes =
// Number(mistakesDisplay.innerHTML);



// if(resultCard){

// resultCard.style.display="block";

// }



// if(resultWpm){

// resultWpm.innerHTML =
// finalWpm;

// }



// if(resultAccuracy){

// resultAccuracy.innerHTML =
// finalAccuracy + "%";

// }



// if(resultMistakes){

// resultMistakes.innerHTML =
// finalMistakes;

// }



// saveResultData(
// finalWpm,
// finalAccuracy,
// finalMistakes
// );


// }




// // ===============================
// // SAVE DATA
// // ===============================

// function saveResultData(
// wpm,
// accuracy,
// mistakes
// ){



// let stats =
// JSON.parse(
// localStorage.getItem(
// "typingStats"
// )
// );



// if(!stats){


// stats={

// bestWpm:0,

// tests:0,

// accuracy:0,

// streak:0

// };


// }



// // Best WPM

// if(wpm > stats.bestWpm){

// stats.bestWpm=wpm;

// }



// stats.tests++;

// stats.accuracy=accuracy;

// stats.streak++;




// localStorage.setItem(

// "typingStats",

// JSON.stringify(stats)

// );




// // History

// let history =

// JSON.parse(

// localStorage.getItem(
// "testHistory"
// )

// );



// if(!history){

// history=[];

// }




// history.push({

// wpm:wpm,

// accuracy:accuracy,

// mistakes:mistakes,

// date:
// new Date()
// .toLocaleDateString()


// });



// localStorage.setItem(

// "testHistory",

// JSON.stringify(history)

// );



// }





// // ===============================
// // SAVE BUTTON
// // ===============================


// if(saveResultBtn){


// saveResultBtn.addEventListener(
// "click",
// ()=>{


// alert(
// "Test Result Saved Successfully"
// );


// });


// }



// // ===============================
// // RESTART
// // ===============================


// if(restartBtn){


// restartBtn.addEventListener(
// "click",
// ()=>{


// location.reload();


// });


// }
/* ==========================================
TYPEMASTER
TYPING TEST ENGINE
PART 1
========================================== */

// ===============================
// ELEMENTS
// ===============================

const testDisplay =
document.getElementById("testDisplay");

const typingInput =
document.getElementById("typingInput");

const startBtn =
document.getElementById("startBtn");

const restartBtn =
document.getElementById("restartBtn");

const timerDisplay =
document.getElementById("timer");

const wpmDisplay =
document.getElementById("wpm");

const accuracyDisplay =
document.getElementById("accuracy");

const mistakesDisplay =
document.getElementById("mistakes");

const progressBar =
document.getElementById("progressBar");

// ===============================
// VARIABLES
// ===============================

let testText = "";

let time = 30;

let timer;

let started = false;

let correct = 0;

let mistakes = 0;

let totalTyped = 0;

// ===============================
// LOAD TEST TEXT
// ===============================

function loadTest(){

let random = Math.floor(

Math.random()*paragraphs.length

);

testText = paragraphs[random];

testDisplay.innerHTML =
testText;

}

// ===============================
// START TEST
// ===============================

function startTest(){

if(started) return;

started=true;

typingInput.disabled=false;

typingInput.focus();

startTimer();

}

// ===============================
// TIMER
// ===============================

function startTimer(){

timer=setInterval(()=>{

time--;

timerDisplay.innerHTML=time;

if(time<=0){

endTest();

}

},1000);

}

// ===============================
// BUTTON EVENTS
// ===============================

if(startBtn){

startBtn.addEventListener(

"click",

()=>{

loadTest();

startTest();

}

);

}

if(restartBtn){

restartBtn.addEventListener(

"click",

()=>{

location.reload();

}

);

}
/* ==========================================
TEST CHECK SYSTEM
PART 2
========================================== */

if(typingInput){

typingInput.addEventListener(

"input",

()=>{

let typedText =
typingInput.value;

correct=0;

mistakes=0;

totalTyped =
typedText.length;

for(

let i=0;

i<typedText.length;

i++

){

if(

typedText[i] === testText[i]

){

correct++;

}

else{

mistakes++;

}

}

mistakesDisplay.innerHTML =
mistakes;

updateAccuracy();

updateWpm();

updateProgress();

}

);

}

// ===============================
// ACCURACY
// ===============================

function updateAccuracy(){

if(totalTyped===0){

accuracyDisplay.innerHTML="100%";

return;

}

let accuracy =

(

correct /

totalTyped

)

*100;

accuracyDisplay.innerHTML =

Math.round(accuracy)+"%";

}

// ===============================
// WPM
// ===============================

function updateWpm(){

let elapsed =

(30-time);

if(elapsed<=0){

return;

}

let words =

correct / 5;

let wpm =

Math.round(

(words / elapsed) * 60

);

wpmDisplay.innerHTML=wpm;

}

// ===============================
// PROGRESS
// ===============================

function updateProgress(){

let progress =

(

typingInput.value.length /

testText.length

)

*100;

progressBar.style.width=

progress+"%";

}

// ===============================
// TIME BUTTONS
// ===============================

const timeButtons =

document.querySelectorAll(
".time-btn"
);

timeButtons.forEach(
(btn)=>{

btn.addEventListener(
"click",
()=>{

timeButtons.forEach(
(b)=>{

b.classList.remove("active");

});

btn.classList.add("active");

if(btn.innerHTML.includes("60")){

time=60;

}

else if(btn.innerHTML.includes("120")){

time=120;

}

else{

time=30;

}

timerDisplay.innerHTML=time;

}

);

});
/* ==========================================
RESULT + SAVE SYSTEM
PART 3
========================================== */

const resultCard =
document.getElementById("resultCard");

const resultWpm =
document.getElementById("resultWpm");

const resultAccuracy =
document.getElementById("resultAccuracy");

const resultMistakes =
document.getElementById("resultMistakes");

const saveResultBtn =
document.getElementById("saveResult");

// ===============================
// END TEST
// ===============================

function endTest(){

clearInterval(timer);

typingInput.disabled=true;

started=false;

showResult();

}

// ===============================
// SHOW RESULT
// ===============================

function showResult(){

let finalWpm =

Number(wpmDisplay.innerHTML);

let finalAccuracy =

Number(

accuracyDisplay.innerHTML.replace("%","")

);

let finalMistakes =

Number(mistakesDisplay.innerHTML);

if(resultCard){

resultCard.style.display="block";

}

if(resultWpm){

resultWpm.innerHTML =
finalWpm;

}

if(resultAccuracy){

resultAccuracy.innerHTML =
finalAccuracy+"%";

}

if(resultMistakes){

resultMistakes.innerHTML =
finalMistakes;

}

saveData(

finalWpm,

finalAccuracy,

finalMistakes

);
  

addNotification(

"Test Completed 🎉 | WPM: "
+ finalWpm
+ " | Accuracy: "
+ finalAccuracy
+ "%"

);
  }

// 🔔 TEST COMPLETE NOTIFICATION

// addNotification(

// "Test Completed 🎉 | WPM: "
// + finalWpm +
// " | Accuracy: "
// + finalAccuracy +
// "%"

// );


// }

// ===============================
// SAVE DATA
// ===============================

function saveData(

wpm,

accuracy,

mistakes

){

let stats =

JSON.parse(

localStorage.getItem("typingStats")

);

if(!stats){

stats={

bestWpm:0,

accuracy:0,

tests:0,

streak:0

};

}

if(wpm > stats.bestWpm){

stats.bestWpm=wpm;

}

stats.accuracy=accuracy;

stats.tests++;

stats.streak++;

localStorage.setItem(

"typingStats",

JSON.stringify(stats)

);

let history =

JSON.parse(

localStorage.getItem("testHistory")

);

if(!history){

history=[];

}

history.push({

type:"Typing Test",

wpm:wpm,

accuracy:accuracy,

mistakes:mistakes,

date:new Date()
.toLocaleDateString()

});

localStorage.setItem(

"testHistory",

JSON.stringify(history)

);

}

// ===============================
// SAVE BUTTON
// ===============================

if(saveResultBtn){

saveResultBtn.addEventListener(

"click",

()=>{

alert(
"Test Marks Saved Successfully"
);

}

);

}

// ===============================
// INITIAL LOAD
// ===============================

window.addEventListener(

"load",

()=>{

if(resultCard){

resultCard.style.display="none";

}

});

// function addNotification(message){

// let notifications = 
// JSON.parse(localStorage.getItem("notifications")) || [];

// notifications.unshift({

// text:message,

// time:new Date().toLocaleString()

// });

// localStorage.setItem(
// "notifications",
// JSON.stringify(notifications)

// );

// }
function addNotification(message){

let notifications = 
JSON.parse(localStorage.getItem("notifications")) || [];


notifications.unshift({

text:message,

time:new Date().toLocaleString()

});


localStorage.setItem(
"notifications",
JSON.stringify(notifications)
);


// TEST CHECK
console.log("Notification Saved:", notifications);

}
// ma chata ki green/red laeters wala feauters add kro or space dabana par next word likhna ko a jay chy pichla word worng ho ya right ho