/* ==========================================
   TYPEMASTER
   WORD DATABASE
   PART 1
========================================== */


const words = [

"apple",
"banana",
"orange",
"mango",
"grape",
"water",
"river",
"ocean",
"mountain",
"forest",

"computer",
"keyboard",
"mouse",
"screen",
"laptop",
"mobile",
"internet",
"website",
"coding",
"program",

"school",
"student",
"teacher",
"book",
"pen",
"paper",
"classroom",
"lesson",
"exam",
"study",

"speed",
"typing",
"practice",
"accuracy",
"result",
"score",
"test",
"time",
"level",
"challenge",

"beautiful",
"amazing",
"creative",
"powerful",
"professional",
"premium",
"simple",
"modern",
"future",
"success",


"javascript",
"html",
"css",
"python",
"android",
"application",
"software",
"hardware",
"database",
"server",


"keyboard",
"button",
"window",
"folder",
"file",
"code",
"design",
"developer",
"project",
"technology",


"knowledge",
"learning",
"education",
"career",
"goal",
"achievement",
"improvement",
"confidence",
"ability",
"skill"

];


const wordList = words;
/* ==========================================
   TYPEMASTER
   WORD DATABASE
   PART 2
========================================== */


const moreWords = [

"house",
"home",
"room",
"door",
"window",
"chair",
"table",
"light",
"phone",
"clock",

"morning",
"evening",
"night",
"day",
"week",
"month",
"year",
"today",
"tomorrow",
"future",

"fast",
"slow",
"quick",
"smart",
"strong",
"bright",
"clear",
"easy",
"hard",
"better",

"friend",
"family",
"people",
"world",
"country",
"city",
"village",
"nature",
"earth",
"planet",

"energy",
"power",
"science",
"physics",
"chemistry",
"biology",
"math",
"number",
"formula",
"experiment",

"camera",
"music",
"video",
"photo",
"movie",
"sound",
"voice",
"image",
"screen",
"media",

"login",
"account",
"profile",
"setting",
"option",
"menu",
"dashboard",
"system",
"update",
"feature",

"start",
"stop",
"restart",
"continue",
"complete",
"finish",
"begin",
"open",
"close",
"save",

"quality",
"design",
"style",
"color",
"theme",
"animation",
"effect",
"button",
"card",
"layout",

"online",
"offline",
"network",
"cloud",
"data",
"storage",
"backup",
"security",
"privacy",
"access"

];


// Add new words into main list

words.push(...moreWords);
/* ==========================================
   TYPEMASTER
   WORD DATABASE
   PART 3
========================================== */


const advancedWords = [

"algorithm",
"function",
"variable",
"object",
"array",
"string",
"boolean",
"developer",
"frontend",
"backend",

"framework",
"library",
"component",
"interface",
"browser",
"website",
"application",
"platform",
"engine",
"project",

"creative",
"innovation",
"solution",
"strategy",
"performance",
"experience",
"interface",
"responsive",
"structure",
"development",

"professional",
"excellent",
"powerful",
"advanced",
"complete",
"accuracy",
"practice",
"progress",
"improve",
"success",

"keyboard",
"typing",
"master",
"speedtest",
"competition",
"challenge",
"training",
"exercise",
"learning",
"achievement",

"future",
"technology",
"artificial",
"intelligence",
"machine",
"robot",
"automation",
"digital",
"smart",
"device",

"security",
"password",
"verification",
"authentication",
"permission",
"database",
"information",
"connection",
"storage",
"network"

];


// Add advanced words

words.push(...advancedWords);



// ==========================================
// RANDOM WORD GENERATOR
// ==========================================


function getRandomWords(count = 20){

    let random = [];

    for(let i = 0; i < count; i++){

        let index = Math.floor(
            Math.random() * words.length
        );

        random.push(words[index]);

    }

    return random;

}



// Export for typing.js

window.wordList = words;

window.getRandomWords = getRandomWords;