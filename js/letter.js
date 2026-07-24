/* ==========================================
   TYPEMASTER
   LETTER TYPING ENGINE
   PROFESSIONAL VERSION
========================================== */


// ===============================
// ELEMENTS
// ===============================


const letterDisplay =
document.getElementById("letterDisplay");


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



// RESULT

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
// VARIABLES
// ===============================


const letters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


let letterArray=[];


let currentIndex=0;


let time=60;


let timer=null;


let started=false;


let correct=0;


let mistakes=0;


let total=0;





// ===============================
// CREATE LETTERS
// ===============================


function createLetters(){


letterArray=[];


for(let i=0;i<100;i++){


let randomLetter =

letters[
Math.floor(
Math.random()*letters.length
)
];


letterArray.push(randomLetter);


}


currentIndex=0;


showLetter();


}






// ===============================
// SHOW CURRENT LETTER
// ===============================


function showLetter(){


if(currentIndex < letterArray.length){


letterDisplay.innerHTML =
letterArray[currentIndex];


}
else{


endTest();


}


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


startBtn.addEventListener(
"click",
()=>{


createLetters();


startTest();


});





restartBtn.addEventListener(
"click",
()=>{


location.reload();


});








// ===============================
// INPUT CHECK
// ===============================


typingInput.addEventListener(
"input",
()=>{


let typed =
typingInput.value;



if(
typed === letterArray[currentIndex]
){


correct++;


total++;


currentIndex++;


typingInput.value="";


showLetter();


}


else if(typed.length>0){


mistakes++;


total++;


typingInput.value="";


}



updateStats();


});









// ===============================
// UPDATE STATS
// ===============================


function updateStats(){



mistakesDisplay.innerHTML =
mistakes;



// Accuracy


let accuracy = 100;


if(total>0){


accuracy =
Math.round(
(correct/total)*100
);


}



accuracyDisplay.innerHTML =
accuracy+"%";





// Speed


let elapsed =
60-time;



if(elapsed>0){


let speed =

Math.round(

(correct/elapsed)*60

);



wpmDisplay.innerHTML =
speed;


}





// Progress


let progress =

(currentIndex /
letterArray.length)*100;



progressBar.style.width =
progress+"%";



}










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


let finalSpeed =
Number(wpmDisplay.innerHTML);



let finalAccuracy =
Number(
accuracyDisplay.innerHTML.replace("%","")
);



let finalMistakes =
Number(
mistakesDisplay.innerHTML
);




if(resultCard){

resultCard.style.display="block";

}



if(resultWpm){

resultWpm.innerHTML =
finalSpeed;

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
finalSpeed,
finalAccuracy,
finalMistakes
);


}









// ===============================
// SAVE DATA
// ===============================


function saveData(
speed,
accuracy,
mistakeCount
){


let history =

JSON.parse(
localStorage.getItem("testHistory")
);



if(!history){

history=[];

}



history.push({

type:"Letter Typing",

wpm:speed,

accuracy:accuracy,

mistakes:mistakeCount,

date:
new Date()
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
"Letter Test Saved Successfully"
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



typingInput.disabled=true;


});