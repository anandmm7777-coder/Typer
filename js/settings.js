/* ==========================================
   TYPEMASTER
   SETTINGS PAGE
   PART 1
========================================== */



// ===============================
// ELEMENTS
// ===============================

const darkMode =
document.getElementById("darkMode");

const animations =
document.getElementById("animations");

const typingSound =
document.getElementById("typingSound");

const keySound =
document.getElementById("keySound");

const defaultTimer =
document.getElementById("defaultTimer");

const userName =
document.getElementById("userName");

const typingGoal =
document.getElementById("typingGoal");

const accentColor =
document.getElementById("accentColor");

const fontSize =
document.getElementById("fontSize");

const saveSettings =
document.getElementById("saveSettings");

const resetSettings =
document.getElementById("resetSettings");



// ===============================
// LOAD SETTINGS
// ===============================

function loadSettings() {

const settings = JSON.parse(
localStorage.getItem("typeMasterSettings")
);

if (!settings) return;



darkMode.checked =
settings.darkMode || false;

animations.checked =
settings.animations ?? true;

typingSound.checked =
settings.typingSound ?? true;

keySound.checked =
settings.keySound || false;

defaultTimer.value =
settings.defaultTimer || "60";

userName.value =
settings.userName || "";

typingGoal.value =
settings.typingGoal || "";

accentColor.value =
settings.accentColor || "#4f46e5";

fontSize.value =
settings.fontSize || "16px";



// Apply Theme

document.documentElement.style.setProperty(
"--primary-color",
accentColor.value
);

document.body.style.fontSize =
fontSize.value;



if (darkMode.checked) {

document.body.classList.add("dark");

} else {

document.body.classList.remove("dark");

}

}



// ===============================
// PAGE LOAD
// ===============================

window.addEventListener(

"load",

loadSettings

);
/* ==========================================
   TYPEMASTER
   SETTINGS PAGE
   PART 2
========================================== */



// ===============================
// SAVE SETTINGS
// ===============================

function saveUserSettings(){

const settings={

darkMode:darkMode.checked,

animations:animations.checked,

typingSound:typingSound.checked,

keySound:keySound.checked,

defaultTimer:defaultTimer.value,

userName:userName.value.trim(),

typingGoal:typingGoal.value,

accentColor:accentColor.value,

fontSize:fontSize.value

};



localStorage.setItem(

"typeMasterSettings",

JSON.stringify(settings)

);



alert("Settings Saved Successfully!");

}



// ===============================
// RESET SETTINGS
// ===============================

function resetUserSettings(){


const ok = confirm(

"Reset all settings to default?"

);


if(!ok){

return;

}



localStorage.removeItem(

"typeMasterSettings"

);



// Default Values

darkMode.checked=false;

animations.checked=true;

typingSound.checked=true;

keySound.checked=false;

defaultTimer.value="60";

userName.value="";

typingGoal.value="";

accentColor.value="#4f46e5";

fontSize.value="16px";



// Apply Default Theme

document.body.classList.remove("dark");

document.body.style.fontSize="16px";

document.documentElement.style.setProperty(

"--primary-color",

"#4f46e5"

);



alert("Settings Reset Successfully!");

}



// ===============================
// LIVE PREVIEW
// ===============================

darkMode.addEventListener(

"change",

()=>{

document.body.classList.toggle(

"dark",

darkMode.checked

);

}

);




accentColor.addEventListener(

"input",

()=>{

document.documentElement.style.setProperty(

"--primary-color",

accentColor.value

);

}

);




fontSize.addEventListener(

"change",

()=>{

document.body.style.fontSize=

fontSize.value;

}

);



// ===============================
// BUTTON EVENTS
// ===============================

saveSettings.addEventListener(

"click",

saveUserSettings

);



resetSettings.addEventListener(

"click",

resetUserSettings

);
