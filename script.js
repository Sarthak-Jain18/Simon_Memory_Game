//IMPORTANT VARIABLES
let arr1 = [];  //computer generated array
let arr2 = [];  //user generated array
let highestScore = 0;
let level = 0;

// DOM Manipulators and other variables
let box1 = document.getElementsByClassName("box1");
let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");
let btn_start = document.querySelector(".btn_start");
let enable_check = false;

//Rule page remover
let flag = false;
let ok = document.querySelector("#ok");
let rule = document.querySelector(".rule");
let main = document.querySelector(".main");
ok.addEventListener("click",function(event){
    rule.style.display = "none";
    main.style.filter = "none";
    flag = true;
});

//CLICK SOUND
let clickSound = document.getElementById("clickSound");
for(let box of box1){
    box.addEventListener("click",function(event){
        clickSound.play();
    });
}

// click on "START"...works only once
let start = true;
btn_start.addEventListener("click",function(){
    if(start&&flag){
        console.log("Game Started");
        start=false;
        levelUp();   
    }
});

function levelUp(){
    arr2 = [];
    level++;
    h2.innerText=`Level ${level}`;
    setTimeout(generateRandom,500);
}

function generateRandom(){
    
    switch (Math.floor((Math.random()*4))){
        case 0:
            random = "a";
            break;
        case 1:
            random = "b";
            break;
        case 2:
            random = "c";
            break;
        case 3:
            random = "d";
            break;
    }

    flash1(random);
    arr1.push(random);
    btn_start.innerHTML = "Keep Going...👀";
    btn_start.style.background = "transparent";
    btn_start.style.border = "transparent";
    enable_check = true;
}

function flash1(temp){
    let box11 = document.getElementById(temp);
    box11.style.background = "white";
    setTimeout(function(){
        box11.style.background = "";
    },300);
}

function flash2(id){
    let box11 = document.getElementById(id);
    box11.style.background = "#02f55b";
    setTimeout(function(){
        box11.style.background = "";
    },100);
}

for(let btn of box1){
    btn.addEventListener("click",function(event){
        let id = event.target.id;
        flash2(id);
        if(enable_check){
            arr2.push(id);
            check(arr2.length-1);
        }
    });
}

function check(i){
    if(arr1[i]!=arr2[i]){   //throw error
        enable_check = false;
        console.log(`Correct Answer : ${arr1}`);
        console.log(`Your Anwer : ${arr2}`);
        console.log("Game Over");
        error();
    }
    else{
        if(i==level-1){
            levelUp();
        }
    }
}

function error(){
    errorSound();
    if(level-1>highestScore){
        h2.innerText = `CONGRATS!! NEW HIGH SCORE : ${level-1}`;
        highestScore = level - 1;
    }
    else{
        h2.innerText = `GAME OVER || SCORE : ${level-1}`;
    } 
    h4.innerText = `Highest Score : ${highestScore}`;
    reset();
}

//errorSound
function errorSound(){
    let body = document.querySelector("body");
    let errorSound = document.getElementById("errorSound");
    errorSound.play();
    let isRed = true;
    let count = 0;
    let id = setInterval(function(){
        body.style.background = isRed ? "red" : "white";
        isRed = !isRed;
        count++;
        if(count===6){
            clearInterval(id);
            body.style.background = "";
        }
    },250);
}

function reset(){
    start=true;
    btn_start.innerHTML = "Reset";
    btn_start.style.background = "";
    btn_start.style.border = "";
    arr1=[];
    arr2=[];
    level=0;
}




