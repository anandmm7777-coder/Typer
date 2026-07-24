/*=========================================
 GOOGLE LOGIN
 PART 1
=========================================*/

import { auth } from "./firebase-config.js";

import {
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged,
signOut

} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const googleLoginBtn =
document.getElementById("googleLoginBtn");

const provider =
new GoogleAuthProvider();

provider.setCustomParameters({

prompt: "select_account"

});

if (googleLoginBtn) {

googleLoginBtn.addEventListener(

"click",

async () => {

try {

const result =
await signInWithPopup(
auth,
provider
);

const user =
result.user;

localStorage.setItem(

"userName",
user.displayName

);

localStorage.setItem(

"userEmail",
user.email

);

localStorage.setItem(

"userPhoto",
user.photoURL

);

window.location.href =
"dashboard.html";

}

catch (error) {

console.error(error);

alert(

"Google Sign-In Failed"

);

}

}

);

}
/*=========================================
 GOOGLE LOGIN
 PART 2
=========================================*/

onAuthStateChanged(auth, (user) => {

    if (!user) {

        if (
            window.location.pathname.includes("dashboard.html")
        ) {

            window.location.href = "index.html";
        }

        return;
    }

    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    const photo = document.getElementById("userPhoto");
    const logoutBtn = document.getElementById("logoutBtn");

    if (name) {

        name.textContent = user.displayName;

    }

    if (email) {

        email.textContent = user.email;

    }

    if (photo) {

        photo.src = user.photoURL;

    }

    if (logoutBtn) {

        logoutBtn.addEventListener(

            "click",

            async () => {

                try {

                    await signOut(auth);

                    localStorage.clear();

                    window.location.href = "logout.html";

                } catch (error) {

                    console.error(error);

                    alert("Logout Failed");

                }

            }

        );

    }

});
