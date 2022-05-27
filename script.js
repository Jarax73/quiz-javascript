//récuperer les éléments html

const accueil = document.querySelectorAll('#accueil .description');
const form = document.querySelector("#accueil");
const questionsForm = document.querySelector("#form-questions");
const radios = document.querySelectorAll('answer-choice');
const radioStyle = document.querySelectorAll(".radio-style");
const forLabel = document.querySelectorAll('#radios label');
// const questionsNumber = document.querySelector("#questions-number");
// const crossdiv = document.querySelector("#crossdiv");
const resultScreen = document.querySelector("#result");
const showScore = document.querySelector("#points");
let resultName = document.querySelector("#result h1");
let resultMail = document.querySelector("#result p");
const questionTitle = document.createElement("h1");
questionsForm.append(questionTitle);
const questionCounter = document.createElement("p");

const questionsNumber = document.createElement("div");
questionsNumber.append(questionCounter);
questionsNumber.setAttribute("id", "questions-number");
const timerQuiz = document.createElement("p");
timerQuiz.setAttribute("id", "time");
questionsNumber.append(timerQuiz);
questionsForm.append(questionsNumber);
const crossdiv = document.createElement('div');
crossdiv.setAttribute("id", "crossdiv");
const crossbar = document.createElement('p');
crossbar.setAttribute("id", "crossbar");
crossdiv.appendChild(crossbar);
questionsForm.appendChild(crossdiv);
const radioIn = document.createElement('div');
const questionAnswers = document.createElement("div");
questionAnswers.setAttribute("id", "radios");
const quitbtn = document.createElement("button");
quitbtn.setAttribute("id", "orange");
quitbtn.textContent  = "Quitter";
const nextbtn = document.createElement("button");
nextbtn.setAttribute("id", "green");
nextbtn.textContent = "Suivant";
const stylebtn = document.createElement("div");
stylebtn.setAttribute("id", "submit-style");
const nameError = document.querySelector("#name");
const mailError = document.querySelector("#email");
const success = document.querySelector(".success");
const wrong = document.querySelector(".wrong");
let interval = null


//Initialiser le contenu de questions

const questions = ["Quel est le type d'un fichier JavaScript ?", "Où est-il conseillé d'écrire du JavaScript ?", "Quelle est l'utilité d'une fonction ?"];
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
let id = 0;
let points = 0;
let index = 0;

resultScreen.style.display = "none";
//L'action à mener à l'écoute de l'évenement "submit"
form.addEventListener("submit", function(e){
    e.preventDefault();
	
	//récupérer le nom et l'addresse email

	
	const name = document.querySelector("#nom").value;
	const mail = document.querySelector("#mail").value;

	console.log(name == "" && mail == "");
	if(name != "" && mail != "")
	{

		console.log('true')
		
		//fermer l'écran d'accueil et ouvrir l'écran de questions
		
		form.style.display = "none";
		questionsForm.style.display = "block";

		if(index < questions.length){
				
			let oneMinute = 59;
			// display = document.querySelector('#time');
			
			
			questionTitle.textContent = questions[index];
			questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
			startTimer(oneMinute, timerQuiz);
			
			answers[index].forEach(function(answer){
				let radioStyle = document.createElement("div");
				radioStyle.setAttribute("class", "radio-style");
				let radiosInput = document.createElement("input");
				radiosInput.setAttribute("type", "radio");
				radiosInput.setAttribute("name", "answer-choice");
				let labelTitle = document.createElement("label");
				labelTitle.classList.add("answer-choice");
				radiosInput.setAttribute("value", answer);
				labelTitle.textContent = answer;
				radioStyle.appendChild(radiosInput);
				radioStyle.appendChild(labelTitle);
				radioIn.append(radioStyle);
				questionAnswers.append(radioIn);
			})
			questionAnswers.appendChild(stylebtn);
			// //console.log(labelTitle);
			stylebtn.appendChild(quitbtn);
			stylebtn.appendChild(nextbtn);

			nextbtn.addEventListener("click", function(e){
				e.preventDefault();
				oneMinute ;
				oneMinute = 59;
				crossbar.remove();
				crossdiv.appendChild(crossbar)
				
				startTimer(oneMinute, timerQuiz);
				
				let chose = document.querySelector('input[name="answer-choice"]:checked');
				if(chose){
					chose = chose.value;
				}
				else{
					chose = -1;
				}
				
				
				if(chose == correct[index]){
					points++;
					
				}
				index++;
				console.log(points);
				
				if(index < answers.length ){
					
					
					questionTitle.textContent = questions[index];
					questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
					
					answers[index].forEach(function(){
						labelTitle = document.querySelectorAll(".answer-choice");
						radiosInput = document.querySelectorAll("[type='radio']");
						for(let i = 0; i < labelTitle.length; i++){
							labelTitle[i].textContent = answers[index][i];
							//console.log(labelTitle[i]);
							radiosInput[i].setAttribute("value", answers[index][i]);
						}
					
						questionsForm.reset();
					})
				} 
				else{
					points;
					showScore.textContent = `${points}/${questions.length}`;
					resultName.textContent = name;
					resultMail.textContent = mail;
					questionsForm.style.display = "none";
					if(points >= answers.length / 2){
						resultScreen.style.display = "block";
						success.style.display = "block";
						wrong.style.display = "none";
					}else{
						resultScreen.style.display = "block";
						wrong.style.display = "block";
						success.style.display = "none";
					}
				}
				
			});

			questionsForm.appendChild(questionAnswers);
			//console.log(questionsForm);
			//console.log(questionCounter);
		}else{

		}
	}
	else
	{	
		nameError.textContent = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz. ";
		mailError.textContent = "N’oubliez pas de renseigner votre email avant de commencer le Quiz";
		nameError.classList.add("validate");
		mailError.classList.add("validate");
		console.log('false')	
	}

//function timer
	
	function startTimer(duration, display) {
		clearInterval(interval)
		let timer = duration, minutes, seconds
		interval  = setInterval(function () 
		{
				minutes = parseInt(timer / 60, 10);
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				display.textContent = minutes + ":" + seconds;

				if (--timer < 0) 
				{
					timer = duration;
					clearInterval(interval)
					nextbtn.click()
				}

		}, 1000);
	}
});
