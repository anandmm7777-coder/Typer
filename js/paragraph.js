/* ==========================================
   TYPEMASTER
   PARAGRAPH TYPING ENGINE PRO
========================================== */


// ===============================
// ELEMENTS
// ===============================


const paragraphDisplay =
document.getElementById("paragraphDisplay");

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




// ===============================
// VARIABLES
// ===============================


let currentParagraph="";

let words=[];

let currentWord=0;


let time=600; // 10 minutes

let timer;

let started=false;


let correctCharacters=0;

let mistakes=0;





// ===============================
// LOAD PARAGRAPH
// ===============================


function loadParagraph(){


let random =
Math.floor(
Math.random()*paragraphs.length
);



currentParagraph =
paragraphs[random];



words =
currentParagraph.split(" ");



currentWord=0;



displayWords();


}





// ===============================
// DISPLAY WORDS
// ===============================


function displayWords(){


paragraphDisplay.innerHTML="";


words.forEach((word,index)=>{


let span=document.createElement("span");


span.textContent=word+" ";


span.id="word-"+index;



if(index===currentWord){

span.style.background="#ddd";

}



paragraphDisplay.appendChild(span);


});


}







// ===============================
// START TEST
// ===============================


function startTest(){


if(started)return;


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


let min =
Math.floor(time/60);


let sec =
time%60;


timerDisplay.innerHTML =
min+":"+String(sec).padStart(2,"0");



if(time<=0){

endTest();

}



},1000);


}







// ===============================
// TYPING SYSTEM
// ===============================


typingInput.addEventListener(
"input",
()=>{


let typedText = typingInput.value;


if(typedText.endsWith(" ")){

let typedWord = typedText.trim();


checkWord(typedWord);


typingInput.value="";

}


});



// ===============================
// WORD CHECK
// ===============================



function checkWord(typedWord){


let span =
document.getElementById(
"word-"+currentWord
);



if(
typedWord === words[currentWord]
){


span.style.color="#22C55E";


correctCharacters +=
words[currentWord].length;



}

else{


span.style.color="#EF4444";


mistakes++;


}



span.style.background="transparent";



currentWord++;





if(currentWord < words.length){


let next =
document.getElementById(
"word-"+currentWord
);



next.style.background=
"rgba(6,182,212,.25)";



}
else{


endTest();


}



updateAccuracy();

updateProgress();

updateWpm();


}




// ===============================
// ACCURACY
// ===============================


function updateAccuracy(){



let total =
correctCharacters + mistakes;



if(total===0){

accuracyDisplay.innerHTML="100%";

return;

}



let acc =
(correctCharacters /
(correctCharacters+(mistakes*5)))
*100;



accuracyDisplay.innerHTML =
Math.round(acc)+"%";



}








// ===============================
// WPM
// ===============================


function updateWpm(){


let elapsed =
600-time;


if(elapsed<=0)return;



let wordsTyped =
correctCharacters/5;



let wpm =
(wordsTyped/elapsed)*60;



wpmDisplay.innerHTML =
Math.round(wpm);



}








// ===============================
// PROGRESS
// ===============================


function updateProgress(){


let progress =
(currentWord /
words.length)*100;



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



if(resultCard){

resultCard.style.display="block";

}



saveData();



}








// ===============================
// SAVE DATA
// ===============================


function saveData(){


let stats =
JSON.parse(
localStorage.getItem(
"typingStats"
)
);



if(!stats){

stats={

bestWpm:0,

tests:0

};

}



let wpm =
Number(wpmDisplay.innerHTML);



if(wpm>stats.bestWpm){

stats.bestWpm=wpm;

}



stats.tests++;



localStorage.setItem(
"typingStats",
JSON.stringify(stats)
);



}







// ===============================
// BUTTONS
// ===============================



startBtn.onclick=()=>{

loadParagraph();

startTest();

};



restartBtn.onclick=()=>{

location.reload();

};







// ===============================
// INITIAL
// ===============================


window.onload=()=>{


if(resultCard){

resultCard.style.display="none";

}



timerDisplay.innerHTML="10:00";


};