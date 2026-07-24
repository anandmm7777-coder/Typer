/* ==========================================
   TYPEMASTER
   PROFILE PAGE
   PART 1
========================================== */



// ===============================
// ELEMENTS
// ===============================

const profileName =
document.getElementById("profileName");

const profileGoal =
document.getElementById("profileGoal");

const accountName =
document.getElementById("accountName");

const accountGoal =
document.getElementById("accountGoal");

const bestWpm =
document.getElementById("bestWpm");

const bestAccuracy =
document.getElementById("bestAccuracy");

const totalTests =
document.getElementById("totalTests");

const streak =
document.getElementById("streak");



// ===============================
// LOAD PROFILE
// ===============================

function loadProfile(){


const settings = JSON.parse(

localStorage.getItem("typeMasterSettings")

);



if(settings){

const user =

settings.userName || "Guest User";

const goal =

settings.typingGoal || "60";



profileName.innerHTML = user;

profileGoal.innerHTML =
"Typing Goal : " + goal + " WPM";



accountName.innerHTML = user;

accountGoal.innerHTML =
goal + " WPM";

}



}



// ===============================
// LOAD STATS
// ===============================

function loadStats(){


const stats = JSON.parse(

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
/* ==========================================
   TYPEMASTER
   PROFILE PAGE
   PART 2
========================================== */



// ===============================
// ACHIEVEMENTS
// ===============================


// ===============================
// PROFILE ANIMATION
// ===============================

function animateCards(){


const cards =

document.querySelectorAll(

".settings-card"

);



cards.forEach(

(card,index)=>{

card.style.opacity="0";

card.style.transform=

"translateY(25px)";



setTimeout(()=>{

card.style.transition=

".45s ease";

card.style.opacity="1";

card.style.transform=

"translateY(0)";



},index*180);

}

);


}





// ===============================
// PAGE LOAD
// ===============================

window.addEventListener(

"load",

()=>{

loadProfile();

loadStats();


animateCards();

}

);
// ===============================
// PROFILE IMAGE
// ===============================

const profileInput =
document.getElementById("profileImageInput");

const profilePreview =
document.getElementById("profilePreview");


// Load Saved Image

const savedImage =

localStorage.getItem("profileImage");


if(savedImage){

profilePreview.src = savedImage;

}


// Upload Image

profileInput.addEventListener(

"change",

function(){

const file = this.files[0];

if(!file) return;


const reader = new FileReader();


reader.onload = function(e){

profilePreview.src = e.target.result;

localStorage.setItem(

"profileImage",

e.target.result

);

};


reader.readAsDataURL(file);

});
/* ==========================================
   CERTIFICATE UNLOCK SYSTEM
========================================== */

function checkCertificate(){

let stats =
JSON.parse(
localStorage.getItem("typingStats")
) || {};


let totalTests = stats.tests || 0;


const certificate =
document.getElementById("certificate1");


if(!certificate) return;



if(totalTests >= 5){


certificate.classList.remove(
"locked-certificate"
);


certificate.classList.add(
"unlocked"
);

const settings =
JSON.parse(
localStorage.getItem("typeMasterSettings")
) || {};


let name =
settings.userName || "TypeMaster User";


let userElement =
certificate.querySelector(".username");


if(userElement){

userElement.innerHTML=name;

}



let lock =
certificate.querySelector(".certificate-lock");


if(lock){

lock.style.display="none";

}



let dateElement =
document.getElementById("certificateDate");


if(dateElement){

dateElement.innerHTML =
new Date().toLocaleDateString();

}


}

}
window.addEventListener("load",()=>{

loadProfile();

loadStats();

checkCertificate();

let stats = JSON.parse(localStorage.getItem("typingStats"));

console.log("Typing Stats:", stats);

});