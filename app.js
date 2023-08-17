let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","blue","green"];
let highscore=0;

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if (started==false){
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIndex=Math.floor(Math.random()*4);
    let randColor=btns[randIndex];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if (userSeq[idx]==gameSeq[idx]){
        if (userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        h2.innerHTML=`Game Over! Your score was <b>${level}</b>`
        reset();
        h2.innerHTML+=`<br>High score is <b>${highscore}</b><br>Press any key to start.`;        
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}


let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);   
}

function reset(){
    if (highscore<level){
        highscore=level;
    }
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
}