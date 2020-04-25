const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "What does Javascript do?",
        choiceA : " A: It allows the user to make the webpage interactive Correct  ",
        choiceB : "B: It allows the user to add styles to the webpage ",
        choiceC : "C: It adds the basic skeleton to the webpage",
        choiceD : "D; None of the above",
        correct : "A"
    },{
        question : "What does an array in Javascrip do.stand for?",
        choiceA : "A: Allows you to loop through blocks of code",
        choiceB : "B: Allows you to store multiple values in a single variable",
        choiceC : "C: Contianers for storing data values",
        choiceD : "D: None of the above",
        correct : "B"
    },{
        question : "What are Strings for?",
        choiceA : "A: Allows you to loop through blocks of code",
        choiceB : "B: Allows you to store multiple values in a single variable",
        choiceC : "C: Used for storing text surrounded by double quotes",
        choiceD : "D: None of the Above",
        correct : "C"
    }, {
        question : "What does a for loop do?",
        choiceA : "A: Used for storing text surrounded by double quotes",
        choiceB : "B: Allows you to store multiple values in a single variable",
        choiceC : "C: Allows you to loop through Blocks of Code",
        choiceD : "D: None of the Above",
        correct : "C" 
    },{
        question : "What is jquery?",
        choiceA : "Is the most popular framework for developing responsive websites",
        choiceB : "A high level programming language used to develop GUI Applications",
        choiceC : "Mainly a programming langauge used in developing the suites of a gaming tool",
        choiceD : "None of the Above",
        correct : "D"   
    }
];


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
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
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
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
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

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

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
