/* ==========================================
   TYPEMASTER
   MARKS PAGE
   PART 1
========================================== */



// ===============================
// ELEMENTS
// ===============================


const bestWpm =
document.getElementById("bestWpm");


const bestAccuracy =
document.getElementById("bestAccuracy");


const totalTests =
document.getElementById("totalTests");


const streak =
document.getElementById("streak");


const historyTable =
document.getElementById("historyTable");


const clearHistoryBtn =
document.getElementById("clearHistoryBtn");





// ===============================
// LOAD STATS
// ===============================


function loadStats(){


let stats = JSON.parse(

localStorage.getItem("typingStats")

);



if(!stats){

return;

}



bestWpm.innerHTML =
stats.bestWpm || 0;


bestAccuracy.innerHTML =
(stats.accuracy || 0) + "%";


totalTests.innerHTML =
stats.tests || 0;


streak.innerHTML =
stats.streak || 0;


}






// ===============================
// LOAD HISTORY
// ===============================


function loadHistory(){


let history = JSON.parse(

localStorage.getItem("testHistory")

);



if(!history || history.length===0){

historyTable.innerHTML =

`
<tr>

<td colspan="5">

No Test History Found

</td>

</tr>

`;

return;

}



historyTable.innerHTML = "";



history.reverse().forEach((item)=>{

historyTable.innerHTML += `
<tr>

<td>${item.type}</td>

<td>${item.wpm}</td>

<td>${item.accuracy}%</td>

<td>${item.mistakes}</td>

<td>${item.date}</td>

</tr>
`;

});


}
/* ==========================================
   TYPEMASTER
   MARKS PAGE
   PART 2
========================================== */



// ===============================
// CLEAR HISTORY
// ===============================


function clearHistory(){


const confirmDelete = confirm(

"Are you sure you want to clear all typing history?"

);


if(!confirmDelete){

return;

}



// Remove LocalStorage Data

localStorage.removeItem("testHistory");

localStorage.removeItem("typingStats");



// Reset Dashboard

bestWpm.innerHTML = "0";

bestAccuracy.innerHTML = "0%";

totalTests.innerHTML = "0";

streak.innerHTML = "0";



// Reset Table

historyTable.innerHTML =

`
<tr>

<td colspan="5">

No Test History Found

</td>

</tr>
`;



alert("Typing history cleared successfully.");


}





// ===============================
// BUTTON EVENT
// ===============================


if(clearHistoryBtn){

clearHistoryBtn.addEventListener(

"click",

clearHistory

);

}





// ===============================
// PAGE LOAD
// ===============================


window.addEventListener(

"load",

()=>{


loadStats();

loadHistory();


}

);