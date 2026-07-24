/* ==========================================
   TYPEMASTER
   SENTENCE TYPING ENGINE
   COMPLETE VERSION
========================================== */


// ===============================
// ELEMENTS
// ===============================

const sentenceDisplay =
document.getElementById("sentenceDisplay");

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



// ===============================
// VARIABLES
// ===============================


let currentSentence="";

let time=60;

let timer=null;

let started=false;


let correctCharacters=0;

let mistakes=0;





// ===============================
// LOAD SENTENCE
// ===============================


function loadSentence(){


let random =
Math.floor(
Math.random()*sentences.length
);


currentSentence =
sentences[random];


sentenceDisplay.innerHTML =
"";


currentSentence
.split("")
.forEach(letter=>{

let span =
document.createElement("span");

span.innerText=letter;

sentenceDisplay.appendChild(span);


});


}





// ===============================
// START TEST
// ===============================


function startTest(){


if(started) return;


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
// INPUT CHECK
// ===============================


typingInput.addEventListener(
"input",
()=>{


let typed =
typingInput.value;



correctCharacters=0;

mistakes=0;



let letters =
sentenceDisplay.querySelectorAll("span");



letters.forEach((letter,index)=>{


let typedChar =
typed[index];



if(typedChar==null){


letter.style.color="";


return;

}



if(
typedChar === currentSentence[index]
){


letter.style.color="green";

correctCharacters++;


}

else{


letter.style.color="red";

mistakes++;


}


});





mistakesDisplay.innerHTML =
mistakes;



updateAccuracy();


updateWpm();


updateProgress();





// ===============================
// AUTO COMPLETE
// ===============================


if(
typed.length >= currentSentence.length
){


endTest();


}



});








// ===============================
// ACCURACY
// ===============================


function updateAccuracy(){


if(
typingInput.value.length===0
){


accuracyDisplay.innerHTML="100%";

return;

}



let accuracy =

(
correctCharacters /
typingInput.value.length
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
60-time;



if(elapsed<=0)
return;



let words =
correctCharacters/5;



let wpm =

Math.round(
(words/elapsed)*60
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
currentSentence.length
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
// SHOW RESULT
// ===============================


function showResult(){


let wpm =
Number(wpmDisplay.innerHTML);



let accuracy =
Number(
accuracyDisplay.innerHTML.replace("%","")
);



let mistake =
Number(mistakesDisplay.innerHTML);



if(resultCard){

resultCard.style.display="block";

}



if(resultWpm){

resultWpm.innerHTML=wpm;

}



if(resultAccuracy){

resultAccuracy.innerHTML=
accuracy+"%";

}



if(resultMistakes){

resultMistakes.innerHTML=
mistake;

}



saveData(
wpm,
accuracy,
mistake
);



}







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



if(wpm>stats.bestWpm){

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

type:"Sentence Typing",

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


loadSentence();


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


window.onload=()=>{


if(resultCard){

resultCard.style.display="none";

}



typingInput.disabled=true;


};