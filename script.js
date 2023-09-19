//selects elements from the body
var startbtn = document.querySelector(".start");
var paraEl = document.querySelector(".question");
var cont = document.querySelector(".container");
var time = document.getElementById("#time");


var question = ["What does HTML stand for:","What does CSS stand for:", "What does SQL stand for:", "What does XML stand for:"];
var total = 4;
var correct = 0; 
var answer1 = ["Hyper Text Markup Language","Hyper Text Media Logic","High Tech Meta Logic"];
var answer2 = ["Cascoon Style Sheet", "Cascading Style Sheet", "Charcoal Style Sheet"]; 
var answer3 = ["Structured Query Language", "Straight Query Logic", "Super Queen Language"];
var answer4 = ["Extensible Markup Language", "X-ray Mark Logic", "Excited Maria luaren"];
var answer = new Array(answer1, answer2, answer3, answer4);
var allButton = document.querySelector(".wrong");
var rButton = document.getElementById("#correct");


function nextQuestion(){
    switch (correct){
        case 1:
        paraEl = question[1];
        rButton = answer2[1];
        allButton = Math.floor(Math.random() * answer2.length);
        break;
        case 2:
        paraEl = question[2];
        rButton = answer3[0];
        allButton = Math.floor(Math.random() * answer3.length);
        break;
        case 3:
        paraEl = question[3];
        rButton = answer4[0];
        allButton = Math.floor(Math.random() * answer4.length);
        break;

        default: return
    }
}


function dispMsg(){
    var msg = document.createElement("h2");
    msg.setAttribute("id", "msg");
    cont.appendChild(msg);

    if (correct == 0){
        msg.textContent = "Incorrect!";
    } else{
        msg.textContent = "Correct!";
    }

}

function start(){
    paraEl.textContent = question[0];
    
    var respondbtn1 = document.createElement("button");
    var respondbtn2 = document.createElement("button");
    var respondbtn3 = document.createElement("button");

    respondbtn1.textContent = answer1[0];
    respondbtn2.textContent = answer1[1];
    respondbtn3.textContent = answer1[2];

    respondbtn1.setAttribute("id", "correct");
    respondbtn2.setAttribute("class", "wrong");
    respondbtn3.setAttribute("class", "wrong");


    cont.appendChild(respondbtn1);
    cont.appendChild(respondbtn2);
    cont.appendChild(respondbtn3);
    
  
    


    
    rButton.addEventListener('click', function checkR(){
        correct++;
        dispMsg();
        nextQuestion();
    })

    allButton.addEventListener('click', function checkW(){
        correct = 0;
        dispMsg();
        nextQuestion();
    })



    startbtn.remove();
}


 

var secLeft = 30;
function setTime(){
   var timerInterval = setInterval(function(){
    secLeft--;
    time.textContent = secLeft;


    if(secLeft === 0){
        clearInterval(timerInterval);
    }
   }, 1000);
}


startbtn.addEventListener("click", start);