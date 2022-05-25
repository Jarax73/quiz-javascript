const accueil = document.querySelectorAll('#accueil .description');
const form = document.querySelector("#accueil");
const questionsForm = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');
const radioStyle = document.querySelectorAll(".radio-style");
const forLabel = document.querySelectorAll('#radios label');
const questionsNumber = document.querySelector("#questions-number");
const crossdiv = document.querySelector("#crossdiv");
const resultScreen = document.querySelector("#result");
const showScore = document.querySelector("#points");

let questions = ["Quel est le type d'un fichier JavaScript ?", "Où est-il conseillé d'écrire du JavaScript ?", "Quelle est l'utilité d'une fonction ?"];
let answers = [
	[".ts", ".jsx", ".js", ".j"], 
	["dans la balise head", "dans la balise body", "dans un fichier externe", "aucune bonne reponse"],
	["ne pas repéter le même code plusieurs fois", "créer des balises html", "créer des boucles", "écrire plusieurs fois le même code"]
];
let correct = [".js", "dans un fichier externe", "ne pas repéter le même code plusieurs fois"];
let idAnswers = [
    ["ts", "jsx", "js", "j"], 
    ["head", "boDy", "externe", "none"], 
    ["repeter", "balises", "boucle", "same	"]
];


let indexCurrentQuestion = 0;

resultScreen.style.display = "none";

form.addEventListener("submit", function(e){
    e.preventDefault();

	const inputValues = {};
	for (const info of this.elements){
		const {name, value} = info;
		if(name){
		inputValues[name] = value;
		}
        
        // let title = document.querySelector("#result h1");
        // let email = document.querySelector("result p");

        
        // title.textContent = info;
        // email.textContent = info;
	}
    for (let ind in inputValues){
        console.log(ind);

    }
    console.log(inputValues);

	form.style.display = "none";
	questionsForm.style.display = "block";
	
	console.log(questionsForm);


    if(indexCurrentQuestion < questions.length){
        let points = 0;
        let oneMinute = 59;
        display = document.querySelector('#time');
        startTimer(oneMinute, display);
				
        let questionCounter = document.createElement("p");
        questionCounter.textContent = `Question ${indexCurrentQuestion + 1}/${questions.length}`;
        console.log(questionCounter);

        questionsNumber.prepend(questionCounter);

        let questionTitle = document.createElement("h1");
        questionTitle.textContent = questions[indexCurrentQuestion];
        questionsForm.prepend(questionTitle);

        let questionAnswers = document.createElement("div");
        questionAnswers.setAttribute("id", "radios");
        let quitbtn = document.createElement("button");
        quitbtn.setAttribute("id", "orange");
        quitbtn.textContent  = "Quitter";
        let nextbtn = document.createElement("button");
        nextbtn.setAttribute("id", "green");
        nextbtn.textContent = "Suivant";
        let stylebtn = document.createElement("div");
        stylebtn.setAttribute("id", "submit-style");

        
        questionAnswers.appendChild(stylebtn);
				const radioIn = document.createElement('div');
				
				
        answers[indexCurrentQuestion].forEach(function(answer){
					let radioStyle = document.createElement("div");
					radioStyle.setAttribute("class", "radio-style");
					let radiosInput = document.createElement("input");
					radiosInput.setAttribute("type", "radio");
					radiosInput.setAttribute("name", "answer-choice");
					let labelTitle = document.createElement("label");
					labelTitle.classList.add("answer-choice");
					labelTitle.setAttribute("for", answer.split(" "));
					labelTitle.textContent = answer;
					radiosInput.setAttribute("id", answer.split(" "));
					radioStyle.appendChild(radiosInput);
					radioStyle.appendChild(labelTitle);
					radioIn.append(radioStyle);
					questionAnswers.append(radioIn);
        })
        stylebtn.appendChild(quitbtn);
        stylebtn.appendChild(nextbtn);

        nextbtn.addEventListener("click", function(e){
                e.preventDefault();
                

					let chose = document.querySelector('input[name="answer-choice"]:checked').value;

					console.log(chose);

					if(indexCurrentQuestion + 1 < questions.length && chose == idAnswers[indexCurrentQuestion ]){
							points++;
							indexCurrentQuestion++;
							
							
							questionTitle.textContent = questions[indexCurrentQuestion];
							questionCounter.textContent = `Question ${indexCurrentQuestion + 1}/${questions.length}`;
							answers[indexCurrentQuestion].forEach(function(){
									labelTitle = document.querySelectorAll(".answer-choice");
									for(let i = 0; i < labelTitle.length; i++){
											labelTitle[i].textContent = answers[indexCurrentQuestion][i];
									}
									
									questionsForm.reset();
							})
					} 
					else{
							questionsForm.style.display = "none";
							resultScreen.style.display = "block";
							// console.log(indexCurrentQuestion);
							
							showScore.textContent = `${points}/${questions.length}`;
					}
			});

	questionsForm.appendChild(questionAnswers);
	console.log(questionsForm);
	console.log(questionCounter);
    }
    
    else{
        
    }


    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                timer = duration;
                if(timer == 0){

                }
            }

        }, 1000);
    }
    
   
        
  

});
