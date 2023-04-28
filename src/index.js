
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const img = document.getElementById("img");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

// let questions;

// create our questions
let questions = [
    {
        question : "What is the capital of France?",
        imgSrc : "img/france.png",
        choiceA : "Paris",
        choiceB : "Madrid",
        choiceC : "Helsinki",
        correct : "A"
    },{
        question : "What is the capital of Kenya?",
        imgSrc : "img/kenya.png",
        choiceA : "Arusha",
        choiceB : "Nairobi",
        choiceC : "Mombasa",
        correct : "B"
    },{
        question : "What is the capital of Djibouti?",
        imgSrc : "img/djibouti.png",
        choiceA : "Djibouti",
        choiceB : "Bunjumbura",
        choiceC : "Kigali",
        correct : "A"
    },
    {
      question : "What is the square of 5?",
      imgSrc : "img/sq.png",
      choiceA : "25",
      choiceB : "10",
      choiceC : "5",
      correct : "A"
  },{
      question : "What is 2(9+3)=?",
      imgSrc : "img/math.jpg",
      choiceA : "11",
      choiceB : "2",
      choiceC : "13",
      correct : "B"
  }
];

// create variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    img.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}


function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
       
        answerIsWrong(a);
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
           
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAns(answer){
    if( answer == questions[runningQuestion].correct){
       
        score++;
       
        answerIsCorrect();
    }else{
       
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        
        clearInterval(TIMER);
        scoreRender();
    }
}

//  correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//  Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


function scoreRender(){
    scoreDiv.style.display = "block";
    

    const scorePerCent = Math.round(100 * score/questions.length);
    
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















