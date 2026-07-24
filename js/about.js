/* ==========================================
   TYPEMASTER
   ABOUT PAGE
========================================== */



// ===============================
// FADE ANIMATION
// ===============================

const cards = document.querySelectorAll(

".hero-card, .about-card"

);



const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},

{

threshold:0.15

}

);




cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition="all .6s ease";

observer.observe(card);

});




// ===============================
// APP VERSION
// ===============================

const version = document.querySelector(".version");

if(version){

version.innerHTML="Version 1.0.0";

}




// ===============================
// SCROLL TO TOP BUTTON
// ===============================

const topBtn = document.createElement("button");

topBtn.className = "scroll-top";

topBtn.innerHTML =

'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topBtn);



window.addEventListener(

"scroll",

()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}

else{

topBtn.classList.remove("show");

}

}

);



topBtn.addEventListener(

"click",

()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

);




// ===============================
// CONSOLE MESSAGE
// ===============================

console.log(

"TypeMaster About Page Loaded Successfully"

);
