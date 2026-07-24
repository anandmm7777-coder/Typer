/* ==========================================
   TYPEMASTER
   WORD TYPING ENGINE
   SPACE NEXT WORD SYSTEM
========================================== */


// ===============================
// ELEMENTS
// ===============================

const wordDisplay =
document.getElementById("wordDisplay");

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


// Result

const resultCard =
document.getElementById("resultCard");

const resultWpm =
document.getElementById("resultWpm");

const resultAccuracy =
document.getElementById("resultAccuracy");

const resultMistakes =
document.getElementById("resultMistakes");




// ===============================
// VARIABLES
// ===============================

let wordArray=[];

let currentIndex=0;

let time=60;

let timer=null;

let started=false;


let correctWords=0;

let mistakes=0;

let totalWords=0;

let correctCharacters=0;







// ===============================
// LOAD WORDS
// ===============================


function loadWords(){


wordArray =
getRandomWords(50);


currentIndex=0;


showCurrentWord();


}







// ===============================
// SHOW WORD WITH LETTERS
// ===============================


function showCurrentWord(){


if(
currentIndex < wordArray.length
){


wordDisplay.innerHTML="";



wordArray[currentIndex]
.split("")
.forEach(char=>{


let span =
document.createElement("span");


span.innerText=char;


wordDisplay.appendChild(span);



});


}
else{


endTest();


}


}








// ===============================
// START TEST
// ===============================


function startTest(){


if(started)
return;



started=true;


typingInput.disabled=false;


typingInput.value="";


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
// LETTER COLOR CHECK
// ===============================


typingInput.addEventListener(
"input",
()=>{


let typed =
typingInput.value;



let letters =
wordDisplay.querySelectorAll("span");



letters.forEach(
(letter,index)=>{


if(
typed[index]==null
){


letter.style.color="";


}


else if(
typed[index] === letter.innerText
){


letter.style.color="green";


}


else{


letter.style.color="red";


}



});



});









// ===============================
// SPACE NEXT WORD
// ===============================


typingInput.addEventListener(
"keydown",
(e)=>{


if(e.key === " "){



e.preventDefault();



let typed =
typingInput.value.trim();



let currentWord =
wordArray[currentIndex];





// CHECK RESULT


if(
typed === currentWord
){


correctWords++;


}
else{


mistakes++;


}




// CHARACTER COUNT


for(
let i=0;
i<typed.length;
i++
){


if(
typed[i] === currentWord[i]
){


correctCharacters++;


}



}





totalWords++;



// NEXT WORD


currentIndex++;


typingInput.value="";


showCurrentWord();



updateStats();



}



});









// ===============================
// UPDATE STATS
// ===============================


function updateStats(){


let elapsed =
60-time;



if(elapsed>0){


let wpm =

Math.round(
(correctWords/elapsed)*60
);



wpmDisplay.innerHTML=wpm;



}






let totalCharacters =
totalWords*5;



if(totalCharacters>0){


let accuracy =

Math.round(

(correctCharacters/
totalCharacters)*100

);



accuracyDisplay.innerHTML =
accuracy+"%";


}




mistakesDisplay.innerHTML =
mistakes;






let progress =

(
currentIndex/
wordArray.length
)*100;



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
// RESULT
// ===============================


function showResult(){


let finalWpm =
Number(wpmDisplay.innerHTML);



let finalAccuracy =
Number(
accuracyDisplay.innerHTML.replace("%","")
);



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
mistakes;

}



saveHistory(
finalWpm,
finalAccuracy,
mistakes
);



}









// ===============================
// SAVE HISTORY
// ===============================


function saveHistory(
wpm,
accuracy,
mistakes
){



let history =
JSON.parse(
localStorage.getItem("testHistory")
);



if(!history){

history=[];

}



history.push({

type:"Word Typing",

wpm:wpm,

accuracy:accuracy,

mistakes:mistakes,

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
// BUTTONS
// ===============================


if(startBtn){


startBtn.onclick=()=>{


loadWords();


startTest();


};


}




if(restartBtn){


restartBtn.onclick=()=>{


location.reload();


};


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